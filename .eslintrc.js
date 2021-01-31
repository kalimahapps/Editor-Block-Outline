module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ['airbnb-base', 'eslint:recommended'],
	parserOptions: {
		ecmaVersion: 12,
	},
	globals: {
		jQuery: true,
		wp: true,
	},
	rules: {
		indent: [2, 'tab', { SwitchCase: 1 }],
		'no-tabs': 0,
		'linebreak-style': 0,
		'comma-dangle': 0,
		'no-new': 0,
		'arrow-parens': 0,
		'no-param-reassign': 0,
		'no-underscore-dangle': 0,
		'object-shorthand': ['error', 'consistent'],
		'wrap-iife': ['error', 'inside'],
		curly: [2, 'all'],
		radix: 0,
		camelcase: [1, { ignoreDestructuring: true, properties: 'never' }],
	},
};
