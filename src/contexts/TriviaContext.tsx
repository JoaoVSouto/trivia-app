import * as React from 'react';

type TriviaProviderProps = {
  children: React.ReactNode;
};

type TriviaContextData = {
  questionsQuantity: number;
  updateQuestionsQuantity: (quantity: number) => void;
};

const TriviaContext = React.createContext({} as TriviaContextData);

export function TriviaProvider({ children }: TriviaProviderProps) {
  const [questionsQuantity, setQuestionsQuantity] = React.useState(0);

  function updateQuestionsQuantity(newQuestionsQuantity: number) {
    setQuestionsQuantity(newQuestionsQuantity);
  }

  return (
    <TriviaContext.Provider
      value={{ questionsQuantity, updateQuestionsQuantity }}
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
