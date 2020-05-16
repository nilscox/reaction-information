const path = require('path');

const webpack = require('webpack');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const EnvironmentPlugin = webpack.EnvironmentPlugin;

const {
  HOST = '0.0.0.0',
  PORT = 8080,
} = process.env;

module.exports = {

  mode: 'development',
  entry: './src/index.tsx',
  devtool: 'inline-source-map',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'umd'
  },

  module: {
    rules: [

      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },

      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },

      {
        test: /\.(svg|png|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/images',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4,
              },
              gifsicle: {
                optimizationLevel: 2,
              },
            },
          },
        ],
      },

    ],
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      'src': path.resolve(__dirname, 'src'),
      'assets': path.resolve(__dirname, 'assets'),
    },
  },

  plugins: [
    new EnvironmentPlugin({
      NODE_ENV: 'development',
      WEBSITE_URL: 'http://localhost:8080',
      CHROME_EXTENSION_URL: null,
      FIREFOX_ADDON_URL: null,
      REPOSITORY_URL: null,
    }),

    new MiniCssExtractPlugin({
      filename: 'assets/css/styles.css',
      ignoreOrder: false,
    }),

    new StaticSiteGeneratorPlugin({
      paths: '/',
      globals: {
        window: {}
      }
    }),

    new CopyPlugin([
      {
        from: 'static/**/*',
        transformPath: target => target.replace(/^static/, 'assets'),
      },
    ]),
  ],

  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },

  devServer: {
    host: HOST,
    port: PORT,
    inline: false,
  },

};
