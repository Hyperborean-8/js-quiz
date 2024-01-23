const welcomeContainer = document.getElementById("welcomeContainer");

let jsonLength = null;
let data = null;
let random = 0;

async function start(difficulty) {
  data = await fetchJSON();

  console.log("JSON file contains " + data.questions.length + " amount of questions.");

  random = Math.floor(Math.random() * data.questions.length)

  console.log(`Random selected the index ${random} from the maximum index ${data.questions.length-1}.`);

  console.log(`Current question: ${data.questions[random]["question"]}`);
  console.log(`Current answers: ${data.questions[random]["answers"]}`);
  console.log(`Correct answer: ${data.questions[random]["correctAnswer"]}`);

  

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

// function fetchRandomQuestion() {
//   Math.floor(Math.random() * 10);

//   fetch("./questions/questions_ru.json")
//     .then((res) => {
//       if (!res.ok) {
//         throw new Error(`HTTP error! Status: ${res.status}`);
//       }
//       return res.json();
//     })
//     .then((data) => {
//       jsonLength = data.questions.length;
//       console.log("JSON file contains " + jsonLength + " amount of questions.");
//     })
//     .catch((error) => console.error("Unable to fetch data:", error));
// }

function fetchRandomQuestion() {}
