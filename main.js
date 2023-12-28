import "./scss/style.scss";
import { generateQuizGrid } from "./quiz";
import { makePlayers, updateScore } from "./players";

makePlayers();

// global onclick
document.addEventListener("click", function (evnt) {
	updateScore(); // update all scores when a click happens
});

// print quiz
generateQuizGrid();
