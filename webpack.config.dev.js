import webpack from 'webpack';
import path from 'path';

export default {
  mode: 'development',
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client?reload=true', //note that it reloads the page if hot module reloading fails.
    path.resolve(__dirname, 'src/index')
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.module\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { modules: true, importLoaders: 1, localIdentName: '[name]__[local]___[hash:base64:5]' } },
          {
            loader: 'postcss-loader',
            options: {
              options: {},
              plugins: function () {
                return require('autoprefixer');
              }
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /^((?!\.module).)*(sa|sc|c)ss$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { modules: false, importLoaders: 1 } },
          'sass-loader'
        ]
      },
      {
        test: /\.(svg|jpg|png)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 25000,
          },
        },
      },
      {
        test: /\.woff(2)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: './font/[hash].[ext]',
              mimetype: 'application/font-woff'
            }
          }
        ]
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 5000,
              name: './font/[hash].[ext]',
              mimetype: 'application/octet-stream'
            }
          }
        ]
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      },
      {
        test: require.resolve('jquery'),
        use: [{
          loader: 'expose-loader',
          options: 'jQuery'
        }]
      }
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({ 'typeof window': JSON.stringify("object") }),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  devServer: {
    contentBase: './dist',
    hot: true
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
