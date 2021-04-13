<?php
include($_SERVER["DOCUMENT_ROOT"] . "/Common/php/functions.php"); 
$page_title = "Club House";
$mobileNavigationClasses = "animate";
$navigationLinkClasses = ""; 
$websiteLogoPath = "/Resources/logo/logo-white.png";
?>
<!DOCTYPE html>
<html>
	<head>
		<?php include($_SERVER["DOCUMENT_ROOT"] . "/Common/Header.php") ?>
		<link rel="stylesheet" href="./ScoreCard/styles.css"/>
		<script type="text/javascript" src="./ScoreCard/script.js"></script>
	</head>
	<body>
		<!-- Website Navigation -->
		<?php include($_SERVER["DOCUMENT_ROOT"] . "/Components/Navigation/index.php") ?>
		<div class="content-ctn">
			<div class="heading">
				<h1></h1>
				<p></p>
			</div>
			<div class="score-card color-defualt">
				<table>
					<thead>
						<tr>
							<th colspan="20">Benoni Country Club: Score Card</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Hole</td>
						</tr>
						<tr>
							<td>Strokes</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="form  color-defualt">
				<h3>Enter Score</h3>
				<div>
					<label>Strokes</label>
					<input type="number" name="strokes" value="0">
				</div>
				<button type="button" onclick="addStrokes()">Submit Strokes</button>
			</div>
		</div>
	</body>
</html>