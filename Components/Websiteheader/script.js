$(document).ready(function () {
    var video = $(".website-header video").get(0);
    if (video.paused) {
        video.play();
    }
});
