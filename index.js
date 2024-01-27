const welcomeContainer = document.getElementById("welcomeContainer");
const questionContainer = document.getElementById("questionContainer");

const finishBtn = document.getElementById("finish");
const nextBtn = document.getElementById("next");

const questionLabel = document.getElementById("questionLabel");
const questionCountLabel = document.getElementById("questionCount");
const answersBtnContainer = document.getElementById("answersBtnContainer");

let data;
let answersArray;
let answersBtnArray = [];
let index;
let questionCount = 1;

async function start() {
  // data holds all the questions, answers, and correct answers
  data = await fetchJSON("./questions/questions_ru.json");

  await fadeOut(welcomeContainer, 1);

  pickQuestion();

  await fadeIn(questionContainer, 1);
}

function pickQuestion() {
  index = random(0, data.questions.length - 1);

  questionLabel.textContent = data.questions[index]["question"];

  answersArray = shuffle(data.questions[index]["answers"]);

  for (i = 0; i < answersArray.length; i++) {
    answersBtnArray[i] = document.createElement("button");
    answersBtnArray[i].type = "button";
    answersBtnArray[i].textContent = answersArray[i];
    answersBtnArray[i].classList.add("transparent");

    if (answersArray[i] === data.questions[index]["correctAnswer"]) {
      correctAnswerBtn = answersBtnArray[i];
    }

    fadeIn(answersBtnArray[i], 1, i + 1);

    answersBtnArray[i].onclick = function () {
      checkAnswer(this);
    };

    answersBtnContainer.appendChild(answersBtnArray[i]);
  }
}

// When user clicks on the answer button
function checkAnswer(button) {
  if (button === correctAnswerBtn) {
    answersBtnArray.forEach((element) => {
      switch (element) {
        case button:
          element.classList.add("correct");
          break;
        default:
          element.classList.add("dismiss");
          break;
      }
    });
  } else {
    answersBtnArray.forEach((element) => {
      switch (element) {
        case button:
          element.classList.add("incorrect");
          break;
        case correctAnswerBtn:
          element.classList.add("correct");
          break;
        default:
          element.classList.add("dismiss");
          break;
      }
    });
  }

  delete data.questions.splice(index, 1);

  console.log(data.questions.length);

  if (data.questions.length === 0) {
    fadeIn(finishBtn, 1, 1);
  } else {
    fadeIn(nextBtn, 1, 1);
  }
}

// When user clicks on the next button
async function nextQuestion() {
  await fadeOut(questionContainer, 1, 0);

  nextBtn.classList.add("transparent", "block");

  questionCount += 1
  questionCountLabel.textContent = `Вопрос ${questionCount}`

  console.log(answersBtnArray);

  answersBtnArray.forEach((element) => {
    element.remove();
  });
  answersBtnArray = [];

  pickQuestion();
  await fadeIn(questionContainer, 1);
}

async function finish() {
  await fadeOut(questionContainer, 1, 0);

  questionCount = 1;
  questionCountLabel.textContent = `Вопрос ${questionCount}`

  answersBtnArray.forEach((element) => {
    element.remove();
  });
  answersBtnArray = [];

  await fadeIn(welcomeContainer, 1, 0);

  finishBtn.classList.add("transparent", "block")
}

async function fetchJSON(pathToFile) {
  try {
    const res = await fetch(pathToFile);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    return console.error("Unable to fetch data:", error);
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(array) {
  let unorderedArray = [];

  for (let i = array.length - 1; i >= 0; i--) {
    let randomIndex = Math.floor(Math.random() * (i + 1));
    let selectedItem = array.splice(randomIndex, 1)[0];
    unorderedArray.push(selectedItem);
  }

  return unorderedArray;
}

// Hides the element with CSS animation
// The time variable is useless because the animation is always 1 second
async function fadeOut(element, time, delay = 0) {
  await sleep(delay * 1000);
  element.classList.add("block", "fadeOut", "transparent");
  await sleep(time * 1000);
  element.classList.remove("fadeOut");
}

// Shows the element with CSS animation
// The time variable is useless because the animation is always 1 second
async function fadeIn(element, time, delay = 0) {
  await sleep(delay * 1000);
  element.classList.add("fadeIn");
  element.classList.remove("transparent", "block");
  await sleep(time * 1000);
  element.classList.remove("fadeIn");
}

















































