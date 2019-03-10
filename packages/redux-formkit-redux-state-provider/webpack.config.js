const path = require('path');
module.exports = {
  output: {
    path: path.join(__dirname, './lib'),
    filename: 'index.js',
    globalObject: 'this',
    library: 'redux-formkit-redux-state-provider',
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
    // Don't bundle react or react-redux
    react: {
      commonjs: "react",
      commonjs2: "react",
      amd: "React",
      root: "React"   
    },
    "redux": {
      commonjs: "redux",          
      commonjs2: "redux",          
      amd: "Redux",
      root: "Redux"
    },
    "react-redux": {
      commonjs: "react-redux",          
      commonjs2: "react-redux",          
      amd: "ReactRedux",
      root: "ReactRedux"
    },
    "redux-formkit": {
      commonjs: "redux-formkit",          
      commonjs2: "redux-formkit",          
      amd: "ReduxFormkit",
      root: "ReduxFormkit"
    }
  }
};