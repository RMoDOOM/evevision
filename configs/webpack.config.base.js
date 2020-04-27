/**
 * Base webpack config used across other specific configs
 */

import path from "path";
import webpack from "webpack";
import { dependencies as externals } from "../app/package.json";

export default {
  externals: [...Object.keys(externals || {})],

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "node-bindings-loader"
      },
      {
        test: /\.node$/,
        loader: "native-ext-loader",
        options: {
          basePath: [".."]
        }
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true
          }
        }
      }
    ]
  },

  /**
   * Determine the array of extensions that should be used to resolve modules.
   */
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
    modules: [path.join(__dirname, "..", "app"), "node_modules"]
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: "production"
    }),

    new webpack.NamedModulesPlugin()
  ]
};
