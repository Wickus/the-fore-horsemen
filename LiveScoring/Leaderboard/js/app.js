let LEADER_BOARD = null;
let COARSE = "benoni-country-club";

$(document).ready(function () {
    LEADER_BOARD = $("#leaderboard").leaderBoard({
        coarse: COARSE,
        format: "ryder-cup",
    });
});
