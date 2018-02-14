const path = require('path'),
	ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = env => {
	return {
		entry: {
			'main': './resources/assets/js/main.js'
		},
		output: {
			path: __dirname,
			filename: './public/js/[name].js'
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: ['/node_modules/', '/stylesheets/'],
					use: [
						'babel-loader'
					]
				},
				{
					test: /\.vue$/,
					exclude: ['/node_modules'],
					loader: 'vue-loader',
					options: {
						loaders: {
							scss: [
								'vue-style-loader',
								'css-loader',
								'sass-loader',
							]
						}
					}
				},
				{
					test: /\.scss$/,
					use: ExtractTextPlugin.extract( {
						fallback: 'style-loader',
						use: [
							{
								loader: 'css-loader',
								options: {
									minimize: !env.dev
								}
							},
							'sass-loader'
						]
					})
				}
			]
		},
		resolve: {
			extensions: ['.js', '.vue']
		},
		plugins: [
			new ExtractTextPlugin( 'stylesheets/[name].css' )
		]
	}
};