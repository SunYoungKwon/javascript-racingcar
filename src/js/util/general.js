export const getRandomNumber = ({ min, max }) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const isEmptyString = (input) => typeof input === 'string' && !input.trim();

export const isNaturalNumber = (input) => Number.isInteger(input) && input > 0;
