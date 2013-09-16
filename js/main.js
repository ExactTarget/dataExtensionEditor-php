define( function( require ) {
	requirejs.config({
		baseUrl: "js/vendor",
		enforceDefine: true,
		paths: {
			data: '../data',
			templates: '../templates',
			tmpl: './tmpl',
			app: '../app',
			global: '../global',
			datasource: '../datasource',
			views: '../views',
			'jquery': [
				'//cdnjs.cloudflare.com/ajax/libs/jquery/1.10.2/jquery.min',
				'./jquery.min'
			],
			'fuelux': [
				'//fuelcdn.com/fuelux-imh/2.3/',
				'./fuelux'
			],
			'icanhaz': [
				'./icanhaz'
			],
			'Mustache': [
				'./mustache'
			]
		},
		deps: ['jquery', 'fuelux/all', 'icanhaz'],
		shim: {
			'jquery': {
				exports: '$'
			},
			'datasource': {
				deps: ['jquery', 'fuelux/all']
			},
			'global': {
				deps: ['jquery', 'datasource']
			},
			'fuelux/all': {
				deps: ['jquery']
			},
			'icanhaz': {
				exports: 'ich',
				deps: ['Mustache']
			},
			'app': {
				deps: ['jquery', 'icanhaz']
			}
		}
	});

	require(['jquery', 'icanhaz', 'app', 'global', 'fuelux/all'], function( $, ich ) {
		// Init the app w/o backbone? How?
		console.log('Should be handling the index now' );
	});
});
