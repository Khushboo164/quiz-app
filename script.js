const originalQuestions = [
  {
    question: "What is the capital of France?",
    options: ["London", "Paris", "Berlin", "Madrid"],
    answer: "Paris"
  },
  {
    question: "Which language is used for web apps?",
    options: ["Python", "Java", "JavaScript", "C++"],
    answer: "JavaScript"
  },
  {
    question: "Who is the founder of Microsoft?",
    options: ["Steve Jobs", "Elon Musk", "Bill Gates", "Mark Zuckerberg"],
    answer: "Bill Gates"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Venus", "Mars", "Jupiter"],
    answer: "Mars"
  },
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "Hot Mail",
      "How To Make Landingpage",
      "Hyperlinks and Text Markup Language"
    ],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "Which company developed Java?",
    options: ["Microsoft", "Sun Microsystems", "Google", "Apple"],
    answer: "Sun Microsystems"
  },
  {
    question: "What does CSS stand for?",
    options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
    answer: "Cascading Style Sheets"
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    options: ["//", "/*", "#", "<!--"],
    answer: "//"
  }
];

let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let time = 10;
let timerInterval;
let globalTimer;
let globalTimeLimit = 300; // 5 minutes in seconds

const questionContainer = document.getElementById("question-container");
const answersContainer = document.getElementById("answers-container");
const timerDisplay = document.getElementById("timer");
const scoreDisplay = document.getElementById("score");
const nextBtn = document.getElementById("next-btn");

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function startQuiz() {
  questions = shuffleArray([...originalQuestions]); // Clone and shuffle
  currentQuestionIndex = 0;
  score = 0;
  scoreDisplay.textContent = `Score: ${score}`;
  nextBtn.textContent = "Next";
  nextBtn.style.display = "none";
  clearInterval(globalTimer);
  startGlobalTimer(); // start 5-minute timer
  showQuestion();
}

function startTimer() {
  time = 10;
  timerDisplay.textContent = `Time: ${time}`;
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    time--;
    timerDisplay.textContent = `Time: ${time}`;
    if (time <= 0) {
      clearInterval(timerInterval);
      showNextQuestion();
    }
  }, 1000);
}

function startGlobalTimer() {
  let globalTimePassed = 0;
  globalTimer = setInterval(() => {
    globalTimePassed++;
    if (globalTimePassed >= globalTimeLimit) {
      clearInterval(timerInterval);
      clearInterval(globalTimer);
      showTimeoutScreen();
    }
  }, 1000);
}

function showTimeoutScreen() {
  questionContainer.textContent = "⏰ Time's Up!";
  answersContainer.innerHTML = `You reached the 5-minute limit.<br><br>Your score: ${score}/${questions.length}`;
  nextBtn.textContent = "Restart Quiz";
  nextBtn.style.display = "block";
  nextBtn.onclick = startQuiz;
}

function showQuestion() {
  nextBtn.style.display = "none";
  const currentQuestion = questions[currentQuestionIndex];
  questionContainer.textContent = currentQuestion.question;
  answersContainer.innerHTML = "";
  currentQuestion.options.forEach(option => {
    const button = document.createElement("button");
    button.textContent = option;
    button.onclick = () => checkAnswer(option);
    answersContainer.appendChild(button);
  });
  startTimer();
}

function checkAnswer(selectedOption) {
  clearInterval(timerInterval);
  const correctAnswer = questions[currentQuestionIndex].answer;
  if (selectedOption === correctAnswer) {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
  }
  nextBtn.style.display = "block";
}

function showNextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  clearInterval(timerInterval);
  clearInterval(globalTimer);
  questionContainer.textContent = "✅ Quiz Complete!";
  answersContainer.innerHTML = `Your final score is <strong>${score}/${questions.length}</strong>`;
  nextBtn.textContent = "Restart Quiz";
  nextBtn.style.display = "block";
  nextBtn.onclick = startQuiz;
}

nextBtn.onclick = showNextQuestion;

startQuiz();