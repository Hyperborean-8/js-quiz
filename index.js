// Константы
const welcomeContainer = document.getElementById("welcomeContainer");
const questionContainer = document.getElementById("questionContainer");

const questionLabel = document.getElementById("questionLabel");
const answersBtnContainer = document.getElementById("answersBtnContainer");

// Переменные
let jsonLength = null;
let data = null;
let index = 0;
let answerBtnArray = [];

// Переменная пуска, запускается кнопками сложности
async function start(difficulty) {
  // Поимка данных из JSON
  data = await fetchJSON();

  // prettier-ignore
  console.log(`JSON file contains ${data.questions.length} amount of questions.`);

  // Выбор случайного вопроса
  index = Math.floor(Math.random() * data.questions.length);

  // prettier-ignore
  console.log(`Random selected the index ${index} from the maximum index ${data.questions.length-1}.`);

  console.log(`Current question: ${data.questions[index]["question"]}`);
  console.log(`Current answers: ${data.questions[index]["answers"]}`);
  console.log(`Correct answer: ${data.questions[index]["correctAnswer"]}`);

  await fadeOut(welcomeContainer, 1);

  console.log("WelcomeContainer fade out is completed.");

  questionLabel.textContent = data.questions[index]["question"];

  // Создание кнопок с ответами
  for (i = 0; i < data.questions[index]["answers"].length; i++) {
    answerBtnArray[i] = document.createElement("button");
    answerBtnArray[i].type = "button";

    console.log(data.questions[index].answers[i]);

    answerBtnArray[i].innerHTML = data.questions[index].answers[i];

    answerBtnArray[i].classList.add("transparent");

    fadeIn(answerBtnArray[i], 1, i + 1);

    // button.onclick = function () {
    //   // Your code here
    // };

    answersBtnContainer.appendChild(answerBtnArray[i]);
  }

  await fadeIn(questionContainer, 1);
}

async function fadeOut(element, time, delay = 0) {
  element.classList.add("block");
  element.classList.add("fadeOut");
  element.classList.add("transparent");
  await sleep(time * 1000);
  element.classList.remove("fadeOut");
}

async function fadeIn(element, time, delay = 0) {
  await sleep(delay * 1000);
  element.classList.add("fadeIn");
  element.classList.remove("transparent");
  element.classList.remove("block");
  await sleep(time * 1000);
  element.classList.remove("fadeIn");
}

// Ловит всю информацию из JSON файла
async function fetchJSON() {
  try {
    const res = await fetch("./questions/questions_ru.json");
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
