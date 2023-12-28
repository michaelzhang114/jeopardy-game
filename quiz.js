var global_q_points = 100;

function makeQuiz() {
	var questionsForCE = [
		{
			question:
				"In Disney's \"The Little Mermaid,\" what is the name of Ariel's father, the ruler of the underwater kingdom?",
			answer: "King Triton",
		},
		{
			question:
				'In Disney\'s "Aladdin," what does the Genie turn into when Aladdin wishes to set him free?',
			answer: "a human",
		},
		{
			question:
				'In the Disney classic "Beauty and the Beast," what is the name of the villainous hunter who seeks to marry Belle?',
			answer: "Gaston",
		},
		{
			question:
				'Who directed the 2016 live-action adaptation of "The Jungle Book" for Disney, blending CGI and live-action elements?',
			answer: "Jon Favreau",
		},
	];
	var questionsForHistory = [
		{
			question:
				"What empire was founded by Genghis Khan and became the largest contiguous empire in history?",
			answer: "Mongol Empire",
		},
		{
			question:
				"Julius Caesar was assassinated on 15 March 44 BC, a date now often known by what term?",
			answer: "Ides of March",
		},
		{
			question:
				"Which document, adopted on July 4, 1776, declared the Thirteen American Colonies' independence from Great Britain?",
			answer: "Declaration of Independence",
		},
		{
			question:
				"Who was the leader of the Soviet Union during the Cuban Missile Crisis?",
			answer: "Nikita Khrushchev",
		},
	];
	var questionsForScience = [
		{
			question: "What is the smallest planet in our solar system?",
			answer: "Mercury",
		},
		{
			question: "What is the chemical symbol for the element gold?",
			answer: "Au",
		},
		{
			question:
				"What is the process by which plants convert sunlight into chemical energy?",
			answer: "photosynthesis",
		},
		{
			question:
				'What is the scientific name for the "voice box" in humans responsible for sound production?',
			answer: "Larynx",
		},
	];
	var questionsForGK = [
		{ question: "Boise is the capitol of what state?", answer: "Idaho" },
		{ question: "What does a monophone fear?", answer: "Being alone" },
		{
			question:
				"With how many bricks is the Empire State Building made of? A.) 100 million  B.) 5 million C.) 20 million  D.)10 million",
			answer: "10 million",
		},
		{
			question:
				"What is the name of the deepest point in Earth’s oceans? ",
			answer: "Mariana’s Trench ",
		},
	];

	var arrayOfQuestions = [];
	//console.log(questionsForCE);
	arrayOfQuestions.push(questionsForCE);
	arrayOfQuestions.push(questionsForHistory);
	arrayOfQuestions.push(questionsForScience);
	arrayOfQuestions.push(questionsForGK);
	//console.log(arrayOfQuestions);

	var categories = ["Disney", "History", "Science", "General Knowledge"];

	var quizMap = new Map();

	for (let i = 0; i < categories.length; i++) {
		// console.log(categories[i]);
		// console.log(arrayOfQuestions[i]);
		quizMap.set(categories[i], arrayOfQuestions[i]);
	}

	return [quizMap, [100, 200, 300, 400]];
}

export function getGlobalPoints() {
	return parseInt(global_q_points);
}

export function generateQuizGrid() {
	const [quizMap, questionPoints] = makeQuiz();
	// console.log("my quiz: \n");
	//console.log(quizMap);
	// console.log(questionPoints);
	const qGrid = document.querySelector(".grid__main");
	//console.log(qGrid);
	const table = document.createElement("table");
	qGrid.append(table);

	// create the header row with categories
	const headerRow = document.createElement("tr");
	var categories = quizMap.keys();
	while (true) {
		var result = categories.next();
		if (result.done) break;
		//console.log(result.value);
		var th = document.createElement("th");
		th.textContent = result.value;
		headerRow.append(th);
	}
	table.append(headerRow);

	const myQuizArray = flattenMapToArray(quizMap);
	//console.log(myQuizArray);

	// populate the rows
	var numberOfQuestionsPerCategory = quizMap.values().next().value.length;

	for (var i = 0; i < numberOfQuestionsPerCategory; i++) {
		var tr = document.createElement("tr");
		const currentQValue = questionPoints[i];
		for (var j = 0; j < numberOfQuestionsPerCategory; j++) {
			var td = document.createElement("td");
			td.textContent = currentQValue;
			td.setAttribute("data-question", myQuizArray[i][j].question);
			td.setAttribute("data-answer", myQuizArray[i][j].answer);
			td.setAttribute("data-points", currentQValue);
			//console.log(td.getAttribute("data-question"));
			// td.addEventListener("click", (e) => showQuestion(e, td));
			// Use a function to create a closure
			td.addEventListener(
				"click",
				(function (td) {
					return function (e) {
						showQuestion(e, td);
					};
				})(td)
			);
			tr.append(td);
		}
		table.append(tr);
	}
	const myCloseBtn = document.getElementById("close-question-modal");
	myCloseBtn.addEventListener("click", (e) => hideQuestion(e));

	// const myShowAnswerBtn = document.getElementById("reveal-answer");
	// myShowAnswerBtn.addEventListener("click", (e) => showAnswer(e));
}

const hideQuestion = (e) => {
	const modalContainer = document.getElementById("modal-container");
	modalContainer.classList.remove("show");
	const myAnswer = document.getElementById("answer");
	myAnswer.classList.add("hidden");
	global_q_points = 100;
	//console.log(global_q_points);
};

const showQuestion = (e, td) => {
	//alert(e.target.getAttribute("data-question"));
	//console.log(e.target.getAttribute("data-answer"));

	const myQPoints = td.getAttribute("data-points");
	global_q_points = myQPoints;
	//console.log(global_q_points);

	const modalContainer = document.getElementById("modal-container");
	modalContainer.classList.add("show");
	const question = document.getElementById("question");
	//question.innerText = e.target.getAttribute("data-question");
	question.innerText = td.getAttribute("data-question");

	const answer = document.getElementById("answer");
	//answer.innerText = e.target.getAttribute("data-answer");
	answer.innerText = td.getAttribute("data-answer");

	const myShowAnswerBtn = document.getElementById("reveal-answer");
	// myShowAnswerBtn.addEventListener("click", () =>
	// 	showAnswer(e.target.getAttribute("data-answer"))
	// );
	myShowAnswerBtn.addEventListener(
		"click",
		(function (td) {
			return function (e) {
				showAnswer(e, td);
			};
		})(td)
	);
};

const showAnswer = (e, td) => {
	const myAnswer = document.getElementById("answer");
	myAnswer.classList.remove("hidden");
	td.classList.add("answerShown");
	//console.log(myAnswer.parentElement.parentElement);
};

function flattenMapToArray(myMap) {
	var myVals = myMap.values();
	var outputArr = [];
	while (true) {
		var row = myVals.next();
		if (row.done) break;
		outputArr.push(row.value);
	}
	return transposeMatrix(outputArr);
	//return outputArr;
}

function transposeMatrix(matrix) {
	//change an array of arrays from an n by m matrix to an m by n matrix

	// Get the number of rows and columns in the original matrix
	const numRows = matrix.length;
	const numCols = matrix[0].length;

	// Create a new matrix with dimensions swapped (m by n)
	const transposedMatrix = Array.from({ length: numCols }, () => []);

	// Iterate through the original matrix and transpose elements
	for (let i = 0; i < numRows; i++) {
		for (let j = 0; j < numCols; j++) {
			transposedMatrix[j][i] = matrix[i][j];
		}
	}
	return transposedMatrix;
}
