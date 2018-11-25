const path = require("path");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const devMode = process.env.NODE_ENV !== "production";

const loadStyleLoader = () => {
    if (devMode) {
        return "style-loader";
    }
    return {
        loader: MiniCssExtractPlugin.loader
    }
};

module.exports = {
    mode: devMode ? "development" : "production",
    entry: "./src/client/ts/main.ts",
    devtool: "inline-source-map",
    devServer: {
        contentBase: "./public"
    },
    plugins: [
        new CleanWebpackPlugin(["public"]),
        new MiniCssExtractPlugin({
            filename: devMode ? "[name].css" : "[name].[hash].css",
            chunkFilename: devMode ? "[id].css" : "[id].[hash].css"
        })
    ],
    output: {
        filename: devMode ? "[name].bundle.js" : "[name].bundle.[hash].js",
        path: path.resolve(__dirname, "public")
    },
    optimization: {
        splitChunks: {
            chunks: "all"
        },
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    module: {
        rules: [
            // TYPESCRIPT
            {
                test: /\.tsx?$/,
                use: "ts-loader?configFile=tsconfig.webpack.json",
                exclude: /node_modules/,
            },
            // CSS, SCSS
            {
                test: /\.(sc|c)ss$/,
                use: [
                    loadStyleLoader(),
                    "css-loader",
                    "sass-loader"
                ]
            },
            // IMAGES, OTHER ASSETS
            {
                test: /\.(png|jpg)$/,
                use: [
                    "file-loader"
                ]
            }
        ]
    }
};
