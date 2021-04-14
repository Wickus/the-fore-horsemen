<?php
include($_SERVER["DOCUMENT_ROOT"] . "/Common/php/functions.php"); 
$page_title = "Club House";
$mobileNavigationClasses = "animate";
$navigationLinkClasses = ""; 
?>
<!DOCTYPE html>
<html>
	<head>
		<?php include($_SERVER["DOCUMENT_ROOT"] . "/Common/Header.php") ?>
	</head>
	<body>
		<!-- Website Navigation -->
		<?php include($_SERVER["DOCUMENT_ROOT"] . "/Components/Navigation/index.php") ?>
		<!-- Page Header -->
		<?php include($_SERVER["DOCUMENT_ROOT"] . "/Components/WebsiteHeader/index.php") ?>
		<!-- Page Content -->
		<div class="content-ctn">
			<!-- Introduction section -->
			<div id="Introduction" class="content-row">
				<div class="content-image">
					<img src="/ClubHouse/Resources/the-fore-horsemen-members.jpg" alt="The Fore Horsemen Members">
				</div>
				<div class="content background-color-default">
					<h2>About The Fore Horsemen</h2>
					<p>
						A group of friends, playing as amateur golfers contesting to become the top player in the group.
						Started only with a few close friends we have grown to become a competitive group of 21 members 
						with handicaps ranging from 6 to 18. We play a competition every month to gain points for the 
						years race to the Round Table and for the end of the years Masters placement.
					</p>
					<p>
						This years masters will be the biggest one yet where every member will have to work hard for his placement on the top 
						of the leader board to become the king of The Fore Horsemen for the following year, then we start again from the
						bottom with new compositions new courses and hopefully new members that will join us on the journey to make The Fore Horsemen
						on of the biggest golfing groups and golf event groups in Gauteng and then South Africa.
					</p>
				</div>
			</div>
			<!-- Events && Competition -->
			<div id="EventsAndCompetitions" class="content-row">
				<div class="card-item background-color-default">
					<div class="icon color-primary">
						<i class="fas fa-golf-ball fa-4x"></i>
					</div>
					<div class="content">
						<h3>Monthly Competitions</h3>
						<p>
							This years masters will be the biggest one yet where every member will have to work hard for his placement on the top 
							of the leader board to become the king of The Fore Horsemen for the following year, then we start again from the
							bottom with new compositions new courses and hopefully new members that will join us on the journey to make The Fore Horsemen
							on of the biggest golfing groups and golf event groups in Gauteng and then South Africa.
						</p>
					</div>
				</div>
				<div class="card-item background-color-default">
					<div class="icon color-primary">
						<i class="fas fa-circle fa-4x"></i>
					</div>
					<div class="content">
						<h3>Race To The Round Table</h3>
						<p>
							This years masters will be the biggest one yet where every member will have to work hard for his placement on the top 
							of the leader board to become the king of The Fore Horsemen for the following year, then we start again from the
							bottom with new compositions new courses and hopefully new members that will join us on the journey to make The Fore Horsemen
							on of the biggest golfing groups and golf event groups in Gauteng and then South Africa.
						</p>
					</div>
				</div>
				<div class="card-item background-color-default">
					<div class="icon color-primary">
						<i class="fas fa-trophy fa-4x"></i>
					</div>
					<div class="content">
						<h3>The Masters</h3>
						<p>
							This years masters will be the biggest one yet where every member will have to work hard for his placement on the top 
							of the leader board to become the king of The Fore Horsemen for the following year, then we start again from the
							bottom with new compositions new courses and hopefully new members that will join us on the journey to make The Fore Horsemen
							on of the biggest golfing groups and golf event groups in Gauteng and then South Africa.
						</p>
					</div>
				</div>
			</div>
		</div>	
		<!-- Spacer -->
		<?php include($_SERVER["DOCUMENT_ROOT"] . "/Components/Spacer/index.php") ?>
		<!-- Website Footer -->	
		<?php include($_SERVER["DOCUMENT_ROOT"] . "/Components/WebsiteFooter/index.php") ?>
	</body>
</html>