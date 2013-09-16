define( function( require ) {
    // Dependencies
    var $ = jquery = require( 'jquery' );
    var DEDataSource = require( 'datasource' );

    // Initialize the datagrid on load so it appears blank
    var temp = $('#deGrid').clone();
    temp.attr('id','deGridTemp');   
    temp.hide();    
    $('#tableholdertemp').append(temp); 
    var baseUrl = '/rest/datasource-dataExtensions.php';

    var dataSource = new DEDataSource({
        columns: [],
        dataextension: "",
        delay: 250
    });                     

    $('#deGrid').datagrid({
    dataSource: dataSource,
    stretchHeight: false
    });

    $('#deadd').hide(); 

    $('#dataExt').bind('change',function(){
        if (this.id != "") {
            console.log($('.blankOption'));
            $('.blankOption').remove();
            deCustomerKey = $('#' + this.id).val();
            var url = baseUrl + '?deCustKey=' + deCustomerKey + '&columns=1';
            $.ajax( url, {
                type: 'get',
                async: false,
                dataType: 'json'
            }).done(function(json){
                console.log( 'DONE WITH CALL: ', json );
                var columns = json;
                columnsArray = [];
                
                // Clean up the columns array so it is in the format
                // expected by the datasource
                for (var fieldInd in columns.results){
                    var columnObj = new Object();
                    columnObj['property'] = columns.results[fieldInd].Name;
                    columnObj['label'] = columns.results[fieldInd].Name;
                    columnObj['sortable'] = true;
                    columnsArray.push(columnObj)
                }       
                
                var dataSource = new DEDataSource({
                    columns: columnsArray,
                    dataextension: deCustomerKey,
                    delay: 250
                });
                
                var temp = $('#deGridTemp').clone();
                temp.attr('id','deGrid');
                $('#tableholder').empty();
                $('#tableholder').append(temp);
                $('#deGrid').datagrid({
                    dataSource: dataSource,
                    stretchHeight: false
                }); 
                $('#deGrid').show();
            });
        }
    }); // End $('#dataExt').bind('change',function())
});
