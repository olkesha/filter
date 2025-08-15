const path = require('path');
const HTMLWebpackPlugins = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, '..', './src/index.jsx'),
  output: {
		path: path.resolve(__dirname, '..', './dist'),
		filename: 'static/scripts/[name].js',
		publicPath: './',
	},
  devServer: {
    static: path.resolve(__dirname, '..', './dist'),
    compress: true,
    port: 8080,
    open: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(c|sc|sa)ss$/,
        use: 
          [
            'style-loader', 
            { 
              loader: 'css-loader', 
              options: { 
                modules: { 
                  mode: 'local', 
                  localIdentName: '[name]__[local]__[hash:base64:5]', 
                  auto: /\.module\.\w+$/i, 
                  namedExport: false
                }, 
                importLoaders: 2
              } 
            }, 
            'postcss-loader',
            {
              loader: 'sass-loader',
              options: { 
                sourceMap: true
              } 
            } 
          ]
        }, 
        { 
          test: /\.(woff(2)?|eot|ttf|otf)$/,
          type: 'asset/resource', 
          generator: { 
            filename: 'static/fonts/[hash][ext][query]'
          }
        }, 
        { 
          test: /\.(png|jpg|gif|webp)$/, 
          type: 'asset/resource', 
          generator: { 
            filename: 'static/images/[hash][ext][query]'
          }
        },
        { 
          test: /\.svg$/i, 
          issuer: /\.[j]sx?$/, 
          use: ['@svgr/webpack', 'url-loader']
        },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      fonts: path.resolve(__dirname, '..', './src/fonts'),
      components: path.resolve(__dirname, '..', './src/components'),
    }
  },
  plugins: [
    new HTMLWebpackPlugins({
			template: path.resolve(__dirname, '..', './public/index.html'),
		}),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: 'static/styles/[name].css',
		}),
    new ReactRefreshWebpackPlugin(),
  ],
};
