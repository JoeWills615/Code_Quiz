const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const scoreButton = document.getElementById("score-btn");
const timerButton = document.getElementById("timer-btn");
const scoreCounter = document.getElementById("score-counter");
const timerClock = document.getElementById("timer-clock");
const questions = [
  {
    question: "An if/else statement is enclosed with...",
    answers: [
      { text: "quotes", correct: false },
      { text: "paranthese", correct: true },
      { text: "curly brackets", correct: false },
      { text: "square brackets", correct: false },
    ],
  },
  {
    question:
      "A useful tool used to check your coding during development and debugging for printing content to the debugger is...",
    answers: [
      { text: "javascript", correct: false },
      { text: "terminal/bash", correct: false },
      { text: "prayer", correct: false },
      { text: "console.log", correct: true },
    ],
  },
  {
    question:
      "This is the term for having your site be adaptive to many different types of screens...",
    answers: [
      { text: "java", correct: false },
      { text: "responsive", correct: true },
      { text: "flexible", correct: false },
      { text: "magic", correct: false },
    ],
  },
  {
    question: "What does HTML mean?",
    answers: [
      { text: "hypertext markup language", correct: true },
      { text: "hybridtext markup language", correct: false },
      { text: "hypertext making language", correct: false },
      { text: "hot tamales...mmm, lunch", correct: false },
    ],
  },
  {
    question: "Commonly used data types DO NOT include...",
    answers: [
      { text: "strings", correct: false },
      { text: "booleans", correct: false },
      { text: "alerts", correct: true },
      { text: "numbers", correct: false },
    ],
  },
];

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  scoreCounter.textContent = 0;
  timerClock.textContent = 60;
  
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
    scoreCounter.textContent ++ 
  } else {
    element.classList.add("wrong");
   }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}