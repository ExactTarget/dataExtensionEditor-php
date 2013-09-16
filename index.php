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

// OAuth Token can be used to access Fuel API Family REST services 
//$_SESSION['oauthToken'];

// Internal OAuthToken can be used to access the ExactTarget Email SOAP API service
//$_SESSION['internalOauthToken'] = $decodedJWT->request->user->internalOauthToken;

// Keep the Expiration Date for the token in a session
//$_SESSION['exp'] = $decodedJWT->exp;

// Keep the Refresh Token in a session
//$_SESSION['refreshToken'] = $decodedJWT->request->user->refreshToken;			

// TODO: REMOVE LATER, BOOTSTRAPPING AUTH FOR RUNNING LOCALLY
$_SESSION['etClient'] = new ET_Client( true, true );

// Prepopulate the list of DEs to prevent an additional call
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
