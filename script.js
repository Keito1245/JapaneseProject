let vocabList = [];
let currentIndex = 0;

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
    vocabList = data;
    console.log("Vocabulary loaded:", vocabList);
    showWord();
  })
  .catch(error => {
    console.error("Failed to load vocabulary:", error);
  });
  nextBtn.style.display = 'none'; // Hide the next button at the start

// --- Display the current Japanese word ---
function showWord() {
  if (vocabList.length > 0) {
    questionEl.innerText = vocabList[currentIndex].jp;
  }
}

// --- Check the user's answer ---
function checkAnswer() {
  const userAnswer = answerInput.value.trim().toLowerCase();
  const correctAnswer = vocabList[currentIndex].en.trim().toLowerCase();

  if (userAnswer === correctAnswer) {
    feedback.innerText = "✅ Correct!";
    feedback.style.color = "green";
  } else {
    feedback.innerText = `❌ Incorrect. Correct answer: ${vocabList[currentIndex].en}`;
    feedback.style.color = "red";
  }

  // Show "Next" button immediately after checking
  nextBtn.style.display = 'inline-block';
}

// --- Move to the next question ---
function nextQuestion() {
  currentIndex = (currentIndex + 1) % vocabList.length;
  feedback.innerText = "";
  answerInput.value = "";
  showWord();
  nextBtn.style.display = 'none';
  answerInput.focus();
}

// --- Event listeners ---
submitBtn.addEventListener('click', checkAnswer);
nextBtn.addEventListener('click', nextQuestion);

answerInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    if(nextBtn.style.display == 'none'){
        checkAnswer();
    }else{
        nextQuestion();
    }
  }
});
