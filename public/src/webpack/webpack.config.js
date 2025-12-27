const path = require("path"),
  webpack = require("webpack"),
  { VueLoaderPlugin } = require("vue-loader");

const HtmlWebpackPlugin = require("html-webpack-plugin"),
  MiniCssExtractPlugin = require("mini-css-extract-plugin");

/**
 * Шрифты
 * для ускорения сборки шрифты прописывать в отдельном файле.
 * перед строкой с правилом содержащим url вставить как комментарий " webpackIgnore: true ",
 * путь относительно собранного файла css
 */

/**
 * Получить результирующую папку в зависимости от расположения папки src
 * @returns string
 */
const getOutputPath = () => {
  const outputPath =
    "../../" +
    (path.basename(path.resolve(__dirname, "../../")) !== "public"
      ? "public/"
      : "");
  return path.resolve(__dirname, outputPath);
};

module.exports = (env) => {
  const dev = !env.production;

  return {
    mode: dev ? "development" : "production",
    watch: dev, // слежка за изменениями файлов
    watchOptions: { aggregateTimeout: 300 }, // задержка оценки изменений в мс
    entry: {
      calculator: "./js/calculator.tsx", //function: './js/function.js',
    },

    experiments: {
      outputModule: true,
    },

    output: {
      path: getOutputPath(),
      publicPath: "/",
      filename: "js/[name].js",
      // assetModuleFilename: 'public/',
      // chunkFilename: 'js/[name].chunk.js',
      scriptType: "module",
      module: true,
      libraryTarget: "module",
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
      alias: {
        // Корень проекта
        "@": path.resolve(__dirname, "../js/"),
        // Алиасы для FSD слоев
        "@app": path.resolve(__dirname, "../js/app"),
        "@shared": path.resolve(__dirname, "../js/shared"),
        "@entities": path.resolve(__dirname, "../entities"),
        "@features": path.resolve(__dirname, "../js/features"),
        "@widgets": path.resolve(__dirname, "../js/widgets"),
        "@pages": path.resolve(__dirname, "../js/pages"),
      },
    },

    devtool: dev ? "source-map" : false, //source mapping
    optimization: {
      minimize: !dev,

      minimizer: [`...`],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "css/style.css",
      }),
      // new VueLoaderPlugin(),

      /** Шаблон для React */
      new HtmlWebpackPlugin({
        /*title: 'title',
        filename: 'view/index.html',*/
        template: "template/index.html",
      }),

      new webpack.DefinePlugin({
        BUILD_TIME: new Date().toLocaleString().replace(", ", "-"),

        /** Глобальные для Vue */
        // Drop Options API from bundle
        __VUE_OPTIONS_API__: "true",
        __VUE_PROD_DEVTOOLS__: "false",
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
      }),
    ],
    module: {
      rules: [
        getTypeScriptRules(),
        // getReactRules(),
        getVueRules(),
        getScssRules(),
        getCssRules(),
        getImageRules(),
        getSVGRules(),
        getFontsRules(),
      ],
    },

    devServer: {
      static: {
        directory: path.join(__dirname, "/"),
      },
      port: 3000,
      hot: false,
      open: true,
    },
  };
};

// ---------------------------------------------------------------------------------------------------------------------
// Правила / Rules
// ---------------------------------------------------------------------------------------------------------------------

/**
 * Mini css extract plugin
 */
const getMiniCssExtractPlugin = () => ({
  loader: MiniCssExtractPlugin.loader,
  options: {
    publicPath: "../",
  },
});

/**
 * css-loader
 * @return {object}
 */
const getCssLoader = () => ({
  loader: "css-loader",
  options: {
    url: {
      filter: (l) => !l.includes("/font"),
    },
    sourceMap: true,
  },
});

/**
 * TypeScript
 */
const getReactRules = () => ({
  test: /\.(js|jsx|ts|tsx)$/,
  exclude: /node_modules/,
  use: {
    loader: "babel-loader",
    options: {
      presets: ["@babel/preset-env", "@babel/preset-react"],
    },
  },
});

const getTypeScriptRules = () => ({
  test: /\.(ts|tsx)$/,
  loader: "ts-loader",
  exclude: /node_modules/,
});

/**
 * Vue
 */
const getVueRules = () => ({
  test: /\.vue$/,
  loader: "vue-loader",
});

/**
 * Scss
 */
const getScssRules = () => ({
  test: /\.s[ac]ss$/i,
  use: [
    getMiniCssExtractPlugin(),
    getCssLoader(),
    "resolve-url-loader",
    {
      loader: "sass-loader",
      options: {
        sourceMap: true, // <-- !!IMPORTANT!!
      },
    },
  ],
});

/**
 * Css
 */
const getCssRules = () => ({
  test: /\.css$/i,
  use: [getMiniCssExtractPlugin(), getCssLoader()],
});

/** asset/resource - file-loader - в отдельный файл
 * asset/inline - url-loader - inline базе64
 * asset/source - raw-loader - ?
 * asset - автоматический выбор от размера по умолчанию 8к
 */

/**
 * Image
 */
const getImageRules = () => ({
  test: /\.(png|jpe?g|gif|webp)$/i,
  type: "asset",
  generator: {
    filename: "image/[name][ext]",
  },
  parser: {
    dataUrlCondition: {
      maxSize: 8196, // 8kb
    },
  },
});

/**
 * SVG - file-loader/inline
 */
const getSVGRules = () => ({
  test: /\.(svg)$/,
  type: "asset",
  generator: {
    filename: "svg/[name][ext]",
  },
  parser: {
    dataUrlCondition: {
      maxSize: 8196, // 8kb
    },
  },
});

/**
 * Шрифты
 */
const getFontsRules = () => ({
  test: /\.(ttf|woff|woff2|eot)$/,
  type: "asset/resource",
  generator: {
    filename: "fonts/[name][ext]",
  },
});
