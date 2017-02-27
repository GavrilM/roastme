module.exports = {
  entry: './src/index.js',
  output: {
    path: '/',
    filename: 'bundle.js'
  },
  devServer: {
  	hot: true,
    inline: true,
    contentBase: './src',
    port: 3000
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  node: {
  	console: false,
	fs: 'empty',
	net: 'empty',
	tls: 'empty'
  }
}