module.exports = {
	"root": true,
	"parser": "@typescript-eslint/parser",
	"extends": [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended"
	],
	"plugins": [
		"@typescript-eslint",
		"svelte3"
	],
	"ignorePatterns": [
		"*.cjs"
	],
	"overrides": [
		{
			"files": [
				"*.svelte"
			],
			"processor": "svelte3/svelte3"
		}
	],
	"parserOptions": {
		"sourceType": "module",
		"ecmaVersion": "latest"
	},
	"env": {
		"browser": true,
		"es2021": true,
		"node": true
	},
	"rules": {
		"@typescript-eslint/no-explicit-any": "off",
		"@typescript-eslint/no-non-null-assertion": "off",
		"@typescript-eslint/no-non-null-asserted-optional-chain": "off",
		"indent": [
			"error",
			"tab",
			{
				"SwitchCase": 1
			}
		],
		"handle-callback-err": [
			"error"
		],
		"no-multiple-empty-lines": [
			"error",
			{
				"max": 2,
				"maxEOF": 0,
				"maxBOF": 0
			}
		],
		"camelcase": "error",
		"no-undef-init": "error",
		"prefer-const": "error",
		"arrow-spacing": [
			"error",
			{
				"before": true,
				"after": true
			}
		],
		"brace-style": [
			"error",
			"1tbs"
		],
		"keyword-spacing": [
			"error",
			{
				"before": true,
				"after": true
			}
		],
		"no-trailing-spaces": "error",
		"spaced-comment": "error",
		"quotes": [
			"error",
			"double"
		]
	},
	"settings": {
		'svelte3/typescript': () => require('typescript')
	},
};