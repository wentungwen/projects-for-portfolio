const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgain = document.getElementById("play-button");
const notification = document.getElementById("notification-container");
const popup = document.getElementById("popup-container");
const finalMsg = document.getElementById("final-message");
const figures = document.querySelectorAll(".figure-part");

const words = ["apple", "banana", "orange"];
let selectedWord = words[Math.floor(Math.random() * words.length)];

let correctLetters = [];
let wrongLetters = [];

function displayVoc() {
  wordEl.innerHTML = `
  ${selectedWord
    .split("")
    .map(
      (letter) =>
        `<div class="letter"> 

        ${correctLetters.includes(letter) ? letter : " "}
        </div>`
    )
    .join("")}
  `;
  const innerWord = wordEl.innerText.replace(/\n/g, "");
  if (innerWord === selectedWord) {
    finalMsg.innerText = "congratulation";
    popup.style.display = "flex";
  }
}

function showNotification() {
  notification.style.display = "initial";
  setTimeout(() => {
    notification.style.display = "none";
  }, 3000);
}

function updateWrongLetter() {
  wrongLettersEl.innerHTML = `<p>Wrong</p>
        <span>${wrongLetters}</span>`;

  figures.forEach((part, idx) => {
    const errors = wrongLetters.length;
    if (idx < errors) {
      part.style.display = "initial";
    } else {
      part.style.display = "none";
    }
  });

  // check if lost
  if (wrongLetters.length == figures.length) {
    console.log(123);
    finalMsg.innerText = "You lose...";
    popup.style.display = "flex";
  }
}

window.addEventListener("keydown", (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayVoc();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLetter();
      } else {
        showNotification();
      }
    }
  }
});

playAgain.addEventListener("click", () => {
  location.reload();
});

displayVoc();
