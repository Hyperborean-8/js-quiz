const welcomeContainer = document.getElementById("welcomeContainer");
const questionContainer = document.getElementById("questionContainer");

const questionLabel = document.getElementById("questionLabel");
const answersBtnContainer = document.getElementById("answersBtnContainer");

let data;
let answersArray;
let answersBtnArray = [];

// Запуск
async function start() {
  data = await fetchJSON("./questions/questions_ru.json");

  await fadeOut(welcomeContainer, 1);

  pickQuestion();

  await fadeIn(questionContainer, 1);
}

function pickQuestion() {
  let index = random(0, data.questions.length - 1);

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
      checkAnswer(this.textContent, this);
    };

    answersBtnContainer.appendChild(answersBtnArray[i]);
  }
}

// При нажатии на кнопку с ответом
function checkAnswer(answer, button) {
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
}

// Ловит всю информацию из JSON файла
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

// Функция сна
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Функция рандома
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция перемешки массива
function shuffle(array) {
  let unorderedArray = [];

  for (let i = array.length - 1; i >= 0; i--) {
    let randomIndex = Math.floor(Math.random() * (i + 1));
    let selectedItem = array.splice(randomIndex, 1)[0];
    unorderedArray.push(selectedItem);
  }

  return unorderedArray;
}

// Скрыть элемент
async function fadeOut(element, time, delay = 0) {
  await sleep(delay * 1000);
  element.classList.add("block", "fadeOut", "transparent");
  await sleep(time * 1000);
  element.classList.remove("fadeOut");
}

// Показать элемент
async function fadeIn(element, time, delay = 0) {
  await sleep(delay * 1000);
  element.classList.add("fadeIn");
  element.classList.remove("transparent", "block");
  await sleep(time * 1000);
  element.classList.remove("fadeIn");
}
