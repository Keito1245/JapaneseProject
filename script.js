let vocab = {};          // full vocab loaded from JSON
let currentGrade = "grade1";
let words = [];
let currentWordIndex = 0;
let currentWord = null;

const nextBtn = document.getElementById('nextBtn');
const answerInput = document.getElementById('answer');
const submitBtn = document.getElementById('submit');
const feedback = document.getElementById('feedback');
const questionEl = document.getElementById('question');

// --- Load vocabulary from JSON ---
fetch('data/vocab.json')
  .then(response => {
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  })
  .then(data => {
    vocab = data;
    loadGrade(); // load first grade by default
  })
  .catch(error => {
    console.error("Failed to load vocabulary:", error);
  });

nextBtn.style.display = 'none'; // Hide the next button at the start

// --- Load selected grade ---
function loadGrade() {
  currentGrade = document.getElementById("gradeSelect").value;
  words = vocab[currentGrade]; // array of objects {jp, en}
  currentWordIndex = 0;
  nextWord();
}

// --- Show current Japanese word ---
function showWord() {
  if (words.length > 0) {
    questionEl.innerText = words[currentWordIndex].jp;
  } else {
    questionEl.innerText = "No words available.";
  }
}

// --- Check user's answer ---
function checkAnswer() {
  let userAnswer = answerInput.value.trim();
  if (userAnswer === "") return;

  if (userAnswer.toLowerCase() === words[currentWordIndex].en.toLowerCase()) {
    feedback.textContent = "Correct!";
  } else {
    feedback.textContent = "Wrong! The correct answer is " + words[currentWordIndex].en;
  }

  answerInput.value = "";
  nextBtn.style.display = 'block'; // allow moving to next question
}

// --- Move to next question ---
function nextWord() {
  if (words.length === 0) {
    questionEl.textContent = "No words available.";
    return;
  }
  let randomIndex = Math.floor(Math.random() * words.length);
  currentWordIndex = randomIndex;
  showWord();
  nextBtn.style.display = 'none'; // reset button state
  feedback.textContent = "";
}

// --- Event listeners ---
submitBtn.addEventListener('click', checkAnswer);
nextBtn.addEventListener('click', nextWord);

answerInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    if (nextBtn.style.display === 'none') {
      checkAnswer();
    } else {
      nextWord();
    }
  }
});
