//index.js
import "../lib/mathUtils.js";

const QuestionRegistry = (() => {
  const questions = {}; // 문제 유형 저장 (전역 변수 X)
  
  return {
    register: ({ name, type, generator }) => {
      console.log(name, type, generator);
      if (!name || !type || typeof generator !== "function") {
        throw new Error("Invalid question type registration");
      }
      questions[type] = { name, generator };
    },

    getQuestionTypes: () => Object.keys(questions).map(type => ({
      type,
      name: questions[type].name
    })),
    
    getGenerator: (type) => {
      if (!questions[type]) throw new Error(`Unknown question type: ${type}`);
      return questions[type].generator;
    }
  };
})();

export default QuestionRegistry;


export const loadAllProblems = async () => {
  const problemFiles = [
    "multiplication.js"
  ];

  await Promise.all(problemFiles.map(file => import(`./${file}`)))
    .then(() => console.log("All custom problems loaded"))
    .catch(err => console.error("Failed to load problems", err));
};
