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
					<label>Enter score:</label>
					<input type="number" name="strokes" placeholder="Enter score" value="${self.userInfo.scorecard[parseInt(self.userInfo.hole) - 1].strokes}">
					<label>Enter putts:</label>
					<input type="number" name="putts" placeholder="Enter putts" value="${self.userInfo.scorecard[parseInt(self.userInfo.hole) - 1].putts}">
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

                const strokes = $(this).find("input[name='strokes']").val();
                const putts = $(this).find("input[name='putts']").val();

                self.userInfo.scorecard[parseInt(self.userInfo.hole) - 1].strokes = strokes;
                self.userInfo.scorecard[parseInt(self.userInfo.hole) - 1].putts = putts;

                DATABSE.ref().child("players").child(user).set(self.userInfo);
                self.setHole(parseInt(self.userInfo.hole) + 1);
                self.calculateScore();
            });
    }
}

$.fn.scoreForm = function (options) {
    this.scoreForm = new ScoreForm(this, $.extend({ coarse: null }, options));
    return this.scoreForm;
};
