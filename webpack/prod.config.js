module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname + '/../lib',
    filename: 'index.js',
    library: 'redux-formkit',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  plugins: [
  ],
	externals: {
		'react': 'react',
		'react-dom': 'react-dom'
	},
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
};
