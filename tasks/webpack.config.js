module.exports = () => {
  const webpack = require('webpack');
  const HtmlWebpackPlugin = require('html-webpack-plugin');

  const { src, dest } = require('./build-config');
  const appConfig = require('../app/config/default');

  const config = {
    entry: src.entry,
    mode: 'development',
    output: {
      clean: true,
      filename: 'main.js',
      path: dest.distPath,
    },
    module: {
      rules: [
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader',
          ],
        },
      ],
    },
    resolve: {
      alias: {
        CONFIG: src.configPath,
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: src.htmlIndex,
        filename: 'index.html',
      }),
      new webpack.ProvidePlugin({
        CONFIG: JSON.stringify(appConfig),
      }),
    ],
  };

  return config;
};
