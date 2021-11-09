import countries from "./countries.js";

const hardCodedQuestions = {
  1: {
    alternatives: {
      1: "swe",
      2: "fra",
      3: "dnk",
      4: "bra",
    },
    correct: "swe",
  },
  2: {
    alternatives: {
      1: "blz",
      2: "fra",
      3: "cub",
      4: "cog",
    },
    correct: "fra",
  },
};

//import and randomize 5 questions as an object from countries.js everytime a new game is started
const getQuestions = () => {
  const questions = {};
  const keys = Object.keys(countries);
  const randomKeys = keys.sort(() => 0.5 - Math.random());
  for (let i = 0; i < 1; i++) {
    questions[i + 1] = {
		
      alternatives: {
        1: randomKeys[i].toLowerCase(),
        2: randomKeys[i + 1].toLowerCase(),
        3: randomKeys[i + 2].toLowerCase(),
        4: randomKeys[i + 3].toLowerCase(),
      },
      correct: randomKeys[i + 3].toLowerCase(),
	  
    };
	
  }
  
  return questions;
};
getQuestions()












export const createGame = () => {

	const ffImprovedQuestions = JSON.parse(localStorage.getItem("featureFlags"))[3]["active"] === true

 
	const generatedQuestions = ffImprovedQuestions ? getQuestions() : hardCodedQuestions
  	return {
    currentQuestion: 1,
    questions: generatedQuestions,
    score: { player1: 0, player2: 0 },
    status: "starting",
  };
};

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
