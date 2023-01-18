const { BABEL_ENV } = process.env;
const isCjs = BABEL_ENV !== undefined && BABEL_ENV === "cjs";

module.exports = {
  plugins: ["@babel/plugin-transform-runtime"],
  presets: [
    "@babel/preset-typescript",
    [
      "@babel/preset-env",
      {
        bugfixes: true,
        modules: isCjs ? "commonjs" : false,
        loose: true,
      },
    ],
  ],
};
