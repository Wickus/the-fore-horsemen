function openCloseNavigation(navTrigger) {
	$(navTrigger).find("i").toggleClass("fa-bars");
	$(navTrigger).find("i").toggleClass("fa-times");
	$(".navigation-links-wrapper").toggle();
}