/* eslint-disable */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', // Entry point of your application
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js', // Output bundle file
  },
  mode: 'development', // Set to 'production' for production builds
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'), // Serve from 'dist' directory
    compress: true,
    port: 9000, 
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Transpile .js and .jsx files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.scss$/, // Process SCSS files
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/, // Process CSS files
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // Template HTML file
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', 'js', 'jsx'], // Resolve these extensions
  },
};
