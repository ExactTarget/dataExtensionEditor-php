<?php
if( !isset( $_SESSION ) ) {
    session_start();
}

if( $_REQUEST['jwt'] ) {
    $_SESSION['etClient'] = new ET_Client( true, true, $_REQUEST['jwt']);
} else {
    // No JWT supplied, let's kick them back to the login page
    header( 'Location: https://imh.exacttarget.com/' );
    die();
}
?>
