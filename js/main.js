const PICTURE_COUNT = 25;
const MAX_COMMENTS = 10;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const AVATAR_COUNT = 6;
const NAMES = ['Никита', 'Андрей', 'Константин', 'Павел', 'Алина', 'Ксюша'];
const SENTENSES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generatePictures = (count) => {
  const pictures = [];
  for (let i = 0; i < count; i++) {
    pictures.push({
      id : i + 1,
      url : 'photos/' + (i + 1) + '.jpg',
      description : 'Описание',
      likes: random(MIN_LIKES, MAX_LIKES),
      comments: generateComments(random(0, MAX_COMMENTS)),
    });
  }
    return pictures;
};

const generateComments = (count) => {
  const comments = [];

  for (let i = 0; i < count; i++) {
    comments.push({
      id: i + 1,
      avatar: 'img/avatar-' + random(0, AVATAR_COUNT) + '.svg',
      name: NAMES[random(0, NAMES.length - 1)],
      message: getRandomItems(SENTENSES, random(1, 2)).join(' '),
    });
  }

  return comments;
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

const pictures = generatePictures(PICTURE_COUNT);


