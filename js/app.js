require(['jquery', 'icanhaz', 'fuelux/all'], function( $, ich ) {
// Navigation bar
    var url = window.location.pathname;
	var $navEl = $('.navEl');
	var elParent = $navEl.parent();
	var currentlySelectedItem = $('ul.nav li.active');
	$.each( $navEl, function( item ) {
		if( '/index.php' !== url ) {
			$(currentlySelectedItem).removeClass('active');
		}
		if( url === $($navEl[item]).attr('href')) {
			$($navEl[item]).parent().addClass('active');
		}
	});

// Configure modal $ objects
    var $modal = $('#editor-example-modal');
	var modalState = {};
// Cache Notification
	var $notification = $('#sample-editor-notification');
	var $notificationMsg = $('#sample-editor-notification h4');
  
/*****************************
NEW OBJECT MODAL LOAD BUTTONS
*****************************/
	// Handle new message button click
	$('#btnCreateMessage').click(function( event ) {
		//event.preventdefault();
		window.location = '/uploadmessage.php';
	});

	// Handle new tenant button click
    $("#btnCreateTenant").click(function (event) {
        event.preventDefault(); 		
        target = event.target.id;

		modalState.header = 'Create New Tenant';
		modalState.saveBtnText = 'Save New Tenant';
		modalState.actionFilter = 'newTenantSaveChanges';
        $modal.modal({}).css({'max-height': '90%'}).show();
        var d = ich.createTenant({});
        $('#modal-body').html( d[0].innerHTML );
    });

	// Handle new user button click
	$('#btnCreateUser').click(function( event ) {
		//event.preventdefault();

		modalState.header = 'Create New User';
		modalState.saveBtnText = 'Save New User';
		modalState.actionFilter = 'newUserSavechanges';
        $modal.modal({}).css({'max-height': '90%'}).show();
        var d = ich.createUser({});
        $('#modal-body').html( d[0].innerHTML );
	});

/*****************************
MODIFY OBJECT LOAD MODAL BUTTONS
*****************************/
	// Handle editAccount click
    $(document).on('click', '.editAccount', function (event) {
        event.preventDefault();
        $('#modal-body').html( '<h2 class="modalLoadingMsg">Loading...</h2>' );
        target = event.target.parentElement.id;
		modalState.header = 'Update Tenant';
		modalState.saveBtnText = 'Save Changes';
		modalState.actionFilter = 'updateTenantSaveChanges';
        $modal.modal({}).css({'max-height': '90%'}).show();
		var url = '/rest/datasource-accounts.php?tid=' + target;
		$.ajax(url,{
			url: url,
			method: 'GET',
			success: function( data, status, xhr ) {
				// Sanity check
				if( 200 === Number( data.code ) && data.status ) {
					var templateObj = data.results[0];
					var d = ich.updateTenant( templateObj );
					$('#modal-body').html( d[0].innerHTML );
				}
			},
			error: function( xhr, status, error ) {
				console.log( 'ERROR: ', error );
                // TODO: Render notice to user that there was an error
			}
		});
    });

	// Handle editUser click
    $(document).on('click', '.editUser', function (event) {
		console.log( 'EVENT: ', event );
        event.preventDefault();
		// Preload the body with necessary visuals
        $('#modal-body').html( '<h2 class="modalLoadingMsg">Loading...</h2>' );
        target = event.target.parentElement.id;
		modalState.header = 'Update User';
		modalState.saveBtnText = 'Save Changes';
		modalState.actionFilter = 'updateUserSaveChanges';
		// Show the modal with loading message
        $modal.modal({}).css({'max-height': '90%'}).show();
		var url = '/rest/datasource-users.php?fuid=' + target;
		$.ajax(url,{
			url: url,
			method: 'GET',
			success: function( data, status, xhr ) {
				// Sanity check
				if( 200 === Number( data.code ) && data.status ) {
					var templateObj = data.results[0];
					var d = ich.updateTenant( templateObj );
					// Update the modal's body with the data
					$('#modal-body').html( d[0].innerHTML );
				}
			},
			error: function( xhr, status, error ) {
                // TODO: Render notice to user that there was an error
			}
		});
    });

/*****************************
API CALLS IN MODAL BUTTONS
*****************************/
	// Handle create new account save click
    $(document).on('click', '.newTenantSaveChanges', function (event) {
		// Pull values from fields and set defaults
		var url = '/rest/datasource-accounts.php';
		var formData = {
			Name:			$('.controls #Name').val(),
			BusinessName:	$('.controls #BusinessName').val(),
			FromName:		$('.controls #FromName').val(),
			Email:			$('.controls #Email').val(),
			AccountType:	'PRO_CONNECT_CLIENT',
			CustomerKey:	$('.controls #CustomerKey').val(),
			Address:		$('.controls #Address').val(),
			City:			$('.controls #City').val(),
			State:			$('.controls #State').val(),
			Zip:			$('.controls #Zip').val(),
			IsActive:		true,
			IsTestAccount:	true,
			EditionID:		2
		};

        // TODO: Add validation

		// TODO: Add notification to user that a save is occurring

		$.ajax(url,{
			type: 'POST',
			data: {"data":formData},
			success: function( data, status, xhr ) {
				if( 200 === Number( data.code ) && data.status ) {
					$modal.modal('hide');
				}
			},
			error: function( xhr, status, error ) {
				console.log( 'ERROR: ', error);
				$modal.modal('hide');
				$notificationMsg.html( '<strong>Holy Cow Batman!</strong> There has been a terrible error saving those changes.' );
				$notification.addClass( 'alert-Error' );
			}
		});
    });

	// Handle update account changes click
    $(document).on('click', '.updateTenantSaveChanges', function (event) {
		// Pull values from fields and set defaults
		var formData = {
			Name:			$('.controls #Name').val(),
			BusinessName:	$('.controls #BusinessName').val(),
			FromName:		$('.controls #FromName').val(),
			Email:			$('.controls #Email').val(),
			AccountType:	'PRO_CONNECT_CLIENT',
			CustomerKey:	$('.controls #CustomerKey').val(),
			Address:		$('.controls #Address').val(),
			City:			$('.controls #City').val(),
			State:			$('.controls #State').val(),
			Zip:			$('.controls #Zip').val(),
			IsActive:		true,
			IsTestAccount:	true,
			EditionID:		2
		};
		var url = '/rest/datasource-accounts.php';

		$.ajax(url,{
			type: 'PUT',
			data: {"putData":formData},
			success: function( data, status, xhr ) {
				if( 200 === Number( data.code ) && data.status ) {
					$modal.modal('hide');
				}
			},
			error: function( xhr, status, error ) {
				console.log( 'ERROR: ', error );
				$modal.modal('hide');
				$notificationMsg.html( '<strong>Holy Cow Batman!</strong> There has been a terrible error saving those changes.' );
				$notification.addClass( 'alert-Error' );
			}
		});
    });

	// Handle create new user save click
    $(document).on('click', '.newUserSaveChanges', function (event) {
        // TODO: Add validation
        // Pull values from the form
		var formData = {
			ID: $('.controls #ID').val(),
			Password: $('.controls #Password').val(),
			Name: $('.controls #Name').val(),
			Email: $('.controls #Email').val(),
			MustChangePassword: $('.controls #MustChangePassword').val()
		};
		var url = '/rest/datasource-users.php';

		$.ajax(url,{
			type: 'POST',
			data: formData,
			success: function( data, status, xhr ) {
				if( 200 === Number( data.code ) && data.status ) {
					$modal.modal('hide');
				}
			},
			error: function( xhr, status, error ) {
				console.log( 'ERROR: ', error);
				$modal.modal('hide');
				$notificationMsg.html( '<strong>Holy Cow Batman!</strong> There has been a terrible error saving those changes.' );
				$notification.addClass( 'alert-Error' );
			}
		});
    });

	// Handle update user changes click
    $(document).on('click', '.updateUserSaveChanges', function (event) {
        // TODO: Add validation
        // TODO: Pull values from the form
		var formData = {
			ID: $('.controls #ID').val(),
			Password: $('.controls #Password').val(),
			Name: $('.controls #Name').val(),
			Email: $('.controls #Email').val(),
			MustChangePassword: $('.controls #MustChangePassword').val()
		};
		var url = '/rest/datasource-users.php';

		$.ajax(url,{
			type: 'PATCH',
			data: formData,
			success: function( data, status, xhr ) {
				if( 200 === Number( response.code ) && response.status ) {
					$modal.modal('hide');
				}
			},
			error: function( xhr, status, error ) {
				console.log( 'ERROR: ', response );
				$modal.modal('hide');
				$notificationMsg.html( '<strong>Holy Cow Batman!</strong> There has been a terrible error saving those changes.' );
				$notification.addClass( 'alert-Error' );
			}
		});
    });

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
NOTIFICATION STATE METHODS
*****************************/
	$notification.on('hide', function() {
		this.removeClass( 'alert-info' );
		this.removeClass( 'alert-error' );
		this.removeClass( 'alert-success' );
	});

/*****************************
LOAD CLIENT SIDE TEMPLATES
*****************************/
    $.getJSON('templateList.json', function( templates ) {
        $.each( templates, function( i ) {
            $.get( templates[i].template, function( tpl ) {
                ich.addTemplate( templates[i].name, tpl );
            });
        });
    });
});
