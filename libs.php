<?php
$docroot = $_SERVER['DOCUMENT_ROOT'];

require_once $docroot . "/vendor/Savant3.php";
require_once $docroot . "/ET_Client.php";

// Configuration for Savant
$savantConfig = array(
    'template_path' => array( $docroot . '/views' )
);

$savant = new Savant3( $savantConfig );
?>
