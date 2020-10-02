"use strict";

const path = require("path");
const LoadableWebpackPlugin = require("@loadable/webpack-plugin");
const LoadableBabelPlugin = require("@loadable/babel-plugin");
const babelPresetRazzle = require("razzle/babel");

module.exports = {
    modify: (config, { dev, target }) => {
        const isDev = dev === true;
        const isWeb = target === "web";

        const appConfig = Object.assign({}, config);

        // Run client only
        if (isWeb) {
            const filename = path.resolve(__dirname, "build");

            appConfig.plugins.push(
                new LoadableWebpackPlugin({
                    outputAsset: false,
                    writeToDisk: { filename }
                })
            );

            appConfig.output.filename = isDev
                ? "static/js/[name].js"
                : "static/js/[name].[chunkhash:8].js";

            appConfig.optimization = Object.assign({}, appConfig.optimization, {
                runtimeChunk: true,
                splitChunks: {
                    cacheGroups: {
                        commons: {
                            test: /[\\/]node_modules[\\/]/,
                            name: "vendors"
                        }
                    },
                    chunks: "all",
                    name: isDev
                }
            });
        }
        return appConfig;
    },
    modifyBabelOptions: () => ({
        babelrc: false,
        presets: [babelPresetRazzle],
        plugins: [LoadableBabelPlugin]
    })
};
