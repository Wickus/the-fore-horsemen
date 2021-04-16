class ScoreForm {
    constructor(element, options) {
        this.options = options;
        this.element = element;
        this.user = localStorage.getItem("username");
        this.userInfo = {};
        this.hole = 1;
        this.coarseData = {};
        this.getCoarseData();
    }

    getCoarseData() {
        const self = this;
        $.get("/LiveScoring/Coarses/" + this.options.coarse + ".json", function (data) {
            self.coarseData = data;
            self.create();
        });
    }

    getScoreCard() {
        const self = this;
        const user = this.user;

        DATABSE.ref()
            .child("players")
            .child(user)
            .on("value", (snapshot) => {
                if (snapshot.exists()) {
                    const info = snapshot.val();

                    self.userInfo = info;

                    $(".holes").remove();

                    $(self.element).append("<div class='holes'></div>");

                    $.each(info.scorecard, function (index) {
                        $(".holes").append("<div class='hole' data-score='" + this.strokes + "' data-hole='" + (index + 1) + "'>" + (index + 1) + "</div>");
                    });

                    $($(".holes .hole")[info.hole - 1]).addClass("background-color-primary");

                    self.createForm();
                    self.events();
                }
            });
    }
    create() {
        this.getScoreCard();
    }
    update() {}

    setHole(hole) {
        const user = this.user;
        this.userInfo.hole = parseInt(hole);
        DATABSE.ref().child("players").child(user).set(this.userInfo);
    }

    createForm() {
        const self = this;
        $(".score-form").remove();
        $(this.element).append(`
			<div class="score-form">
				<form name="score">
					<p>S.I: ${self.coarseData.holes[self.userInfo.hole].stroke} / Par:${self.coarseData.holes[self.userInfo.hole].par}</p>
					<label>Enter strokes:</label>
					<input type="number" name="strokes" placeholder="Enter strokes" value="${self.userInfo.scorecard[parseInt(self.userInfo.hole) - 1].strokes}">
					<label>Enter putts:</label>
					<input type="number" name="putts" placeholder="Enter putts" value="${self.userInfo.scorecard[parseInt(self.userInfo.hole) - 1].putts}">
					<label>Score:</label>
					<input type="number" name="score" placeholder="Enter putts" value="${self.userInfo.scorecard[parseInt(self.userInfo.hole) - 1].score}" readonly>
					<button type="submit" class="background-color-secondary">Next Hole</button>
				</form>
			</div>
		`);
    }

    calculateScore() {
        const self = this;
        const user = this.user;
        let score = 0;
        $.each(self.userInfo.scorecard, function (index) {
            if (this.strokes != 0) {
                let hole = index + 1;
                score += this.strokes - self.coarseData.holes[hole].par;
            }
        });
        self.userInfo.score = score;
        DATABSE.ref().child("players").child(user).set(self.userInfo);
    }

    events() {
        const self = this;
        const user = this.user;

        $(document).on("click tap", ".hole", function () {
            const hole = $(this).attr("data-hole");
            self.setHole(hole);
        });

        $(document)
            .off("submit", "form[name='score']")
            .on("submit", "form[name='score']", function (event) {
                event.preventDefault();

                const strokes = parseInt($(this).find("input[name='strokes']").val());
                const putts = parseInt($(this).find("input[name='putts']").val());
                const score = parseInt($(this).find("input[name='score']").val());

                self.userInfo.scorecard[parseInt(self.userInfo.hole) - 1].strokes = strokes;
                self.userInfo.scorecard[parseInt(self.userInfo.hole) - 1].putts = putts;
                self.userInfo.scorecard[parseInt(self.userInfo.hole) - 1].score = score;

                DATABSE.ref().child("players").child(user).set(self.userInfo);
                self.setHole(parseInt(self.userInfo.hole) + 1);
                self.calculateScore();
            });

        $(document)
            .off("input", "input[name='strokes']")
            .on("input", "input[name='strokes']", function (event) {
                $("input[name='score']").val(self.calculateStablefordScore(parseInt($(this).val())));
            });
    }

    // https://www.bunkered.co.uk/golf-news/stableford-the-golf-scoring-system-explained
    calculateStablefordScore(strokes) {
        const self = this;
        const hole = self.userInfo.hole;
        const holeStroke = self.coarseData.holes[hole].stroke;
        const holePar = self.coarseData.holes[hole].par;
        let hci = self.userInfo.hci;
        const extraScore = self.calcExtraStrokes(hci, holeStroke);
        let score = 0;

        switch (true) {
            case strokes - holePar == -4:
                score = 6 + extraScore;
                break;
            case strokes - holePar == -3:
                score = 5 + extraScore;
                break;
            case strokes - holePar == -2:
                score = 4 + extraScore;
                break;
            case strokes - holePar == -1:
                score = 3 + extraScore;
                break;
            case strokes - holePar == 0:
                score = 2 + extraScore;
                break;
            case strokes - holePar == 1:
                score = 1 + extraScore;
                break;
            case strokes - holePar > 1:
                if (strokes > holePar + 2 + extraScore) {
                    strokes = holePar + 2 + extraScore;
                    score = 0;
                    $("input[name='strokes']").addClass("addjusted").val(strokes);
                } else {
                    score = holePar + 2 + extraScore - strokes;
                }
                break;
        }

        return score;
    }

    calcExtraStrokes(hci, stroke) {
        let diff = 0;
        let toHole = 0;
        let extraScore = 0;

        if (hci > 18) {
            diff = hci - 18;
            extraScore += 1;

            while (diff > 0) {
                extraScore += 1;
                diff -= 18;
            }
        } else {
            if (hci > stroke) {
                extraScore += 1;
            }
        }

        toHole = diff + 18;

        if (stroke > toHole) {
            extraScore -= 1;
        }

        return extraScore;
    }
}

$.fn.scoreForm = function (options) {
    this.scoreForm = new ScoreForm(this, $.extend({ coarse: null }, options));
    return this.scoreForm;
};
