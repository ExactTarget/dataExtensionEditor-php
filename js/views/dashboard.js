define( function( require ) {
	var DatasourceDE = require( 'data/datasource-dataextensions' );
	var Dashboard = function( options ) {
		this.options = options || {};
	};

	Dashboard.prototype.loadGrid = function( deCustomerKey ) {
		$('#grid').datagrid({
		  dataSource: new DatasourceDE({
			// DataExtension
			dataExtension: deCustomerKey,
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
					var btnEdit = '<a href=\"#\" title="Edit this Organization/Tenant" id="' + item.CustomerKey + '" class=\"btn btn-primary editAccount\"><i class=\"icon-wrench icon-white\"></i></a>';								
					var disabled = ( !item.ParentID ) ? '' : 'disabled="disabled"';
					var btnImpersonate = '<a href=\"/messageListing.php' + contextParam + '\" title="Impersonate this Organization" ' + disabled + 'id="impersonateAccount" class=\"btn btn-primary\"><i class=\"icon-user icon-white\"></i></a>';								

					item.hasActions = btnEdit + ' ' + btnImpersonate;
					item.status = (item.IsActive) ? "Active" : "Not Active";
			  });
			}
			})
		});
	};

	return Dashboard;
});
