define( function( require ) {

	var DEDataSource = function (options) {
		console.log( 'OPTIONS: ', options );
		this._formatter = options.formatter;
		var addedColumns = options.columns
		addedColumns.push({ property: "Buttons", label: "", sortable: false});
		this._columns = addedColumns;
		this._delay = options.delay || 0;
		this._data = options.data;
		this._dataextension = options.dataextension;
		this._baseUrl = '/rest/datasource-dataExtensions.php';
		this._deckqp = '?deCustKey='; // Data Extension Customer Key Query Param
	};

	DEDataSource.prototype = {
		columns: function () {
			return this._columns;
		},
		dataextension: function () {
			return this._dataextension;
		},
		data: function (options, callback) {

			var self = this;		
			var dename = this._dataextension
			var columns = this._columns
			var url = this._baseUrl + this._deckqp + dename;
			
			$.ajax(url, {			
				type: 'GET'
			}).done(function (response) {
				setTimeout(function () {
					if (dename != "") {
						$.ajax(url).done(function(response){
							// Enable the Add Row button
							if( '' !== currentDE.name ) {
								$('#deadd').removeAttr( 'disabled' );
							}

							var data = JSON.parse(response).results;
							results = data;
							options.columns = columns;
							options.dataextension = dename;
							self.popGrid( results, options, callback );							
						});
					} else {
						// No data extension. Return zero results to
						// Datagrid
						callback({ data: [], start: 0, end: 0, count: 0, pages: 0, page: 0 });					
					}
				}, this._delay);
			});	

		}
	};

	DEDataSource.prototype.popGrid = function( results, options, callback ) {
		var count = results.length;
		var startIndex = options.pageIndex * options.pageSize;
		var endIndex = startIndex + options.pageSize;
		var end = (endIndex > count) ? count : endIndex;
		var pages = Math.ceil(count / options.pageSize);
		var page = options.pageIndex + 1;
		var start = startIndex + 1;						
		data = results.slice(startIndex, endIndex);
		
		$.each(data, function( index, item ) {
			item.Buttons = '<div class="btn-group"><button type="button" class="btn btn-primary deedit"><i class="icon-edit icon-white" /> Edit</button> <button type="button" class="btn btn-primary dedelete"><i class="icon-trash icon-white" /> Delete</button></div>';
		});
		if (self._formatter) self._formatter(data);

		callback({ data: data, start: start, end: end, count: count, pages: pages, page: page });
		
		$('#deadd').unbind('click').bind('click',function(){
			//rows = $('#deGrid').find('tbody').find('tr');				
			//var copyRow = $(rows[0]).clone();
			var maxIndex = options.columns.length - 1
			var newRow = "<tr>";
			for (index in options.columns){			
				if (index != maxIndex){ 
					newRow = newRow + '<td><input type="text" /></td>';
				} else {					
					newRow = newRow + '<td><div class="btn-group"><button type="button" class="btn btn-success deaddsave"><i class="icon-edit icon-white" /> Save</button> <button type="button" class="btn deaddcancel"><i class="icon-remove-sign" /> Cancel</button></div></td>';
				}				
			}			
			var newRow = newRow + "</tr>";
			
			$('#deadd').hide();
						
			$('#deGrid').find('tbody').prepend(newRow);
			
			$('.deaddcancel').bind('click',function(){		
				$(this).parent().parent().parent().remove();
				$('#deadd').show();
			});
			
			$('.deaddsave').bind('click',function(){
				allTDs = $(this).parent().parent().parent().find('td');			
				var allValues = []
				allTDs.each(function() {
					allValues.push($(this).children()[0].value);
					});			
				var allColumns = options.columns;
				
				// Merge the column and value data into a row
				var row = {}
				for (index in allColumns) {
					//Filter off the buttons column
					if (index != allColumns.length - 1){
						row[allColumns[index].property] =  allValues[index];
					}
				}
				// Post to the Rest endpoint then reload the page
				var url = this._baseUrl + this._deckqp + options.dataextension;
				$.ajax(url, {
					type: 'POST',
					dataType: 'json',
					data: JSON.stringify(row)
				}).done(function(result){
					if (result.status) {
						$('#deGrid').datagrid('reload');
					} else {
						alert('Unable to add dataextension row: ' + result.results[0].status_message + '\n\n' + result.results[0].error_message);
					}
				});
			});
			

		});
		$('#deadd').show();		
		
		$('.deedit').die('click');
		$('.deedit').live('click',function(){
			// Add Handler for Edit Event Here
			var l = $(this).closest('tr').children('td').length;
			var resetHTML = $(this).closest('tr').hide();
			var $editRow = $('<tr/>');
							
			var parentTR = $(this).closest('tr').children('td').each(function(i) {							
				if (i < (l - 1)) {
					var $field = $('<td/>')
					var $input = $('<input />').attr({
						type: 'text',
						value: $(this).text() });
					$field.append($input);
					$editRow.append($field);
				} else {
					$editRow.append('<td><div class="btn-group"><button type="button" class="btn btn-success desave"><i class="icon-check icon-white" /> Save</button> <button type="button" class="btn decancel"><i class="icon-remove-sign" /> Cancel</button></div></form></td>');				
					$editRow.insertAfter(resetHTML);
					$('.desave').bind('click', function() {						
						allTDs = $(this).parent().parent().parent().find('td');			
						var allValues = []
						allTDs.each(function() {
							allValues.push($(this).children()[0].value);
							});			
						var allColumns = options.columns;
						
						// Merge the column and value data into a row
						var row = {}
						for (index in allColumns) {
							//Filter off the buttons column
							if (index != allColumns.length - 1){
								row[allColumns[index].property] =  allValues[index];
							}
						}
						// Post to the Rest endpoint then reload the
						// page
						var url = this._baseUrl + this._deckqp + options.dataextension;
						$.ajax(url, {
							type: 'PATCH',
							dataType: 'json',
							data: JSON.stringify(row)
						}).done(function(result){
							if (result.status) {
								$('#deGrid').datagrid('reload');
							} else {
								alert('Unable to update dataextension row: ' + result.results[0].status_message + '\n\n' + result.results[0].error_message);
							}
						});
						
					});
					$('.decancel').bind('click', function() {

						$(this).closest('tr').remove();						
						resetHTML.show();
						//alert('CANCEL');
					});
				}
			});
			$(this).unbind('click');
			$('.dedelete').unbind('click');
		});
		
		$('.dedelete').die('click');
		$('.dedelete').live('click',function(){		
			allTDs = $(this).parent().parent().parent().find('td');			
			var allValues = []
			allTDs.each(function() {
				allValues.push($(this).text());
				});			
			var allColumns = options.columns;
			
			// Merge the column and value data into a row
			var row = {}
			for (index in allColumns) {
				//Filter off the buttons column
				if (index != allColumns.length - 1){
					row[allColumns[index].property] =  allValues[index];
				}
			}
						
			// Display the confirmation
			$('#moddeleteConfirm').modal({keyboard: true})
			$('#moddeleteConfirm').modal('show')
			$('#moddeleteDelete').bind('click',function(){
				// Post to the Rest endpoint then reload the page
				var url = this._baseUrl + this._deckqp + options.dataextension;
				$.ajax(url, {
				type: 'DELETE',
				dataType: 'json',
				data: JSON.stringify(row)
				}).done(function(result){
					if (result.status) {
						$('#deGrid').datagrid('reload');
					} else {
						alert('Unable to delete dataextension: ' + result.results[0].status_message + '\n\n' + result.results[0].error_message);
					}
				});
				$('#moddeleteConfirm').modal('hide')
			});
		});
		

		//Fix the width if it is a wide DE
		width = $('#grid').width();	
		browserWidth = $(document).width();				
		
		if (width >= browserWidth) {

			$('body').css({width: width  + 'px'});
		} else {

			$('body').css({width: (browserWidth -20)  + 'px'});
		}		
	};

	return DEDataSource;
});
