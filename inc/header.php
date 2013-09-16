<!DOCTYPE html>
<html class="fuelux" lang="en"> <!-- FuelUX attribute -->
  <head>
    <meta charset="utf-8">
    <title><?php echo $this->eprint( $this->title); ?></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="ExactTarget Data Extension Editor">
    <meta name="author" content="ExactTarget">
    <meta http-equiv="Content-Type" content="text/html" charset="utf-8">
    <meta http-equiv="Content-Script-Type" content="text/javascript">
    <meta http-equiv="Content-Style-Type" content="text/css">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link href="http://www.fuelcdn.com/fuelux-imh/2.3/css/fuelux.css" rel="stylesheet" />  <!-- FuelUX CDN link to core css -->
    <link href="http://www.fuelcdn.com/fuelux-imh/2.3/css/fuelux-responsive.css" rel="stylesheet" /> <!-- FuelUX CDN link to responsive css --> 
    <link href="/css/main.css" rel="stylesheet" />
    
    <script>        
        var token = '<?php echo $this->eprint( $this->token ); ?>';              
		// Let's bootstrap the DE list
		var listOfDEs = <?php print( $this->listOfDEs ); ?>;
        localStorage.setItem("token", token);
    </script>
    
    <!-- requirejs -->
    <script data-main="/js/main.js" src="//cdnjs.cloudflare.com/ajax/libs/require.js/2.1.5/require.min.js"></script>
    
    <!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

  </head>
  <body data-spy="scroll" style="padding-top: 2%;">           
    <div id="deEditorAlert" class="alert fade hide">
        <button type="button" class="close" id="notification-dismiss" data-dismiss="alert">&times;</button>
        <h4></h4>
    </div>
	<div class="row-fluid">
		<div class="span10 offset1">
			<div id="deEditorNav" class="navbar navbar-inverse">
				<div class="navbar-inner">
					<div class="container">
						<span class="pull-right">
							<div class="brand">
								Select a Data Extension: 
								<select id="dataExt">
									<option value="" class="blankOption">--NONE SELECTED--</option>
								</select>
							</div><!-- /.brand -->
						</span>
					</div><!-- /.container -->
				</div><!-- /.navbar-inner -->
			</div><!-- /#deEditorNav -->
		</div>
	</div>
    <div id="deEditor" class="row-fluid">
