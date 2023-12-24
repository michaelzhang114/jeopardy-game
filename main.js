import "./scss/style.scss";

const plusButton = document.querySelector(".score-controls .add");
//console.log(plusButton);

const minusButton = document.querySelector(".score-controls .minus");
//console.log(minusButton);

var score = document.querySelector("#score").firstChild.nodeValue;

function addScore() {
	score = parseInt(score) + 100;
	document.querySelector("#score").innerHTML = score;
}

function minusScore() {
	score = parseInt(score) - 100;
	document.querySelector("#score").innerHTML = score;
}

plusButton.addEventListener("click", addScore);
minusButton.addEventListener("click", minusScore);
