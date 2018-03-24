const path = require('path'),
	ExtractTextPlugin = require('extract-text-webpack-plugin'),
	CleanWebpackPlugin = require('clean-webpack-plugin'),
	GoogleFonts = require('google-fonts-webpack-plugin');

module.exports = env => {
	return {
		entry: {
			'main': './resources/assets/js/main.js',
			'web': './resources/assets/scss/web.scss',
			'smaterial': './resources/assets/js/smaterial.js',
		},
		output: {
			path: __dirname,
			filename: './public/js/[name].js',
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
				},
				{
					test: /\.(jpg|jpeg|gif|png|svg)$/,
					exclude: ['/node_modules/', '/public/'],
					use: [
						{
							loader: 'responsive-loader',
							options: {
								adapter: require('responsive-loader/sharp'),
								sizes: [600, 960, 1280, 1920],
								placeholder: true,
								placeholderSize: 50,
								name: '/images/[hash]-[width].[ext]',
							}
						},
						{
							loader: 'file-loader',
							options: {
								name: '[hash].[ext]',
								outputPath: '/public/images',
								publicPath: '/images',
							}
						}
					],

				}
			]
		},
		resolve: {
			extensions: ['.js', '.vue'],
			alias: {
				'@': path.resolve(__dirname, './resources/assets/js')
			}
		},
		plugins: [
			new ExtractTextPlugin( 'public/css/[name].css' ),
			new CleanWebpackPlugin(['./public/js', './public/fonts', './public/css']),/*
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
			})                                                                          */
		]
	}
};