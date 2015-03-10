module.exports = {
  cache: true,
  entry: './frontend/app.js',
  output: {
    filename: './frontend/public/js/bundle.js'
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: 'jsx-loader'}
    ]
  }
};