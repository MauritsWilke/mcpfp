module.exports = {
	root: true,
	parser: "@typescript-eslint/parser",
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"prettier"
	],
	plugins: ["svelte3", "@typescript-eslint"],
	ignorePatterns: ["*.cjs"],
	overrides: [{ files: ["*.svelte"], processor: "svelte3/svelte3" }],
	settings: {
		"svelte3/typescript": () => require("typescript")
	},
	parserOptions: {
		sourceType: "module",
		ecmaVersion: 2020
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	rules: {
		// Semicolons
		"semi": "error",
		"semi-style": ["error", "last"],

		// Spaces / Tabs
		"indent": ["error", "tab"],
		"no-trailing-spaces": "error",

		// Comments
		"multiline-comment-style": ["error", "starred-block"],
		"spaced-comment": "error",

		// Variables
		"no-var": "error",
		"prefer-const": "error",

		// Logic
		"no-self-compare": "warn",
		"eqeqeq": "error",

		// Mistakes
		"no-template-curly-in-string": "error",

		// Formatting
		"dot-notation": "error",
		"array-bracket-newline": ["error", { multiline: true, minItems: 2 }],
		"multiline-ternary": ["error", "always-multiline"],
		"arrow-spacing": [
			"error",
			{
				before: true,
				after: true
			}
		]
	}
};
