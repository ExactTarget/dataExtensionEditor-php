define( function( require ) {
// Dependencies

// Configure modal $ objects
	var $modal = $('#deEditor-modal');
	var modalState = {};

/*****************************
BOOTSTRAP DATA EXTENSIONS
*****************************/
var $deListEl = $('#deList'); // <ul>
for( var x = 0; x < listOfDEs.results.length; x++ ) {
	// TODO: GUESSWORK ON THE DATA
	$deListEl.append( '<option value="' + listOfDEs.results[x].CustomerKey+ '">' + listOfDEs.results[x].Name + '</option>' );
}
// TODO: GUESSWORK - Make sure this is the right item to bind with and
// the callback footprint is valid
$deListEl.on( 'change', function() {
});

/*****************************
DATAGRID BINDINGS
var $deEditor = $('#deEditor');
$deEditor.append( '<section id="grid"></section>' );
//console.log( $deEditor );
*****************************/

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
