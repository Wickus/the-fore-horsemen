<?php
include($_SERVER["DOCUMENT_ROOT"] . "/Common/php/functions.php"); 
$page_title = "Score Card";
$mobileNavigationClasses = " background-color-default scrolled";
$navigationLinkClasses = "color-secondary"; 
$websiteLogoPath = "/Resources/logo/logo-black.png";
$activeTab = getQueries()["q"];
// Tab button classes
$leaderBoardTabClasses = $activeTab != "scorecard" && $activeTab != "enterscore" ? "background-color-primary" : "background-color-secondary";
$scoreCardTabClasses = $activeTab == "scorecard" ? "background-color-primary" : "background-color-secondary";
$enterScoreTabClasses = $activeTab == "enterscore" ? "background-color-primary" : "background-color-secondary";
?>
<!DOCTYPE html>
<html>
	<head>
		<?php include($_SERVER["DOCUMENT_ROOT"] . "/Common/Header.php") ?>
		<link rel="stylesheet" href="./styles.css?t=<?php echo $siteUpdated?>">
	</head>
	<body>
		<!-- Website Navigation -->
		<?php include($_SERVER["DOCUMENT_ROOT"] . "/Components/Navigation/index.php") ?>
		<div class="content-ctn background-color-default">
			<div class="content-row">
				<div class="tab-container color-secondary">
					<a href="?q=leaderboard"><button type="button" class="<?php echo $leaderBoardTabClasses?>">Leaderboard</button></a>
					<a href="?q=scorecard"><button type="button" class="<?php echo $scoreCardTabClasses?>">Score Card</button></a>
					<a href="?q=enterscore"><button type="button" class="<?php echo $enterScoreTabClasses?>">Enter Score</button></a>
				</div>
			</div>

			<?php
				switch(true){
					case $activeTab == "scorecard":
						include($_SERVER["DOCUMENT_ROOT"] . "/LiveScoring/ScoreCard/index.php");
						break;
					case $activeTab == "enterscore":
						include($_SERVER["DOCUMENT_ROOT"] . "/LiveScoring/EnterScore/index.php");
						break;
					default:
					include($_SERVER["DOCUMENT_ROOT"] . "/LiveScoring/Leaderboard/index.php");							
				}
			?>
		</div>
	</body>
</html>