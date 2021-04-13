const CLUB = "benoni-country-club";
let COARSE_DATA = null;
let STROKES = 0;

$(document).ready(function () {
    getCoarseInfo();

    if (!Storage) {
        alert("Browser not supported.");
    }
});

const getCoarseInfo = () => {
    $.get("/LiveScoring/Coarses/" + CLUB + ".json", (data) => {
        createScoreCard(data);
    });
};

const setCoarseData = (obj) => {
    COARSE_DATA = localStorage.getItem("score-card-data") ? localStorage.getItem("score-card-data") : storeCoarse(obj);
    return JSON.parse(COARSE_DATA);
};

const storeCoarse = (obj) => {
    let storObj = {};
    const scoreCard = Object.keys(obj.holes).map((hole, index) => {
        return { ...storObj, hole: hole, strokes: 0 };
    });

    localStorage.setItem("score-card-data", JSON.stringify(scoreCard));
    return JSON.stringify(scoreCard);
};

const setStrokes = () => {
    let coarse_data = JSON.parse(COARSE_DATA);

    coarse_data.map((item) => {
        STROKES += item.strokes;
    });

    $(".score-card table tbody tr:first-child").append("<td>Total</td>");
    $(".score-card table tbody tr:last-child").append("<td>" + STROKES + "</td>");
};

const createScoreCard = (obj) => {
    const club = obj.club;
    const slope = obj.slope;
    const par = obj.par;
    const coarse_data = setCoarseData(obj);

    $(".score-card table th").html(`
		<h2>${club}</h2>
		<p>S.I: ${slope} / PAR: ${par}</p>
	`);

    Object.keys(obj.holes).map((hole, index) => {
        $(".score-card table tbody tr:first-child").append("<td>" + hole + "</td>");
    });

    coarse_data.map((item) => {
        $(".score-card table tbody tr:last-child").append("<td>" + item.strokes + "</td>");
    });

    setStrokes();
};
