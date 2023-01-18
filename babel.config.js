const { BABEL_ENV } = process.env;
const isCjs = BABEL_ENV !== undefined && BABEL_ENV === "cjs";

module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          browsers: "> 0.25%, not dead",
          node: "12",
        },
        bugfixes: true,
        modules: isCjs ? "commonjs" : false,
        loose: true,
      },
      "minify",
    ],
    "@babel/preset-typescript",
  ],
};
