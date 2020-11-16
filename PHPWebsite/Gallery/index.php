<?php
include($_SERVER["DOCUMENT_ROOT"] . "/Common/php/functions.php"); 
$page_title = "Gallery";
$mobileNavigationClasses = " background-color-default scrolled";
$navigationLinkClasses = "color-secondary"; 
$websiteLogoPath = "/Resources/logo/logo-black.png";
?>
<!DOCTYPE html>
<html>
	<head>
		<?php include($_SERVER["DOCUMENT_ROOT"] . "/Common/Header.php") ?>
	</head>
	<body>
		<!-- Website Navigation -->
		<?php include($_SERVER["DOCUMENT_ROOT"] . "/Components/Navigation/index.php") ?>
		<div id="gallery"></div>
	</body>
</html>