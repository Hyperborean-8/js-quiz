const welcomeContainer = document.getElementById("welcomeContainer");
const questionContainer = document.getElementById("questionContainer");

const questionLabel = null;
const questionBtnContainer = null;

let jsonLength = null;
let data = null;
let random = 0;

async function start(difficulty) {
  data = await fetchJSON();

  // prettier-ignore
  console.log(`JSON file contains ${data.questions.length} amount of questions.`);

  random = Math.floor(Math.random() * data.questions.length)

  // prettier-ignore
  console.log(`Random selected the index ${random} from the maximum index ${data.questions.length-1}.`);

  console.log(`Current question: ${data.questions[random]["question"]}`);
  console.log(`Current answers: ${data.questions[random]["answers"]}`);
  console.log(`Correct answer: ${data.questions[random]["correctAnswer"]}`);

  await fadeOut(welcomeContainer, 1)

  console.log("WelcomeContainer fade out is completed.");

  
}

function getQuestion(){
    
}

function setQuestion(question){
    
}

async function fadeOut(element, time){
    element.classList.add('block');
    element.classList.add("fadeOut");
    await sleep(time * 1000)
    element.classList.add("transparent")
}

async function fadeIn(element, time){
    element.classList.add("fadeIn");
    await sleep(time * 1000)
    element.classList.remove("transparent")
    element.classList.remove('block');
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
    return new Promise(resolve => setTimeout(resolve, ms));
}