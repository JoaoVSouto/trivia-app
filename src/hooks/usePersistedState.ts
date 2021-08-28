import React, { useState, useEffect } from 'react';

type ReturnState<T> = [T, React.Dispatch<React.SetStateAction<T>>];

export function usePersistedState<T>(
  key: string,
  initialState: T
): ReturnState<T> {
  const [state, setState] = useState<T>(() => {
    const persistedState = process.browser ? localStorage.getItem(key) : null;

    return persistedState ? JSON.parse(persistedState) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, setState];
}
