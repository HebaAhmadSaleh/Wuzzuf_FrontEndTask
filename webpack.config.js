var path = require('path');
var webpack = require('webpack');
 
module.exports = {  entry: "./src/main.js",
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
    },
    module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
        {
            test: /\.css$/,
            loader: 'style!css?modules',
            include: /flexboxgrid/,
        },
    ]
  },
  
};