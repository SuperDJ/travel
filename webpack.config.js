const path = require('path'),
	ExtractTextPlugin = require('extract-text-webpack-plugin'),
	CleanWebpackPlugin = require('clean-webpack-plugin'),
	GoogleFonts = require('google-fonts-webpack-plugin'),
	swp = require('sw-precache-webpack-plugin');

module.exports = env => {
	return {
		entry: {
			'main': './resources/assets/js/main.js',
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
								name: '/public/images/[hash]-[width].[ext]',
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
			})
			                                                                          */
			new swp({
				cacheId: 'travel-app',
				filename: 'service-worker.js',
				minify: !env.dev,
				staticFileGlobs: [
					'public/**/*.{css,eot,svg,ttf,woff,woff2,js,html}',
					'https://maps.googleapis.com/maps/api/js?key=AIzaSyDuy_qF0zXiupeh0-NKW78LoCamYYFR6kU',
					'https://fonts.googleapis.com/icon?family=Material+Icons',
					'https://unpkg.com/vuetify/dist/vuetify.min.css',
					'/en',
					'/nl',
					'/'

				],
				handleFetch: true,
				stripPrefix: 'public',
				dynamicUrlToDependencies: {
					'/': ['resources/views/index.blade.php'],
					'/en/': ['resources/views/index.blade.php'],
					'/en': ['resources/views/index.blade.php'],
				},
				runtimeCaching: [
					{
						urlPattern: /^https:\/\/fonts\.googleapis\.com\//,
						handler: 'cacheFirst'
					},
					{
						urlPattern: /^https:\/\/fonts\.gstatic\.com\//,
						handler: 'cacheFirst'
					},
					{
						urlPattern: /^https:\/\/maps\.gstatic\.com\//,
						handler: 'cacheFirst'
					},
					{
						urlPattern: /^https:\/\/unpkg\.com\//,
						handler: 'cacheFirst'
					},
					{
						urlPattern: /^https:\/\/travel\.dsuper\.nl\/api\//,
						handler: 'cacheFirst'
					},
					{
						urlPattern: /^https:\/\/images\.pexels\.com\//,
						handler: 'cacheFirst'
					}
				],
				staticFileGlobsIgnorePatterns: [/\.map$/, /mix-manifest\.json$/, /manifest\.json$/, /service-worker\.js$/],
			})
		]
	}
};