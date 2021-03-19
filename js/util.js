const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const swap = (items, i, j) => {
  const temp = items[i];
  items[i] = items[j];
  items[j] = temp;
};

const getRandomItems = (items, count) => {
  for (let i = 0; i < count; i++) {
    const j = random(i, items.length - 1);
    swap(items, i, j);
  }

  return items.slice(0, count);
};

const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

const isEnterEvent = (evt) => {
  return evt.key === 'Enter';
};

export {random, swap, getRandomItems, isEscEvent, isEnterEvent};
