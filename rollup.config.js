const typescript = require("rollup-plugin-typescript2");
const resolve = require("@rollup/plugin-node-resolve");
const sass = require("rollup-plugin-sass");
const commonjs = require("@rollup/plugin-commonjs");
const uglify = require("rollup-plugin-uglify").uglify;
const { name } = require("./package.json");

module.exports = {
	input: "src/index.tsx",
	plugins: [
		commonjs(),
		typescript(),
		sass({ output: "public/dist/countdown.css" }),
		resolve(),
		uglify(),
	],
	output: {
		file: `public/dist/${name}.js`,
		format: "iife",
		name,
	},
};
