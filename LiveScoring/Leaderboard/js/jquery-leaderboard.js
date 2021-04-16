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
        this.players = {};
        this.groups = {};
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

            if (self.options.format == "ryder-cup") {
                self.getGroups();
            }
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

    getGroups() {
        const self = this;
        DATABSE.ref("groups").on("value", (snapshot) => {
            self.groups = snapshot.val();
            self.createRyderCupGroups();
        });
    }

    // create ryder cup format elements
    createRyderCupGroups() {
        const self = this;
        const groups = Object.keys(self.groups);
        const players = this.players;

        $(self.element).find("#groups").remove();
        $(self.element).append("<div id='groups'></div>");

        $.each(groups, function (index) {
            $(self.element).find("#groups").append(`
				<div id="group${index + 1}">
					<h3>Group ${index + 1}</h3>
					<div class="fore">
						<div class="skin">SQUARE</div>
					</div>
					<div class="horsemen">
						<div class="skin">SQUARE</div>
					</div>
				</div>
			`);

            $.each(self.groups[index + 1], function () {
                const name = players[this].name;
                const lastName = players[this].lastname;
                const team = players[this].team;

                $("<div class='team-" + team + "'><span>" + name + " " + lastName + "</span></div>").insertBefore($("#group" + (index + 1) + " ." + team).children()[0]);
            });

            self.setSkin(self.groups[index + 1], index + 1);
        });
    }

    setSkin(groupMembers, group) {
        const self = this;
        let foreSkin = 0;
        let horseMenSkin = 0;

        const member1 = self.players[groupMembers[0]];
        const member2 = self.players[groupMembers[1]];
        const member3 = self.players[groupMembers[2]];
        const member4 = self.players[groupMembers[3]];

        for (let i = 0; i < 18; i++) {
            let foreScore = member1.scorecard[i].score + member2.scorecard[i].score;
            let horsemenScore = member3.scorecard[i].score + member4.scorecard[i].score;

            switch (true) {
                case foreScore > horsemenScore:
                    foreSkin += 1;
                    horseMenSkin -= 1;
                    break;
                case foreScore < horsemenScore:
                    horseMenSkin += 1;
                    foreSkin -= 1;
                    break;
            }
        }

        switch (true) {
            case foreSkin > 0:
                $("#group1 .fore .skin").html(foreSkin + " UP");
                break;
            case foreSkin < 0:
                $("#group1 .fore .skin").html(foreSkin * -1 + " DOWN");
                break;
        }

        switch (true) {
            case horseMenSkin > 0:
                $("#group1 .horsemen .skin").html(foreSkin + " UP");
                break;
            case horseMenSkin < 0:
                $("#group1 .horsemen .skin").html(horseMenSkin * -1 + " DOWN");
                break;
        }
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
