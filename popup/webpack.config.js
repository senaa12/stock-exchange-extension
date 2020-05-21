const path = require("path");
const webpack = require("webpack");

const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.ENV != "dev";
console.log(`Is prod: ${isProd}\n`);

module.exports = {
    entry: path.resolve(__dirname, "./src/index.tsx"),
    output: {
        path: path.resolve(__dirname, '../public'),
        filename: '[name].js' 
    },
    resolve: {
        alias: {
            common: path.resolve(__dirname, '../common')
        },
        extensions: ['.js', '.tsx', '.ts']
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all' // vendor.js posebno izdvaja
        }
    },
    module: {
        rules: [ 
            {
                test: /\.(s)css$/,
                loader: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            }, 
            {
                test: /\.css$/,
                loader: ["css-loader"]
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                include: [
                    path.resolve(__dirname, './src'), 
                    path.resolve(__dirname, './../common')
                 ],
                loader: "awesome-typescript-loader"
            }, 
            {
                test: /\.svg$/,
                loader: "svg-sprite-loader",
                include: [path.resolve(__dirname, './src/assets/icons')]
            }
        ]
    },
    plugins: [ 
        new webpack.DefinePlugin({ 
            'process.env': { 
                PRODUCTION: JSON.stringify(isProd)
            },
            '__REACT_DEVTOOLS_GLOBAL_HOOK__': '({ isDisabled: true })'
        }), 
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[name].css"
        }), 
        new webpack.HashedModuleIdsPlugin(), 
        new CopyPlugin([
            { 
                from: path.resolve(__dirname, "../manifest.json"),
                to: "manifest.json",
            }
        ]), 
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./src/index.html")
        }) 
    ],
}