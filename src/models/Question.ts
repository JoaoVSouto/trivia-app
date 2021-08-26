export type Alternative = {
  sentence: string;
  correct: boolean;
  marked: boolean;
};

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
  alternatives: Alternative[];
};
