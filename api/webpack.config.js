const path = require("path");
const NodeExternals = require("webpack-node-externals");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

module.exports = {
  entry: "./index.ts",
  target: "node",
  externals: [NodeExternals()],
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "build"),
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
        },
      },
    ],
  },
  optimization: {
    minimize: isProd,
  },
};
