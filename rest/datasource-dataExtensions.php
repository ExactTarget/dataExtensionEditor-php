<?php
    require_once $_SERVER['DOCUMENT_ROOT'] . '/libs.php';
    if(!isset($_SESSION)) {session_start();}

    // Create invalidation method
    function invalidateData ($originalData, $responseData) {
    }

    function getColumnsForGivenDE( $dename ) {
        $getDEColumns           = new ET_DataExtension_Column();
        $getDEColumns->authStub = $_SESSION['etClient'];
        $getDEColumns->props    = array( 'Name', 'FieldType' );
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
            if( isset( $_GET['rows'] ) && $_GET['rows'] ) {
                // Get Columns first
                $columns = getColumnsForGivenDE( $_GET['deCustKey'] );
                $fieldArr = array();
                foreach( $columns->results as $fieldObj ) {
                    $fieldArr[] = $fieldObj->Name;
                }
                
                // Now fetch rows
                $getDERows              = new ET_DataExtension_Row();
                $getDERows->authStub    = $_SESSION['etClient'];
                $getDERows->props       = $fieldArr;
                $getDERows->CustomerKey = $_GET['deCustKey'];
                $callResult             = $getDERows->get();
            }

            if( isset( $_GET['columns'] ) && $_GET['columns'] ) {
                $callResult = getColumnsForGivenDE( $_GET['deCustKey'] );

            }
        }
    }

    // Creating a new organization
    if( 'POST' == $_SERVER['REQUEST_METHOD'] ) {
        $jsonText = $_REQUEST['data'];
        foreach( $jsonText as $var ) {
            // TODO: Store the customer key as the name for the de to add this row into
            if( 'deCustKey' == $var ) {
                $deCustKey = $var;
            }
            // Validate the data
            // Cleanse the data
        }
        
        $cleansedData = $jsonText; // THIS WILL CHANGE LATER TO ONLY ACCEPT THE CLEANSED DATA

        // Create new row
        $postDERows                 = new ET_DataExtension_Row();
        $postDERows->authStub       = $_SESSION['etClient'];
        $postDERows->props          = $cleansedData;
        $postDERows->CustomerKey    = $deCustKey;
        $callResult                 = $postDERows->post();

        // Invalidate
        //invalidateUser( castData, reelData );
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
