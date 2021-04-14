class LeaderBoard {
    constructor(element, options) {
        this.options = options;
        this.element = element;
        this.leaderboardData = null;
        this.create();
    }
    getOptions() {
        return this.options;
    }
    create() {
        $(this.element).html(`
			<table>
				<thead>
					<tr>
						<thead></thead>
					</tr>
				</thead>
			</table>
		`);
        console.log(this.element);
    }
    update() {}

    getLeaderboardData() {
        if (options.coarse != null) {
            $.get("./Coarses/" + options.coarse + ".json", function (data) {
                this.coarseData = data;
            }).fail(function () {
                console.error("The coarse could not be found");
            });
        } else {
            console.warn("Course is not set");
        }
    }
}

$.fn.leaderBoard = function (obj) {
    let options = $.extend(
        {
            coarse: null,
        },
        obj
    );
    this.leaderBoard = new LeaderBoard(this, options);
    return this.leaderBoard;
};
