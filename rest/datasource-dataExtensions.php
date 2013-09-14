<?php
    require_once $_SERVER['DOCUMENT_ROOT'] . '/libs.php';
    if(!isset($_SESSION)) {session_start();}

    // Create invalidation method
    function invalidateData ($originalData, $responseData) {
    }

    function getColumnsForGivenDE( $dename ) {
        $getDEColumns           = new ET_DataExtension_Column();
        $getDEColumns->authStub = $_SESSION['etClient'];
        $getDEColumns->props    = array( 'CustomerKey', 'Name' ):
        $getDEColumns->filter   = array(
                                    'Property' => 'CustomerKey',
                                    'SimpleOperator' => 'equals',
                                    'Value' => $dename
                                );
        return $getDEColumns->get();
    }

    if( 'GET' == $_SERVER['REQUEST_METHOD'] ) {
        if( !isset( $_GET['deCustKey'] ) ) {
            // TODO: Notify user the deCustKey must be supplied
        } else {
            // Get Columns first
            $columns = $getDEColumns( $_GET['deCustKey'] );
            // TODO: May need to massage the data
            // TODO: Sanity check that we didn't have an error on column call
            
            // Now fetch rows
            $getDERows              = new ET_DataExtension_Row();
            $getDERows->authStub    = $_SESSION['etClient'];
            $getDERows->props       = array( 'Key', 'Value' );
            $getDERows->CustomerKey = $_GET['deCustKey'];

            $callResult             = $getDERows->get();
        }
    }

    // Creating a new organization
    if( 'POST' == $_SERVER['REQUEST_METHOD'] ) {
        $jsonText = $_REQUEST['data'];
        foreach( $jsonText as $var ) {
            // Validate the data
            // Cleanse the data
        }
        
        $cleansedData = $jsonText; // THIS WILL CHANGE LATER TO ONLY ACCEPT THE CLEANSED DATA

        /*
        // Prepare the call via the SDK
        $postOrganization = new ET_Organization();
        $postOrganization->authStub = $_SESSION['etClient'];
        $postOrganization->props = $cleansedData;
        $callResult = $postOrganization->post();

        // Invalidate
        //invalidateUser( castData, reelData );
        */
    }

    // Updating a new organization
    if( 'PUT' == $_SERVER['REQUEST_METHOD'] ) {
        //$jsonText = $_REQUEST['putData'];
        parse_str(file_get_contents("php://input"), $jsonText);
        $cleansedData = array();
        foreach( $jsonText['putData'] as $key => $value ) {
            $cleansedData[$key] = $value;
        }

        /*
        // Prepare the call via the SDK
        $patchOrganization = new ET_Organization();
        $patchOrganization->authStub = $_SESSION['etClient'];
        $patchOrganization->props = $cleansedData;
        $callResult = $patchOrganization->patch();
        //print $callResult;

        // Invalidate
        //invalidateUser( castData, reelData );
        */
    }

    if( 'DELETE' == $_SERVER['REQUEST_METHOD'] ) {
        // TODO
    }

    // Return the data to the caller
    header("Content-Type: text/json");
    print json_encode( $callResult );
    unset( $enumData );
    unset( $finalizedData );
    unset( $cleansedData );
?>
