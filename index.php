<?php
require_once $_SERVER['DOCUMENT_ROOT'] . "/libs.php";

// Initalize the session
if(!isset($_SESSION)) {session_start();}
function objectToArray($d) {
	if (is_object($d)) {
		// Gets the properties of the object
		$d = get_object_vars($d);
	}

	if (is_array($d)) {
		return array_map(__FUNCTION__, $d);
	} else {
		// Return array
		return $d;
	}
}

// Bootstrap DEs
$getDE = new ET_DataExtension();
$getDE->authStub = $_SESSION['etClient'];
$getDE->props = array( "CustomerKey", "Name" );
$results = json_encode( objectToArray( $getDE->get() ) );

$appName = "Data Extension Editor";
$appDescription = "Mod your DEs";

// Configure Data and Assign to Vars for use in Templating
$savant->title			= $appName;
$savant->appDescription = $appDescription;
$savant->token			= $_SESSION['etClient']->authToken;
$savant->listOfDEs		= $results;

// Display the index.tpl.php template with the above data running
$savant->display( "index.tpl.php" );
?>
