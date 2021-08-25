import * as React from 'react';

import { Question } from 'models/Question';

import { api } from 'services/api';

type TriviaProviderProps = {
  children: React.ReactNode;
};

type TriviaContextData = {
  questionsQuantity: number;
  isFetchingQuestions: boolean;
  currentQuestions: Question[];
  updateQuestionsQuantity: (quantity: number) => void;
  playTrivia: () => void;
};

const TriviaContext = React.createContext({} as TriviaContextData);

export function TriviaProvider({ children }: TriviaProviderProps) {
  const [questionsQuantity, setQuestionsQuantity] = React.useState(0);
  const [isFetchingQuestions, setIsFetchingQuestions] = React.useState(false);
  const [currentQuestions, setCurrentQuestions] = React.useState<Question[]>(
    []
  );

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

  function playTrivia() {
    fetchQuestions();
  }

  return (
    <TriviaContext.Provider
      value={{
        questionsQuantity,
        isFetchingQuestions,
        currentQuestions,
        updateQuestionsQuantity,
        playTrivia,
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
