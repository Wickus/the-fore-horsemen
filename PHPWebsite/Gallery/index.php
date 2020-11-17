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
		<script defer type="text/javascript" src="/Common/js/list-media.js"></script>
		<script defer type="text/javascript" src="/Gallery/scripts.js"></script>
	</head>
	<body>
		<!-- Website Navigation -->
		<?php include($_SERVER["DOCUMENT_ROOT"] . "/Components/Navigation/index.php") ?>
		<div id="gallery">
			<div class="grid"></div>
		</div>
		<!-- Website Footer -->	
		<?php include($_SERVER["DOCUMENT_ROOT"] . "/Components/WebsiteFooter/index.php") ?>
	</body>
</html>