let vocabList = [];     // To store the vocabulary from JSON
let currentIndex = 0;   // To track which word we’re on

// Step 1: Fetch the vocab JSON file
fetch('data/vocab.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    vocabList = data;
    console.log("Vocabulary loaded:", vocabList);

    // (Optional) Show the first word to confirm it's working
    document.getElementById('wordDisplay').innerText = vocabList[currentIndex].jp;
  })
  .catch(error => {
    console.error("Failed to load vocabulary:", error);
  });
