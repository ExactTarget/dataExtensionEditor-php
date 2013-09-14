define( function( require ) {
	requirejs.config({
		baseUrl: "js/vendor",
		enforceDefine: true,
		paths: {
			data: '../data',
			templates: '../templates',
			tmpl: './tmpl',
			app: '../app',
			views: '../views',
			'jquery': [
				'//cdnjs.cloudflare.com/ajax/libs/jquery/1.10.2/jquery.min',
				'./jquery.min'
			],
			'fuelux': [
				'//fuelux.exacttargetapps.com/fuelux-imh/2.3/',
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
			'fuelux/all': {
				deps: ['jquery']
			},
			'icanhaz': {
				exports: 'ich',
				deps: ['Mustache']
			}
		}
	});

	require(['jquery', 'icanhaz', 'views/dashboard', 'fuelux/all'], function( $, ich, Dashboard ) {
		// Init the app w/o backbone? How?
		console.log('Should be handling the index now' );
		var Dashboard = new Dashboard();
		Dashboard.loadGrid();
	});
});
