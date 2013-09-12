<?php
require_once $_SERVER['DOCUMENT_ROOT'] . "/libs.php";

// Initalize the session
if(!isset($_SESSION)) {session_start();}

// OAuth Token can be used to access Fuel API Family REST services 
//$_SESSION['oauthToken'];

// Internal OAuthToken can be used to access the ExactTarget Email SOAP API service
//$_SESSION['internalOauthToken'] = $decodedJWT->request->user->internalOauthToken;

// Keep the Expiration Date for the token in a session
//$_SESSION['exp'] = $decodedJWT->exp;

// Keep the Refresh Token in a session
//$_SESSION['refreshToken'] = $decodedJWT->request->user->refreshToken;			

// TODO: REMOVE LATER, BOOTSTRAPPING AUTH FOR RUNNING LOCALLY
$_SESSION['etClient'] = new ET_Client( false, true );

$appName = "OEM Sample App";
$appDescription = "Simple PHP app focused on implementing the Fuel Editor";

// Configure Data and Assign to Vars for use in Templating
$savant->title			= $appName;
$savant->appDescription = $appDescription;
$savant->token			= $_SESSION['etClient']->authToken;

// Display the index.tpl.php template with the above data running
$savant->display( "index.tpl.php" );
?>
