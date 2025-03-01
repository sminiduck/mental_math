//indexQ.js
import "../lib/mathUtils.js";

class QuestionRegistry {
  static #instance;
  #questions = {};
  constructor() {
    if (QuestionRegistry.#instance) {
      return QuestionRegistry.#instance;
    }
    QuestionRegistry.#instance = this;
  }

  register({ name, type, generator }) {
    if (!name || !type || typeof generator !== "function") {
      throw new Error("Invalid question type registration");
    }
    this.#questions[type] = { name, generator };
  }

  get questionTypes() {
    return Object.keys(this.#questions).map(type => ({
      type,
      name: this.#questions[type].name
    }));
  }

  getGenerator(type) {
    if (!this.#questions[type]) throw new Error(`Unknown question type: ${type}`);
    return this.#questions[type].generator;
  }

  async loadAllProblems() {
    const problemFiles = ["basic.js"];
    await Promise.all(problemFiles.map(file => import(`./${file}`)));
    console.log("✅ All custom problems loaded");
  }
}

// 🔹 싱글톤 인스턴스를 export
export default new QuestionRegistry;