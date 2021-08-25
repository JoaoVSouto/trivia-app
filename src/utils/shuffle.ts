export function shuffle<T>(array: T[]) {
  const arrayCopy = [...array];

  arrayCopy.sort(() => Math.random() - 0.5);

  return arrayCopy;
}
