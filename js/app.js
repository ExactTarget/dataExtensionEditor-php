define( function( require ) {
	// Dependencies
	var $ = require( 'jquery' );
	var DatasourceDE = require( 'datasource' );

	// App State
	var currentDE = {
		customerKey: '',
		name: ''
	};

	// Configure modal $ objects
	var $modal = $('#deEditor-modal');
	var modalState = {};

	/*****************************
	BOOTSTRAP DATA EXTENSIONS
	*****************************/
	var $deListEl = $('#dataExt'); // <ul>
	// Add a new option for each DE in the list
	//console.log( 'listOfDEs: ', listOfDEs );
	for( var x = 0; x < listOfDEs.results.length; x++ ) {
		$deListEl.append( '<option value="' + listOfDEs.results[x].CustomerKey+ '">' + listOfDEs.results[x].Name + '</option>' );
	}

	// DE List Change Handler
	$deListEl.on( 'change', function() {
		var str = '';
		$('#deList option:selected').each( function() {
			// Set the state
			currentDE.name = $(this).text();
			currentDE.customerKey = $(this).val();

			loadGrid( currentDE.customerKey );
		});
	});

	/*****************************
	LOAD CLIENT SIDE TEMPLATES
	*****************************/
	$.getJSON('/templateList.json', function( templates ) {
		$.each( templates, function( i ) {
			$.get( templates[i].template, function( tpl ) {
				ich.addTemplate( templates[i].name, tpl );
			});
		});
	});
});
