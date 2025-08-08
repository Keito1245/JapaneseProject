let vocabList = [];
let currentIndex = 0;

// Load vocabulary
fetch('data/vocab.json')
  .then(response => {
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  })
  .then(data => {
    vocabList = data;
    console.log("Vocabulary loaded:", vocabList);

    // Show first word
    showWord();

    // Set up event listener for check button
    document.getElementById('checkBtn').addEventListener('click', checkAnswer);
  })
  .catch(error => {
    console.error("Failed to load vocabulary:", error);
  });

// Function to display the current Japanese word
function showWord() {
  if (vocabList.length > 0) {
    document.getElementById('wordDisplay').innerText = vocabList[currentIndex].jp;
  }
}

// Function to check the answer
function checkAnswer() {
  const userAnswer = document.getElementById('answerInput').value.trim().toLowerCase();
  const correctAnswer = vocabList[currentIndex].en.trim().toLowerCase();

  const resultEl = document.getElementById('result');
  if (userAnswer === correctAnswer) {
    resultEl.innerText = "✅ Correct!";
    resultEl.style.color = "green";
  } else {
    resultEl.innerText = `❌ Incorrect. Correct answer: ${vocabList[currentIndex].en}`;
    resultEl.style.color = "red";
  }

  // Clear input for next attempt
  document.getElementById('answerInput').value = "";
}

