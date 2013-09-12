var AccountsDataSource = function (options) {
	this._formatter = options.formatter;
	this._columns = options.columns;
};

AccountsDataSource.prototype = {	
	columns: function () {
		return this._columns;
	},
	
	data: function (options, callback) {

		var url = '/rest/datasource-accounts.php';
		var self = this;		
		
		$.ajax(url, {			
			type: 'GET'
		}).done(function (response) {
			// Prepare data to return to Datagrid
			var singleDefault = (1 === response.results.length) ? 1 : undefined;
			var data		= response.results;
			var count		= response.count || singleDefault;
			var startIndex	= ((response.page - 1) * response.pageSize) || singleDefault;
			var endIndex	= (startIndex + response.pageSize) || singleDefault;
			var end			= ((endIndex > count) ? count : endIndex) || singleDefault;
			var pages		= response.pages || singleDefault;
			var page		= response.page || singleDefault;
			var start		= (startIndex + 1) || singleDefault;

			if (self._formatter) self._formatter(data);

			// Return data to Datagrid
			callback({ data: data, start: start, end: end, count: count, pages: pages, page: page });
		});	
		
		// Return data to Datagrid
		callback({ data: {}, start: 0, end: 0, count: 0, pages: 0, page: 0 });					
					
	}
};
