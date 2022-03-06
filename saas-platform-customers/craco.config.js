const { ModuleFederationPlugin } = require("webpack").container;
const { dependencies } = require("./package.json");
const paths = require("react-scripts/config/paths");

const MODULE_NAME = "customers";

module.exports = {
  plugins: [
    {
      plugin: {
        overrideWebpackConfig: ({ webpackConfig, pluginOptions }) => {
          webpackConfig.output = {
            ...webpackConfig.output,
            uniqueName: MODULE_NAME,
            publicPath: "auto",
            clean: true,
          };

          if (pluginOptions?.useNamedChunkIds) {
            webpackConfig.optimization.chunkIds = "named";
          }

          const htmlWebpackPlugin = webpackConfig.plugins.find(
            (plugin) => plugin.constructor.name === "HtmlWebpackPlugin"
          );

          htmlWebpackPlugin.userOptions = {
            ...htmlWebpackPlugin.userOptions,
            publicPath: paths.publicUrlOrPath,
            excludeChunks: [MODULE_NAME],
          };

          webpackConfig.plugins = [
            ...webpackConfig.plugins,
            new ModuleFederationPlugin({
              name: MODULE_NAME,
              filename: "remoteEntry.js",
              exposes: {
                "./customers": "./src/index.tsx",
              },
              shared: {
                ...dependencies,
                react: { singleton: true, requiredVersion: dependencies.react },
                "react-dom": {
                  singleton: true,
                  requiredVersion: dependencies["react-dom"],
                },
                craco: {
                  singleton: true,
                  requiredVersion: dependencies["craco"],
                },
              },
            }),
          ];

          return webpackConfig;
        },
      },
    },
  ],
};
