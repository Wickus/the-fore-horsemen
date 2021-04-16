/*
options:
	coarse: the corse json file
	format: the format of the event
*/
class LeaderBoard {
    constructor(element, options) {
        this.options = options;
        this.element = element;
        this.leaderboardData = null;
        this.create();
    }
    // Get the settings of the class
    getOptions() {
        return this.options;
    }
    // Creation of the table
    create() {
        const self = this;
        const element = this.element;

        this.getLeaderboardData();

        // Async method for getting data
        $(element).on("dataReady", function (event, data) {
            $(element).html(`
				<h3>Ryder Cup: ${data.club}</h3>
				<p>Player Leaderboard</p>
				<table>
					<thead>
						<tr>
							<th>Pos</th>
							<th>Player</th>
							<th>Thru</th>
							<th>Total</th>
						</tr>
					</thead>
					<tbody></tbody>
				</table>
			`);
            self.getPlayers();
        });
    }

    // get players from firebase
    getPlayers() {
        const self = this;
        DATABSE.ref("players").on("value", (snapshot) => {
            let players = snapshot.val();
            self.players = players;
            self.listPlayers();
        });
    }

    // List the players in thier position
    listPlayers() {
        const self = this;
        const players = self.players;
        let html = "";

        Object.keys(players).map((username, index) => {
            let player = players[username];
            html += `<tr>
						<td>${index + 1}</td>
						<td class="team-${player.team}">${player.name} ${player.lastname}</td>
						<td>${player.hole}</td>
						<td data-score="${player.score}">${player.score == 0 ? "E" : player.score}</td>
					</tr>`;
            if (index === Object.keys(players).length - 1) {
                $(document).trigger("list-players", [html]);
            }
        });
        $(this.element).find("table tbody").html(html);
        this.update();
    }

    // Getting the table information
    getLeaderboardData() {
        const element = this.element;

        if (this.options.coarse != null) {
            $.get("./Coarses/" + this.options.coarse + ".json", function (data) {
                this.coarseData = data;
                $(element).trigger("dataReady", [data]);
            }).fail(function () {
                console.error("The coarse could not be found");
            });
        } else {
            console.warn("Course is not set");
        }
    }

    // Update of the table
    update() {
        this.sortTable();
        this.setPosition();
    }

    // Sort table
    sortTable() {
        const modifier = 1; // assending
        const table = $(this.element).find("table");
        const rows = Array.from($(table).find("tbody tr"));
        const col = 4; // column number to sort

        const sortedRows = rows.sort((a, b) => {
            const aColNum = parseInt(
                $(a)
                    .find("td:nth-child(" + col + ")")
                    .attr("data-score")
            );
            const bColNum = parseInt(
                $(b)
                    .find("td:nth-child(" + col + ")")
                    .attr("data-score")
            );

            return aColNum > bColNum ? 1 * modifier : -1 * modifier;
        });

        table.find("tbody").html(sortedRows);
    }

    // set position
    setPosition() {
        const table = $(this.element).find("table");
        const rows = Array.from($(table).find("tbody tr"));
        let pos = 1;

        $.each(rows, function (index) {
            const score = $(this).find("td:last-child").attr("data-score");

            if (index > 0) {
                const prevPlayerScore = $(this).prev().find("td:last-child").attr("data-score") ? $(this).prev().find("td:last-child").attr("data-score") : 0;
                if (score != prevPlayerScore) {
                    pos += 1;
                }
                $(this).find("td:first-child").html(pos).attr("data-pos", pos);
            } else {
                $(this).find("td:first-child").html(pos).attr("data-pos", pos);
            }
        });
    }
}

// Initiating the class to a jQuery object
$.fn.leaderBoard = function (obj) {
    let options = $.extend(
        {
            coarse: null,
            format: "match-paly",
        },
        obj
    );
    this.leaderBoard = new LeaderBoard(this, options);
    return this.leaderBoard;
};
