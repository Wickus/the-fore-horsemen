class ScoreCard {
    constructor(element, options) {
        this.element = element;
        this.options = options;
        this.coarseData = {};
        this.user = localStorage.getItem("username");
        this.userInfo = {};

        this.getCoarseData();
    }

    create() {
        this.getScoreCard();
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

                    this.createFirstNine();
                    this.createBackNine();
                    this.createSummary();
                }
            });
    }

    getCoarseData() {
        const self = this;
        $.get("/LiveScoring/Coarses/" + this.options.coarse + ".json", function (data) {
            self.coarseData = data;
            self.create();
        });
    }

    createFirstNine() {
        const self = this;
        const holes = self.coarseData.holes;
        const scoreCard = self.userInfo.scorecard;

        $(self.element).find("table#front-nine").remove();
        $(self.element).append(`
			<table id="front-nine">
				<thead>
					<tr>
						<th colspan="11">Front Nine</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td><strong>Holes</strong></td>
					</tr>
					<tr>
						<td><strong>Par</strong></td>
					</tr>
					<tr>
						<td><strong>S.I</strong></td>
					</tr>
					<tr>
						<td><strong>Score</strong></td>
					</tr>
					<tr>
						<td><strong>Putts</strong></td>
					</tr>
				</tbody>
			</table>
		`);

        firsnine: for (let i = 0; i < 9; i++) {
            $(self.element)
                .find("table#front-nine tbody tr:nth-child(1)")
                .append("<td><strong>" + (i + 1) + "</strong></td>");
            $(self.element)
                .find("table#front-nine tbody tr:nth-child(2)")
                .append("<td><strong>" + holes[i + 1].par + "</strong></td>");
            $(self.element)
                .find("table#front-nine tbody tr:nth-child(3)")
                .append("<td><strong>" + holes[i + 1].stroke + "</strong></td>");
            $(self.element)
                .find("table#front-nine tbody tr:nth-child(4)")
                .append("<td>" + scoreCard[i].strokes + "</td>");
            $(self.element)
                .find("table#front-nine tbody tr:nth-child(5)")
                .append("<td>" + scoreCard[i].putts + "</td>");
        }

        $(self.element).find("table#front-nine tbody tr:nth-child(1)").append("<td><strong>Total</strong></td>");
        $(self.element)
            .find("table#front-nine tbody tr:nth-child(2)")
            .append("<td><strong>" + self.calculateTotal($(self.element).find("table#front-nine tbody tr:nth-child(2)")) + "</strong></td>");
        $(self.element).find("table#front-nine tbody tr:nth-child(3)").append("<td></td>");
        $(self.element)
            .find("table#front-nine tbody tr:nth-child(4)")
            .append("<td><strong>" + self.calculateTotal($(self.element).find("table#front-nine tbody tr:nth-child(4)")) + "</strong></td>");
        $(self.element)
            .find("table#front-nine tbody tr:nth-child(5)")
            .append("<td><strong>" + self.calculateTotal($(self.element).find("table#front-nine tbody tr:nth-child(5)")) + "</strong></td>");
    }

    createBackNine() {
        const self = this;
        const holes = self.coarseData.holes;
        const scoreCard = self.userInfo.scorecard;

        $(self.element).find("table#back-nine").remove();
        $(self.element).append(`
			<table id="back-nine">
				<thead>
					<tr>
						<th colspan="11">Back Nine</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td><strong>Holes</strong></td>
					</tr>
					<tr>
						<td><strong>Par</strong></td>
					</tr>
					<tr>
						<td><strong>S.I</strong></td>
					</tr>
					<tr>
						<td><strong>Score</strong></td>
					</tr>
					<tr>
						<td><strong>Putts</strong></td>
					</tr>
				</tbody>
			</table>
		`);

        backnine: for (let i = 9; i < 18; i++) {
            $(self.element)
                .find("table#back-nine tbody tr:nth-child(1)")
                .append("<td><strong>" + (i + 1) + "</strong></td>");
            $(self.element)
                .find("table#back-nine tbody tr:nth-child(2)")
                .append("<td><strong>" + holes[i + 1].par + "</strong></td>");
            $(self.element)
                .find("table#back-nine tbody tr:nth-child(3)")
                .append("<td><strong>" + holes[i + 1].stroke + "</strong></td>");
            $(self.element)
                .find("table#back-nine tbody tr:nth-child(4)")
                .append("<td>" + scoreCard[i].strokes + "</td>");
            $(self.element)
                .find("table#back-nine tbody tr:nth-child(5)")
                .append("<td>" + scoreCard[i].putts + "</td>");
        }

        $(self.element).find("table#back-nine tbody tr:nth-child(1)").append("<td><strong>Total</strong></td>");
        $(self.element)
            .find("table#back-nine tbody tr:nth-child(2)")
            .append("<td><strong>" + self.calculateTotal($(self.element).find("table#back-nine tbody tr:nth-child(2)")) + "</strong></td>");
        $(self.element).find("table#back-nine tbody tr:nth-child(3)").append("<td></td>");
        $(self.element)
            .find("table#back-nine tbody tr:nth-child(4)")
            .append("<td><strong>" + self.calculateTotal($(self.element).find("table#back-nine tbody tr:nth-child(4)")) + "</strong></td>");
        $(self.element)
            .find("table#back-nine tbody tr:nth-child(5)")
            .append("<td><strong>" + self.calculateTotal($(self.element).find("table#back-nine tbody tr:nth-child(5)")) + "</strong></td>");
    }

    createSummary() {
        const self = this;
        $(this.element).append(`
			<div class="summary">
				<div>
					<p>Total Score</p>
					<span>${
                        parseInt($(self.element).find("table#front-nine tbody tr:nth-child(4) td:last-child").text()) +
                        parseInt($(self.element).find("table#back-nine tbody tr:nth-child(4) td:last-child").text())
                    }</span>
				</div>
				<div>
					<p>Total Putts</p>
					<span>${
                        parseInt($(self.element).find("table#front-nine tbody tr:nth-child(5) td:last-child").text()) +
                        parseInt($(self.element).find("table#back-nine tbody tr:nth-child(5) td:last-child").text())
                    }</span>
				</div>
			</div>
		`);
    }

    calculateTotal(elm) {
        let count = 0;
        $(elm)
            .children()
            .each(function (i) {
                if (i > 0 && i < 10) {
                    count += parseInt($(this).text());
                }
            });
        return count;
    }
}

$.fn.scoreCard = function (options) {
    this.scoreCard = new ScoreCard(this, $.extend({ coarse: null }, options));
    return this.scoreCard;
};
