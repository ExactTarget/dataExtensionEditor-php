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

    <link href="//www.fuelcdn.com/fuelux-imh/2.3/css/fuelux.css" rel="stylesheet" />  <!-- FuelUX CDN link to core css -->
    <link href="//www.fuelcdn.com/fuelux-imh/2.3/css/fuelux-responsive.css" rel="stylesheet" /> <!-- FuelUX CDN link to responsive css --> 
    <link href="/css/main.css" rel="stylesheet" />

    <style>
        html,
        body {  
            padding: 10px 15px;
            height: 90%;      /* The html and body elements cannot have any padding or margin. */
        }

        #wrap {
            min-height: 100%;
            height: auto !important;
            height: 100%;
            /* Negative indent footer by it's height */
            margin: 0 auto -60px;
        }

        #push,
        #footer {
            height: 60px;
            
            padding: 35px 0 36px;
            border-top: 1px solid #e5e5e5;
            background-color: #f9f9f9;
        }
        #footer {        
            background-color: #f9f9f9;
        }

        @media (max-width: 767px) {
            #footer {
                margin-left: -20px;
                margin-right: -20px;
                padding-left: 20px;
                padding-right: 20px;
            }
        } 
    </style>
    
    <script type="text/javascript">
        <!--//--><![CDATA[//><!--
        console.log( 'WE ARE HERE' );
        var listOfDEs = null;
        <?php echo "listOfDEs = "; print( $this->listOfDEs ); echo";\n" ?>
        console.log( 'LIST OF DES: ', listOfDEs );
        //--><!]]>
    </script>
    <!-- requirejs -->
    <script data-main="/js/main.js" src="//cdnjs.cloudflare.com/ajax/libs/require.js/2.1.5/require.min.js"></script>
    
    <!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
      <script src="//html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

  </head>
  <body>
  <div id="wrap">
