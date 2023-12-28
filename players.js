import { getGlobalPoints } from "./quiz";

var teams = [
	{ teamName: "Team A", score: 0 },
	{ teamName: "Team B", score: 0 },
	{ teamName: "Team C", score: 0 },
];

export function makePlayers() {
	const plusButton = document.querySelector(".score-controls .add");
	//console.log(plusButton);

	const minusButton = document.querySelector(".score-controls .minus");
	//console.log(minusButton);

	const footer = document.querySelector(".grid__footer");
	//console.log(footer);

	teams.forEach((t) => {
		//console.log(t.teamName);
		// Add parent div
		const playerDiv = document.createElement("div");
		playerDiv.classList.add("player");
		footer.append(playerDiv);

		// Team name
		const team = document.createElement("p");
		team.classList.add("teamName");
		team.setAttribute("contenteditable", "true");
		playerDiv.append(team);
		team.innerText = t.teamName;

		// Score
		const scoreHTML = document.createElement("p");
		scoreHTML.classList.add("score-controls");
		scoreHTML.setAttribute("id", "score");
		playerDiv.append(scoreHTML);
		scoreHTML.innerText = t.score;

		// Score controls (+ / -)
		const tmpDiv = document.createElement("div");
		playerDiv.append(tmpDiv);

		const addBtn = document.createElement("button");
		addBtn.classList.add("add");
		const minusBtn = document.createElement("button");
		minusBtn.classList.add("minus");
		tmpDiv.append(addBtn);
		tmpDiv.append(minusBtn);

		const btnPlus = document.createElement("p");
		btnPlus.innerText = "+";
		const btnMinus = document.createElement("p");
		btnMinus.innerText = "-";
		addBtn.append(btnPlus);
		minusBtn.append(btnMinus);

		//console.log(scoreHTML);
		addBtn.addEventListener("click", function () {
			var incr = getGlobalPoints();
			t.score += incr;
			updateScore();
		});
		minusBtn.addEventListener("click", function () {
			var incr = getGlobalPoints() * -1;
			t.score += incr;
			updateScore();
		});
	});
}

export function updateScore() {
	// store scores as an array
	var scoresArray = teams.map(function (team) {
		return team.score;
	});

	// querying for all #score 's
	const scoreElements = document.querySelectorAll("#score");

	// updating all scores
	for (let i = 0; i < scoreElements.length; i++) {
		scoreElements[i].innerText = scoresArray[i];
	}
}
