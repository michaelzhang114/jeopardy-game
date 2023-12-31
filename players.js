import { getGlobalPoints } from "./quiz";

var teams = [
	{ teamName: "Team A", score: 0 },
	{ teamName: "Team B", score: 0 },
	{ teamName: "Team C", score: 0 },
];

export function makePlayers() {
	const footer = document.querySelector(".grid__footer");
	//console.log(footer);

	teams.forEach((t) => {
		createOnePlayer(t, footer);
	});

	const footerSide = document.querySelector(".grid__footer-side");

	const addPlayerBtn = document.createElement("button");
	addPlayerBtn.setAttribute("id", "add-new-player");
	addPlayerBtn.innerText = "Add Player";
	footerSide.append(addPlayerBtn);
	addPlayerBtn.addEventListener("click", () => addPlayer());

	const removePlayerBtn = document.createElement("button");
	removePlayerBtn.innerText = "Remove Player";
	footerSide.append(removePlayerBtn);
	removePlayerBtn.addEventListener("click", () => removeLastPlayer());
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

function addPlayer() {
	if (teams.length == 5) {
		return;
	}
	const footer = document.querySelector(".grid__footer");
	var newPlayer = { teamName: "New Team", score: 0 };
	teams.push(newPlayer);
	createOnePlayer(newPlayer, footer);
	//console.log(teams);
}

function removeLastPlayer() {
	if (teams.length <= 2) return;
	const footer = document.querySelector(".grid__footer");
	const allPlayers = footer.querySelectorAll(".player");
	const lastPlayer = allPlayers[allPlayers.length - 1];
	lastPlayer.remove();
	teams.pop();
}

function createOnePlayer(t, footer) {
	//console.log(t.teamName);
	const addNewPlayerBtn = document.getElementById("add-new-player");
	// Add parent div
	const playerDiv = document.createElement("div");
	playerDiv.classList.add("player");
	footer.append(playerDiv);
	//footer.insertBefore(playerDiv, addNewPlayerBtn);

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

	// const plusButton = document.querySelector(".score-controls .add");
	// const minusButton = document.querySelector(".score-controls .minus");

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
}
