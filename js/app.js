define( function( require ) {
	// Dependencies
	var DatasourceDE = require( 'data/datasource-dataextensions' );

	/*
	// App State
	var currentDE = {
		customerKey: '',
		name: ''
	};
	*/

	// Configure modal $ objects
	var $modal = $('#deEditor-modal');
	var modalState = {};

	/*****************************
	BOOTSTRAP DATA EXTENSIONS
	*****************************/
	var $deListEl = $('#dataExt'); // <ul>
	// Add a new option for each DE in the list
	for( var x = 0; x < listOfDEs.results.length; x++ ) {
		$deListEl.append( '<option value="' + listOfDEs.results[x].CustomerKey+ '">' + listOfDEs.results[x].Name + '</option>' );
	}

	/*
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
	*/

	/*****************************
	MODAL COMMON BUTTONS
	*****************************/
	// Handle update modal closing modal click
	$(document).on('click', '#modalClose', function (event) {
		modalState.noReload = true;
		$modal.modal('hide');
	});

	/*****************************
	MODAL EVENT METHODS
	*****************************/
	$modal.on( 'show', function() {
		$('.modal-header h3').html( modalState.header );
		$('#modalSave').html( modalState.saveBtnText );
		$('#modalSave').addClass( modalState.actionFilter );
	});

	$modal.on( 'hidden', function() {
		$('#modalSave').removeClass( modalState.actionFilter );
		if( !modalState.noReload ) {
			$('#grid').datagrid('reload');
		}
		modalState = {};
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
