const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


const checkLength = (str, maxLength) => {
  return str.length < maxLength;
};
