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
async function start() {
  // Поимка данных из JSON
  data = await fetchJSON();

  // prettier-ignore
  console.log(`JSON file contains ${data.questions.length} amount of questions.`);

  // Выбор случайного вопроса
  index = random(0, data.questions.length - 1)

  // prettier-ignore
  console.log(`Random selected the index ${index} from the maximum index ${data.questions.length-1}.`);

  console.debug(`Current question: ${data.questions[index]["question"]}`);
  console.debug(`Current answers: ${data.questions[index]["answers"]}`);
  console.debug(`Correct answer: ${data.questions[index]["correctAnswer"]}`);

  await fadeOut(welcomeContainer, 1);

  console.log("WelcomeContainer fade out is completed.");

  questionLabel.textContent = data.questions[index]["question"];

  // Перемешанный массив со списком ответов
  let answersArray = shuffle(data.questions[index].answers)

  // Создание кнопок с ответами
  for (i = 0; i < answersArray.length; i++) {
    answerBtnArray[i] = document.createElement("button");
    answerBtnArray[i].type = "button";

    answerBtnArray[i].innerHTML = answersArray[i];

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
  await sleep(delay * 1000);
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

// Функция сна, используется с await (ожидание ответа) 
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Функция рандома
function random(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция перемешки массива
function shuffle(array) {
  let unorderedArray = [];
   
  for(let i = array.length - 1; i >= 0; i--) {
     let randomIndex = Math.floor(Math.random() * (i + 1));
     let selectedItem = array.splice(randomIndex, 1)[0];
     unorderedArray.push(selectedItem);
  }
 
  return unorderedArray;
 }