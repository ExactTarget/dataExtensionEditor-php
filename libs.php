<?php
$docroot = $_SERVER['DOCUMENT_ROOT'];

// CORS
// respond to preflights
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
  // return only the headers and not the content
  // only allow CORS if we're doing a GET - i.e. no saving for now.
  if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']) && $_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'] == 'GET') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: X-Requested-With');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS');
  }
  exit;
}

require_once $docroot . "/vendor/Savant3.php";
require_once $docroot . "/ET_Client.php";

// Configuration for Savant
$savantConfig = array(
    'template_path' => array( $docroot . '/views' )
);

$savant = new Savant3( $savantConfig );

?>
