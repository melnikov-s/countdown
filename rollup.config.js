const typescript = require("rollup-plugin-typescript2");
const serve = require("rollup-plugin-serve");
const resolve = require("@rollup/plugin-node-resolve");
const sass = require("rollup-plugin-sass");
const commonjs = require("@rollup/plugin-commonjs");
const { name } = require("./package.json");

module.exports = {
	input: "src/index.tsx",
	plugins: [
		commonjs(),
		typescript(),
		sass({ output: "public/dist/countdown.css" }),
		resolve(),
		serve({ contentBase: "./public/", port: 3001 }),
	],
	output: {
		file: `public/dist/${name}.js`,
		format: "umd",
		name,
		sourcemap: true,
	},
};
