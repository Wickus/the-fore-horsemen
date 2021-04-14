$(document).ready(function () {
	// Initiate the gallery from available images
	$("#gallery").listMedia({
		url: "/Gallery/php/mediaList.php",
		afterMediaAdded: function () {
			/* Do a resize once more when all the images finish loading */
			$(".masonry-item.new img").one("load", function () {
				$('.grid').colcade("append", $(this).parent());
				$(this).parent().removeClass("new");
			}).each(function () {
				if (this.complete) {
					$(this).trigger('load');
				}
			});
		}
	});

	// initiate masenery layout on images
	$('.grid').colcade({
		columns: '.grid-col',
		items: '.masonry-item'
	});
});