const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let values;
let config;
switch(process.env.moduleView) {
    case "modeling":{
      values = {
        INDEX_HTML : path.join(__dirname, 'src/test/html/index.html')
      };
      config = {
          entry : path.join(__dirname, 'src/test/js/modeling-test/index.js'),
          output: {
            path: path.resolve(__dirname, 'dist/modeling-test'),
            filename: 'modeling-test.js',
          },
        };
      }
      break;
    case "dvcm":{
      values = {
        INDEX_HTML : path.join(__dirname, 'src/test/html/index.html')
      };
      config = {
        entry : path.join(__dirname, 'src/test/js/dvcm-test/index.js'),
        output: {
          path: path.resolve(__dirname, 'dist/dvcm-test'),
          filename: 'dvcm-test.js',
        },
      };
      }
      break;
      case "use_cases":{
        values = {
          INDEX_HTML : path.join(__dirname, 'src/test/html/index.html')
        };
        config = {
          entry : path.join(__dirname, 'src/test/js/use-cases-test/index.js'),
          output: {
            path: path.resolve(__dirname, 'dist/use-cases-test'),
            filename: 'use-cases-test.js',
          },
        };
        }
        break;
    default:{
      values = {
        INDEX_HTML : path.join(__dirname, 'src/main/html/index.html')
      };
      config = {
        entry : path.join(__dirname, 'src/main/js/index.js'),
        output: {
          path: path.resolve(__dirname, 'dist/diagrams-editor-app'),
          filename: 'diagrams-editor-app.js',
        },

      };
    }
}



module.exports = Object.assign(config,
  {
      devtool: "inline-sourcemap",
      // Tell webpack to use html plugin
      plugins: [
        new HtmlWebpackPlugin({
          template: values.INDEX_HTML,
        }),
        new ExtractTextPlugin('style.bundle.css'), // CSS will be extracted to this bundle file -> ADDED IN THIS STEP
      ],
      // Loaders configuration
      // We are telling webpack to use "babel-loader" for .js and .jsx files
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: [
              'babel-loader',
            ],
          },
          {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({
              use: 'css-loader',
            }),
          },
          {
            test: /\.(png|jpg|gif)$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  outputPath: 'images/'
                }
              }
            ],
          },
          {
            test: /favicon.ico$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]'
                }
              }
            ]
          },
        ],
      },
      resolve: {
        modules: ['src/test/js', 'src/test/css', 'src/main/js','src/main/css', 'node_modules'],
        extensions: ['.js', '.jsx'],
      },
  }
);
