const path = require('path');
module.exports = {
  output: {
    path: path.join(__dirname, './lib'),
    filename: 'index.js',
    globalObject: 'this',
    library: 'redux-formkit',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  externals: {
    // Don't bundle react
    react: {
        commonjs: "react",
        commonjs2: "react",
        amd: "React",
        root: "React"
    }
  }
};