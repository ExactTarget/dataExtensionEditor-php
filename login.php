<?php
require_once $_SERVER['DOCUMENT_ROOT'] . "/libs.php";

if( !isset( $_SESSION ) ) {
    session_start();
}

if( $_REQUEST['jwt'] ) {
    $jwt = $_REQUEST['jwt'];
    $_SESSION['etClient'] = new ET_Client( true, true, $jwt );
    if( !empty( $_SESSION['etClient'] ) ) {
        header( 'Location: /index.php' );
    }
} else {
    // No JWT supplied, let's kick them back to the login page
    header( 'Location: https://imh.exacttarget.com/' );
    die();
}
?>
