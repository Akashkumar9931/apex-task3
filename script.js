// Quiz Data
const quizData = [
  {
    question: "What does HTML stand for?",
    answers: [
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
      "Hyperlinks and Text Markup Language",
      "High-level Text Management Language"
    ],
    correct: "Hyper Text Markup Language"
  },
  {
    question: "Which language runs in the browser?",
    answers: ["C++", "Python", "Java", "JavaScript"],
    correct: "JavaScript"
  },
  {
    question: "What does CSS stand for?",
    answers: [
      "Creative Style Sheets",
      "Cascading Style Sheets",
      "Colorful Style Syntax",
      "Computer Style System"
    ],
    correct: "Cascading Style Sheets"
  }
];

// Quiz Logic
let currentIndex = 0;
let score = 0;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const scoreEl = document.getElementById("score");

function showQuestion() {
  const current = quizData[currentIndex];
  questionEl.textContent = current.question;
  answersEl.innerHTML = "";

  current.answers.forEach((answer) => {
    const btn = document.createElement("button");
    btn.classList.add("answer-btn");
    btn.textContent = answer;
    btn.onclick = () => checkAnswer(answer);
    answersEl.appendChild(btn);
  });

  nextBtn.style.display = "none";
  scoreEl.textContent = "";
}

function checkAnswer(selected) {
  const correct = quizData[currentIndex].correct;
  const buttons = document.querySelectorAll(".answer-btn");

  buttons.forEach((btn) => {
    btn.disabled = true;
    if (btn.textContent === correct) {
      btn.style.backgroundColor = "#c3fcb3";
    } else if (btn.textContent === selected) {
      btn.style.backgroundColor = "#f8d7da";
    }
  });

  if (selected === correct) {
    score++;
  }

  nextBtn.style.display = "inline-block";
}

nextBtn.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex < quizData.length) {
    showQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  questionEl.textContent = "Quiz Completed!";
  answersEl.innerHTML = "";
  nextBtn.style.display = "none";
  scoreEl.textContent = `Your Score: ${score} / ${quizData.length}`;
}

showQuestion();


// Joke API
const jokeBtn = document.getElementById("joke-btn");
const jokeSetup = document.getElementById("joke-setup");
const jokePunchline = document.getElementById("joke-punchline");

jokeBtn.addEventListener("click", async () => {
  jokeSetup.textContent = "Loading joke...";
  jokePunchline.textContent = "";

  try {
    const res = await fetch("https://official-joke-api.appspot.com/random_joke");
    const data = await res.json();
    jokeSetup.textContent = data.setup;
    jokePunchline.textContent = data.punchline;
  } catch (error) {
    jokeSetup.textContent = "Failed to load joke.";
    jokePunchline.textContent = "";
  }
});
