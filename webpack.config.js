module.exports = {
  cache: true,
  entry: './react/main.js',
  output: {
    filename: './public/browser-bundle.js'
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: 'jsx-loader'},
      {test: /\.css$/, loader: 'style-loader!css-loader'}
    ]
  }
};