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
    document.getElementById('submit').addEventListener('click', checkAnswer);
    
    
  })
  .catch(error => {
    console.error("Failed to load vocabulary:", error);
  });

// Function to display the current Japanese word
function showWord() {
  if (vocabList.length > 0) {
    document.getElementById('question').innerText = vocabList[currentIndex].jp;
  }
}

// Function to check the answer
function checkAnswer() {
  const userAnswer = document.getElementById('answer').value.trim().toLowerCase();
  const correctAnswer = vocabList[currentIndex].en.trim().toLowerCase();

  const resultEl = document.getElementById('feedback');
  if (userAnswer === correctAnswer) {
    resultEl.innerText = "✅ Correct!";
    resultEl.style.color = "green";
  } else {
    resultEl.innerText = `❌ Incorrect. Correct answer: ${vocabList[currentIndex].en}`;
    resultEl.style.color = "red";
  }

  setTimeout(() => {
    document.getElementById('answer').value = "";
    resultEl.innerText = ""; // clear feedback
    currentIndex = (currentIndex + 1) % vocabList.length;
    showWord();
  }, 1000);
}

