const path = require('path')

const projectDir = __dirname

const isDev = process.env.NODE_ENV !== 'production'

module.exports = {
  mode: isDev ? 'development' : 'production',
  devtool: false,
  entry: path.resolve(projectDir, 'src', 'foo.tsx'),
  output: {
    filename: 'main.js',
    path: path.resolve(projectDir, 'dist')
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  module: {
    rules: [
      {
        test: /\.styles\.ts$/,
        use: [
          '../tyst/dist/webpackLoader',
          // {
          //   loader: 'babel-loader',
          //   options: {
          //     presets: ['@babel/preset-typescript', '@babel/preset-react']
          //   }
          // }
        ]
      },
      {
        test: /\.(m?js|tsx?)$/,
        exclude: /(node_modules|\.styles\.ts$)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-typescript', '@babel/preset-react']
          }
        }
      }
    ]
  }
}
