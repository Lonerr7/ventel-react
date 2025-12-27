<?php

/**
 * @var Main $main - global
 *
 * @var array $field
 * @var string $field['pageTitle']
 * @var string $field['headContent']
 * @var string[] $field['cssLinks'] - использовать с , для css админки добавить CORE_CSS
 * @var string[] $field['jsLinks'] - относительно /public/js/, для js админки добавить CORE_JS
 * @var string $field['pageHeader'] - По умолчанию пусто.
 * @var string $field['pageFooter'] - По умолчанию плашка.
 *
 * @var string $publicCss
 * @var string $publicJs
 */
$field = $field ?? [
  'cssLinks' => [],
  'jsLinks'  => [],
];

function scanCsvDirectory(string $rootPath): array
{
  $result = [];

  foreach (array_diff(scandir($rootPath), ['.', '..']) as $path) {
    $path = $rootPath . DIRECTORY_SEPARATOR . $path;
    if (is_dir($path)) {
      $result = array_merge($result, scanCsvDirectory($path));
      continue;
    }

    $result[] = $path;
  }

  return $result;
}

function commonLoadCsv(&$data, $param, $file, bool $strict = false)
{
  $csv = loadCSV($param, $file, $strict);
  $csv = array_filter($csv, function ($row) {
    return strlen($row['id']);
  });
  $data = array_merge($data, $csv);
}

if (isset($_GET['load-data'])) {
  $queryData = [];

  // Изображения
  $data = [];
  $param = [
    'id' => 'id',
    'path' => 'path'
  ];
  commonLoadCsv($data, $param, 'z_config/z_images/images.csv');
  $queryData['images'] = $data;

  // Прайсы
  $data = [];
  $param = [
    'manufacturer' => 'manufacturer',
    'id' => 'id',
    'name' => 'name',
    'type' => 'type',
    'price' => 'price',
    'image' => 'image',
    'doc1' => 'doc1',
    'doc2' => 'doc2',
    'doc3' => 'doc3'
  ];

  $pricesPath = $main->getCmsParam(('csvPath')) . 'prices';
  $prices = [];

  foreach (scanCsvDirectory($pricesPath) as $path) {
    if (pathinfo($path, PATHINFO_EXTENSION) !== 'csv') {
      continue;
    }

    $prices[] = $path;
  }

  foreach ($prices as $price) {
    commonLoadCsv($data, $param, $price);
  }

  $queryData['prices'] = $data;

  // Отправляем ответ на фронтенд
  $main->response->setContent($queryData)->send();
  die();
}


$field['cssLinks'][] = $publicCss . 'style.css?ver=55261cc5db';
$field['jsLinks'][] = $publicJs . 'calculator.js?ver=7bdbde2af9';
//$field['pageHeader'] = '';
$field['pageFooter'] = '';

/*$dbContent = "<input type='hidden' id='dataPrice' value='$price'>" .
             "<input type='hidden' id='dataConfig' value='$config'>";*/

// Настройки
// $dbContent .= $main->getSettings('json', true);

// Курс
//$dbContent .= $main->getCourse();

