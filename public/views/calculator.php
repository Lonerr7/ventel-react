<?php if (!defined('MAIN_ACCESS')) die('access denied!');

$field['content'] = '<div id="root"></div>';

// add print template
//$field['footerContent'] .= template('docs/printTpl');
$field['footerContent'] = $dbContent;

