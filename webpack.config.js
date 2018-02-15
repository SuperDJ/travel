const path = require('path'),
	ExtractTextPlugin = require('extract-text-webpack-plugin'),
	GoogleFonts = require('google-fonts-webpack-plugin');

module.exports = env => {
	return {
		entry: {
			'main': './resources/assets/js/main.js',
			'smaterial': './resources/assets/js/smaterial.js',
		},
		output: {
			path: __dirname,
			filename: './public/js/[name].js'
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: ['/vendor/', '/node_modules/', '/public/', '/resources/assets/scss/'],
					use: [
						'babel-loader'
					]
				},
				{
					test: /\.vue$/,
					exclude: ['/vendor/', '/node_modules', '/public/', '/resources/assets/scss/'],
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
					exclude: ['/vendor/', '/node_modules/', '/public/', '/resources/assets/scss/'],
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
			new ExtractTextPlugin( 'public/css/[name].css' ),
			new GoogleFonts({
				fonts: [
					{
						family: 'Roboto',
						variants: ['100','300','500','700','900','100italic','300italic','regular','italic','500italic','700italic','900italic'],
						formats: ['woff', 'woff2', 'ttf']
					}
				],
				path: 'public/fonts/',
				apiUrl: 'https://google-webfonts-helper.herokuapp.com/api/fonts',
				filename: './resources/assets/scss/components/_fonts.scss'
			})
		]
	}
};