var path = require('path');
var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  module : {
    rules : [
      { test: /\.css$/, loader: "style-loader!css-loader" },
      {
        test : /\.jsx?/,
        include : SRC_DIR,
        loader : 'babel-loader',
        query: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      },
      { test: /\.(eot|ttf|woff2?|otf|svg)$/, loader:'file-loader' },
      {
        test: /\.(jpg|png|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 25000
          }
        }
      }
    ]
  }
};
