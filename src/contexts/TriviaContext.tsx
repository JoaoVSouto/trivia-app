import * as React from 'react';
import { useRouter } from 'next/router';

import { Question } from 'models/Question';

import { api } from 'services/api';

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
  updateQuestionsQuantity: (quantity: number) => void;
  playTrivia: () => void;
  moveToNextPage: () => void;
  addCorrectQuestion: () => void;
  addWrongQuestion: () => void;
};

const TriviaContext = React.createContext({} as TriviaContextData);

export function TriviaProvider({ children }: TriviaProviderProps) {
  const router = useRouter();

  const [questionsQuantity, setQuestionsQuantity] = React.useState(0);
  const [isFetchingQuestions, setIsFetchingQuestions] = React.useState(false);
  const [currentQuestions, setCurrentQuestions] = React.useState<Question[]>(
    []
  );
  const [correctQuestions, setCorrectQuestions] = React.useState<number[]>([]);
  const [wrongQuestions, setWrongQuestions] = React.useState<number[]>([]);
  const [currentPage, setCurrentPage] = React.useState(0);

  function updateQuestionsQuantity(newQuestionsQuantity: number) {
    setQuestionsQuantity(newQuestionsQuantity);
  }

  async function fetchQuestions() {
    setIsFetchingQuestions(true);

    try {
      const response = await api.get('', {
        params: {
          amount: questionsQuantity,
        },
      });

      setCurrentQuestions(response.data.results);
    } finally {
      setIsFetchingQuestions(false);
    }
  }

  async function playTrivia() {
    await fetchQuestions();
    router.push('/trivia');
  }

  function moveToNextPage() {
    setCurrentPage(state => state + 1);
  }

  function addCorrectQuestion() {
    setCorrectQuestions(state => [...state, currentPage]);
  }

  function addWrongQuestion() {
    setWrongQuestions(state => [...state, currentPage]);
  }

  return (
    <TriviaContext.Provider
      value={{
        questionsQuantity,
        isFetchingQuestions,
        currentQuestions,
        currentPage,
        correctQuestions,
        wrongQuestions,
        updateQuestionsQuantity,
        playTrivia,
        moveToNextPage,
        addCorrectQuestion,
        addWrongQuestion,
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
