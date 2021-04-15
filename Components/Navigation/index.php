<?php
if(userDevice() == "tablet" || userDevice() == "mobile"){
	$mobileNavigationClasses = "mobile-navigation background-color-default ";
	$websiteLogoPath = "/Resources/Logo/logo-black.png";
	$navigationLinkClasses = "color-secondary";
}
?>

<link rel="stylesheet" href="/Components/Navigation/styles.css?t=<?php echo $siteUpdated?>">
<script defer type="text/javascript" src="/Components/Navigation/scripts.js?t=<?php echo $siteUpdated?>"></script>
<!-- Navigation -->
<div class="navigation-wrapper component <?php echo $mobileNavigationClasses ?>">
	<div class="mobile-nav-trigger-wrapper">
		<a role="button" href="#" onclick="openCloseNavigation(this)"><i class="fas fa-bars fa-2x color-secondary"></i></a>
	</div>
	<div class="logo-wrapper">
		<a href="/"><img src="<?php echo $websiteLogoPath ?>" alt="Website Logo"></a>
	</div>
	<div class="navigation-links-wrapper">
		<nav>
			<ul>
				<a href="/" class="<?php echo $navigationLinkClasses ?>">
					<li><i class="fas fa-home fa-lg"></i> <label>Club House</label> </li>
				</a>
				<a href="/Gallery/" class="<?php echo $navigationLinkClasses ?>">
					<li><i class="far fa-images fa-lg"></i> <label>Gallery</label> </li>
				</a>
				<a href="/LiveScoring/?q=leaderboard" class="<?php echo $navigationLinkClasses ?>">
					<li class="beta"><i class="fas fa-th-list"></i> <label>Live Scoring</label> </li>
				</a>
				<a href="https://www.pgatour.com/stats/stat.186.html" class="<?php echo $navigationLinkClasses ?>">
					<li><i class="fas fa-list-ol"></i> <label>PGA Stats</label> </li>
				</a>
				<a href="https://booking.playmoregolf.co.za/dashboard" class="<?php echo $navigationLinkClasses ?>">
					<li><i class="fas fa-golf-ball"></i> <label>Play More Golf</label> </li>
				</a>
			</ul>
		</nav>
	</div>
	<div class="navigation-extras">
		<a href="#"><button type="button" class="background-color-secondary">Player Login</button></a>
		<a role="button" href="https://www.facebook.com/groups/364000880875138" target="_blank"><i class="fab fa-facebook fa-2x <?php echo $navigationLinkClasses ?>"></i></a>
		<a role="button" href="https://www.instagram.com/theforehorsemen/" target="_blank"><i class="fab fa-instagram fa-2x <?php echo $navigationLinkClasses ?>"></i></a>
	</div>
</div>