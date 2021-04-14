<?php 
	// Setting return type of file
	header('Content-type: application/json');
	include($_SERVER["DOCUMENT_ROOT"]."/Common/php/ListMedia.php");
	// Accessing the root directory to list files in requested file
	$directory 	= $_SERVER['DOCUMENT_ROOT'] . "/Resources/gallery/"; 
	$mainDirectory 	= "/Resources/gallery/"; 

	// Returning json data
	echo $_ListMedia->getJson($directory, $mainDirectory);
?>