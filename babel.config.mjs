const { BABEL_ENV } = process.env;
const isCjs = BABEL_ENV !== undefined && BABEL_ENV === "cjs";

const babelConfig = {
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

export default babelConfig;
