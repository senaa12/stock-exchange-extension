const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv");

const isProd = process.env.ENV !== "dev";

module.exports = {
    entry: path.resolve(__dirname, './src/index.ts'),
     output: {
        path: path.resolve('public'),
        filename: 'background.js'
    },
    resolve: {
      alias: {
        common: path.resolve(__dirname, '../common'),
        'common-native-client': path.resolve(__dirname, '../common-native-client')
      },
      extensions: [ '.ts', '.js', '.tsx' ]
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          include: [
             path.resolve(__dirname, 'src'), 
             path.resolve(__dirname, '../common'),
          ],
          loader: "awesome-typescript-loader"
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({ 
        'process.env': {  
            PRODUCTION: JSON.stringify(isProd), 
            FINNHUB_TOKEN: JSON.stringify(dotenv.config().parsed.FINNHUB_TOKEN) 
        }
      })
    ]
}