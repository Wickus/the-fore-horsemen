$(document).ready(function () {
	setMenuOnScroll();
	$(window).on("scroll", function () {
		setMenuOnScroll();
	});
});

function openCloseNavigation(navTrigger) {
	$(navTrigger).find("i").toggleClass("fa-bars");
	$(navTrigger).find("i").toggleClass("fa-times");
	$(".navigation-links-wrapper").toggle();
}

function setMenuOnScroll() {
	var windowOffset = $(window).scrollTop();
	var windowHeight = $(window).height() - 200;
	var windowWidth = $(window).width();
	
	if (windowWidth > 1230 && $(".navigation-wrapper.animate").length > 0) {
		if (windowOffset > windowHeight) {
			$(".navigation-wrapper.animate").addClass("background-color-default scrolled color-secondary");
			$(".animate .logo-wrapper").addClass("scrolled");
			$(".animate .logo-wrapper img").get(0).src = "/Resources/logo/logo-black.png";
		} else {
			$(".navigation-wrapper.animate").removeClass("background-color-default scrolled color-secondary");
			$(".animate .logo-wrapper").removeClass("scrolled");
			$(".animate .logo-wrapper img").get(0).src = "/Resources/logo/logo-white.png";
		}
	}
}