define( function( require ) {
	var DatasourceDE = require( 'data/datasource-dataextensions' );
	var Dashboard = function( options ) {
		this.options = options || {};
	};

	Dashboard.prototype.loadGrid = function() {
		$('#grid').datagrid({
		  dataSource: new DatasourceDE({

			// Column definitions for Datagrid
			columns: [{
			  property: 'main',
			  label: '<span style="color:#2168a7;">Organization/Tenant</span><br /><span style="font-weight: normal;">[Parent Organization]</span>',
			  sortable: false
			},{
			  property: 'CustomerKey',
			  label: 'Customer Key',
			  sortable: true
			},{
			  property: 'status',
			  label: 'Is Active',
			  sortable: true
			},{
			  property: 'AccountType',
			  label: 'Account Type',
			  sortable: false
			},{
			  property: 'hasActions',
			  label: 'Actions',
			  sortable: false
			}],
			
			formatter: function (items) {
			  $.each(items, function (index, item) {
					// TODO: This should open up an edit modal w/ details on the account for editing
					var btnEdit = '<a href=\"#\" title="Edit this Organization/Tenant" id="' + item.CustomerKey + '" class=\"btn btn-primary editAccount\"><i class=\"icon-wrench icon-white\"></i></a>';								
					// TODO: This needs to call the messageListing page in the context of this account 
					// If the user is the organization, then do not use the uid or aid
					var contextParam = ( !item.ParentID ) ? '' : '?aid=' + item.CustomerKey;
					// TEMP TODO: Hack until we have an impersonation route in production
					var disabled = ( !item.ParentID ) ? '' : 'disabled="disabled"';
					var btnImpersonate = '<a href=\"/messageListing.php' + contextParam + '\" title="Impersonate this Organization" ' + disabled + 'id="impersonateAccount" class=\"btn btn-primary\"><i class=\"icon-user icon-white\"></i></a>';								
					//var btnDelete = '<a href=\"/delete?id=' + item.id + '&name=' + item.name + '\" class=\"btn btn-danger\"><i class=\"icon-remove icon-white\"></i></a>';		  				
					
					// TODO: This needs to call the userListing page for this account 
					// TEMP TODO: Hack until we have an impersonation route in production
					if( !item.ParentID ) {
						item.main = '<a title="View Uses for this Organization" href=\"/userListing.php?aid=' + item.CustomerKey + '\"><strong>' + item.Name + '</strong></a><br>' + item.ParentName		
					} else {
						item.main = '<a title="View Uses for this Organization" href=\"#\"><strong>' + item.Name + '</strong></a><br>' + item.ParentName		
					}

					item.hasActions = btnEdit + ' ' + btnImpersonate;

					item.status = (item.IsActive) ? "Active" : "Not Active";
			  });
			}
		  })
		});
	};

	return Dashboard;
});
