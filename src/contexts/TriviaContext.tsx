import * as React from 'react';
import { useRouter } from 'next/router';
import { useLocalStorage } from 'react-use';

import { shuffle } from 'utils/shuffle';

import { Question } from 'models/Question';

import { api } from 'services/api';

type PlayedAlternative = {
  correct: boolean;
  marked: boolean;
  sentence: string;
};

type PlayedQuestion = {
  correct: boolean;
  sentence: string;
  alternatives: PlayedAlternative[];
};

type PlayedTrivia = {
  id: number;
  correctAmount: number;
  wrongAmount: number;
  questions: PlayedQuestion[];
};

type TriviaProviderProps = {
  children: React.ReactNode;
};

type TriviaContextData = {
  questionsQuantity: number;
  isFetchingQuestions: boolean;
  currentQuestions: Question[];
  currentPage: number;
  correctQuestions: number[];
  wrongQuestions: number[];
  playedTrivias: PlayedTrivia[];
  updateQuestionsQuantity: (quantity: number) => void;
  resetQuestionsCorrectness: () => void;
  resetCurrentPage: () => void;
  resetQuestionsAnswers: () => void;
  playTrivia: () => void;
  moveToNextPage: () => void;
  markAnswer: (answerSentence: string) => void;
  addCorrectQuestion: () => void;
  addWrongQuestion: () => void;
  addNewPlayedTrivia: () => void;
};

const TriviaContext = React.createContext({} as TriviaContextData);

export function TriviaProvider({ children }: TriviaProviderProps) {
  const router = useRouter();

  const [questionsQuantity, setQuestionsQuantity] = React.useState(0);
  const [isFetchingQuestions, setIsFetchingQuestions] = React.useState(false);
  const [playedTrivias, setPlayedTrivias] = useLocalStorage<PlayedTrivia[]>(
    '@trivia:played-trivias',
    []
  );
  const [currentQuestions, setCurrentQuestions] = React.useState<Question[]>(
    []
  );
  const [correctQuestions, setCorrectQuestions] = React.useState<number[]>([]);
  const [wrongQuestions, setWrongQuestions] = React.useState<number[]>([]);
  const [currentPage, setCurrentPage] = React.useState(0);

  function updateQuestionsQuantity(newQuestionsQuantity: number) {
    setQuestionsQuantity(newQuestionsQuantity);
  }

  function resetQuestionsCorrectness() {
    setCorrectQuestions([]);
    setWrongQuestions([]);
  }

  function resetCurrentPage() {
    setCurrentPage(0);
  }

  function resetQuestionsAnswers() {
    setCurrentQuestions(state =>
      state.map(question => ({
        ...question,
        alternatives: question.alternatives.map(alternative => ({
          ...alternative,
          marked: false,
        })),
      }))
    );
  }

  async function fetchQuestions() {
    setIsFetchingQuestions(true);

    try {
      const response = await api.get('', {
        params: {
          amount: questionsQuantity,
        },
      });

      setCurrentQuestions(
        response.data.results.map(
          (question: Omit<Question, 'alternatives'>) => ({
            ...question,
            alternatives: shuffle([
              {
                sentence: question.correct_answer,
                correct: true,
                marked: false,
              },
              ...question.incorrect_answers.map(answer => ({
                sentence: answer,
                correct: false,
                marked: false,
              })),
            ]),
          })
        )
      );
    } finally {
      setIsFetchingQuestions(false);
    }
  }

  async function playTrivia() {
    await fetchQuestions();
    resetQuestionsCorrectness();
    router.push('/trivia');
  }

  function moveToNextPage() {
    setCurrentPage(state => state + 1);
  }

  function markAnswer(answerSentence: string) {
    setCurrentQuestions(state =>
      state.map((question, index) => ({
        ...question,
        alternatives:
          index === currentPage
            ? question.alternatives.map(alternative => ({
                ...alternative,
                marked: alternative.sentence === answerSentence,
              }))
            : question.alternatives,
      }))
    );
  }

  function addCorrectQuestion() {
    setCorrectQuestions(state => [...state, currentPage]);
  }

  function addWrongQuestion() {
    setWrongQuestions(state => [...state, currentPage]);
  }

  function resetState() {
    setQuestionsQuantity(0);
    setCurrentPage(0);
    setCurrentQuestions([]);
    setCorrectQuestions([]);
    setWrongQuestions([]);
  }

  function addNewPlayedTrivia() {
    const playedTrivia: PlayedTrivia = {
      id: playedTrivias.length + 1,
      correctAmount: correctQuestions.length,
      wrongAmount: wrongQuestions.length,
      questions: currentQuestions.map((question, index) => ({
        correct: correctQuestions.includes(index),
        sentence: question.question,
        alternatives: question.alternatives,
      })),
    };

    setPlayedTrivias(state => [...state, playedTrivia]);

    resetState();
  }

  return (
    <TriviaContext.Provider
      value={{
        questionsQuantity,
        resetQuestionsCorrectness,
        resetCurrentPage,
        resetQuestionsAnswers,
        isFetchingQuestions,
        currentQuestions,
        currentPage,
        correctQuestions,
        wrongQuestions,
        playedTrivias,
        updateQuestionsQuantity,
        playTrivia,
        moveToNextPage,
        markAnswer,
        addCorrectQuestion,
        addWrongQuestion,
        addNewPlayedTrivia,
      }}
    >
      {children}
    </TriviaContext.Provider>
  );
}

export function useTrivia() {
  const context = React.useContext(TriviaContext);

  if (!context) {
    throw new Error('useTrivia must be used within a TriviaProvider');
  }

  return context;
}
