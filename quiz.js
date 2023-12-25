export function printQuiz() {
	var questionsForCE = [
		{ question: "Question A", answer: "this is an answer" },
		{ question: "Question B", answer: "this is an answer" },
		{ question: "Question C", answer: "this is an answer" },
		{ question: "Question D", answer: "this is an answer" },
	];
	var questionsForHistory = [
		{ question: "Question A", answer: "this is an answer" },
		{ question: "Question B", answer: "this is an answer" },
		{ question: "Question C", answer: "this is an answer" },
		{ question: "Question D", answer: "this is an answer" },
	];
	var questionsForScience = [
		{ question: "Question A", answer: "this is an answer" },
		{ question: "Question B", answer: "this is an answer" },
		{ question: "Question C", answer: "this is an answer" },
		{ question: "Question D", answer: "this is an answer" },
	];
	var questionsForGK = [
		{ question: "Question A", answer: "this is an answer" },
		{ question: "Question B", answer: "this is an answer" },
		{ question: "Question C", answer: "this is an answer" },
		{ question: "Question D", answer: "this is an answer" },
	];

	var arrayOfQuestions = [];
	//console.log(questionsForCE);
	arrayOfQuestions.push(questionsForCE);
	arrayOfQuestions.push(questionsForHistory);
	arrayOfQuestions.push(questionsForScience);
	arrayOfQuestions.push(questionsForGK);
	//console.log(arrayOfQuestions);

	var categories = [
		"Current Events",
		"History",
		"Science",
		"General Knowledge",
	];

	var quizMap = new Map();

	for (let i = 0; i < categories.length; i++) {
		// console.log(categories[i]);
		// console.log(arrayOfQuestions[i]);
		quizMap.set(categories[i], arrayOfQuestions[i]);
	}

	console.log("my quiz: \n");
	console.log(quizMap);
}
