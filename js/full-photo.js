import { isEscEvent, isEnterEvent } from './util.js';
import {toSend} from './server.js';
let pictureElement = document.querySelector('.big-picture');
let picturePhoto = pictureElement.querySelector('.big-picture__img > img');
let pictureLikes = pictureElement.querySelector('.likes-count');
let pictureCountComments = pictureElement.querySelector('.comments-count');
let pictureDesctiption = pictureElement.querySelector('.social__caption');
let pictureBoxComments = pictureElement.querySelector('.social__comments');
let buttonClose = pictureElement.querySelector('.big-picture__cancel');
let counterCommentBox = pictureElement.querySelector('.social__comment-count');
let commentLoader = document.querySelector('.comments-loader');
const downloadElement = document.querySelector('#upload-file');
const editForm = document.querySelector('.img-upload__overlay');
const buttonCancelForm = document.querySelector('#upload-cancel');
const scalePlus = document.querySelector('.scale__control--bigger');
const scaleMinus = document.querySelector('.scale__control--smaller');
const scaleValue = document.querySelector('.scale__control--value');
const bigImage = document.querySelector('.img-upload__preview img');
const ScaleControl = document.querySelector('.scale__control--value');
const imgUpload = document.querySelector('.img-upload__form');

const renderComments = (comments) => {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < comments.length; i++) {
    let commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');
    let imageElement = document.createElement('img');
    imageElement.classList.add('social__picture');
    imageElement.src = comments[i].avatar;
    imageElement.alt = comments[i].name;
    imageElement.width = 35;
    imageElement.height = 35;
    let socialTextElement = document.createElement('p');
    socialTextElement.textContent = comments[i].message;
    commentElement.appendChild(imageElement);
    commentElement.appendChild(socialTextElement);
    fragment.appendChild(commentElement);
  }
  pictureBoxComments.innerHTML = '';
  pictureBoxComments.appendChild(fragment);
};

function onEscPress(evt) {
  // смотри. В пред. варианте если сюда добавить console.log то он будет отрабатывать несколько раз ( сколько было открыто превью до этого )
  if (isEscEvent(evt)) {
    closeBigPicture();
  }
}

// это вынесли потому что убирать класс и обработчик необходимо как и на закрытие по esc так и по клику, так и по enter
function closeBigPicture() {
  pictureElement.classList.add('hidden');
  document.removeEventListener('keydown', onEscPress); // <-- onEscPress
}

const show = (picture) => {
  const pictureElement = document.querySelector('.big-picture');
  pictureElement.classList.remove('hidden');
  picturePhoto.src = picture.url;
  pictureLikes.textContent = picture.likes
  pictureCountComments.textContent = picture.comments.length;
  pictureDesctiption.textContent = picture.description;
  renderComments(picture.comments);
  counterCommentBox.classList.add('hidden');
  commentLoader.classList.add('hidden');
  document.body.classList.add('modal-open');
  // обработчик который добавляем и тот который удалем должен ссылаться на одну и ту же функцмю, иначе удаления не произойдет
  // то есть при отобрадении добавляем обработчик, а при закрытии удаляем, как бы превью не закрывалось.
  document.addEventListener('keydown', onEscPress); // <-- onEscPress
};

buttonClose.addEventListener('click', () => {
  closeBigPicture();
});

buttonClose.addEventListener('keydown', (evt) => {
  if (isEnterEvent(evt)) {
    closeBigPicture();
  }
});

//функция для загрузки нового изображения и показа формы
downloadElement.addEventListener('input', function () {
  editForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
  ScaleControl.value = '100%';
  bigImage.style.filter = "";
  bigImage.className = "";
  sliderElement.noUiSlider.set([0]);
  scalePlus.addEventListener('click', zoomIn);
  scaleMinus.addEventListener('click', zoomOut);
  const post = {
    id: 1,
    userId: 31337,
    title: 'Обзор метода fetch',
    body: 'Содержимое обзора',
  }
  imgUpload.addEventListener('submit', (evt) => {
    evt.preventDefault();
    toSend(post);
    console.log(post);
  });
});
// выбор эффекта
let radioButtons = document.querySelectorAll('.effects__radio');
for (let i = 0; i < radioButtons.length; i++) {
  console.log(radioButtons[i]);
  radioButtons[i].addEventListener('change', function () {
    console.log('Выбор эффекта --- ' + this.value);
    bigImage.className = "";
    bigImage.style.filter = "";
    bigImage.classList.add('effects__preview--' + this.value);
    switch (this.value) {
      case 'none':
        bigImage.style.filter = '';
        sliderElement.noUiSlider.set([0]);
        sliderElement.style.display = `none`;
        break;

      case 'chrome':
        bigImage.style.filter = `grayscale(0)`;
        sliderElement.noUiSlider.set([0]);
        sliderElement.style.display = `block`;
        break;

      case 'sepia':
        bigImage.style.filter = `sepia(0)`;
        sliderElement.noUiSlider.set([0]);
        sliderElement.style.display = `block`;
        break;

      case 'marvin':
        bigImage.style.filter = `invert(0%)`;
        sliderElement.noUiSlider.set([0]);
        sliderElement.style.display = `block`;
        break;

      case 'phobos':
        bigImage.style.filter = `blur(0px)`;
        sliderElement.noUiSlider.set([0]);
        sliderElement.style.display = `block`;
        break;

      case 'heat':
        bigImage.style.filter = `brightness(0)`;
        sliderElement.noUiSlider.set([0]);
        sliderElement.style.display = `block`;
        break;

      default:
        break;
    }
  });
}

//функция закрытия окна формы
let closeForm = () => {
  editForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  bigImage.style.transform = `scale(1)`;
  ScaleControl.value = '100%';
  scalePlus.removeEventListener('click', zoomIn);
  scaleMinus.removeEventListener('click', zoomOut);
  hashtagInput.value = '';
  commentInput.value = '';
}

buttonCancelForm.addEventListener('click', closeForm);

let zoom = 1;
ScaleControl.value = '100%';

const zoomIn = () => {
  zoom += 0.25;
  if (zoom > 1) {
    zoom = 1;
  }
  ScaleControl.value = `${zoom * 100}%`;
  bigImage.style.transform = `scale(${zoom})`;
}

const zoomOut = () => {
  zoom -= 0.25;
  if (zoom < 0.25) {
    zoom = 0.25;
  }
  ScaleControl.value = `${zoom * 100}%`;
  bigImage.style.transform = `scale(${zoom})`;
}
// создание слайдера и эффектов на изображение
const sliderElement = document.querySelector('.effect-level__slider');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 0,
  step: 1,
  connect: 'lower',
});

let effectLevel = document.querySelector('.effect-level__value');
console.log(effectLevel);

sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
  console.log(unencoded[handle]);
  effectLevel.value = unencoded[handle];
  console.log(effectLevel.value);
  let effectLevelValue = effectLevel.value;
  console.log("Текущий, включенный сейчай эффект --- " + document.querySelector('input[name="effect"]:checked').value);
  let currentEffect = document.querySelector('input[name="effect"]:checked').value;
  switch (currentEffect) {
    case 'none':
      bigImage.style.filter = '';
      break;

    case 'chrome':
      let effectLevelChrome = effectLevelValue / 100;
      bigImage.style.filter = `grayscale(${effectLevelChrome.toFixed(1)})`;
      break;

    case 'sepia':
      let effectLevelSepia = effectLevelValue / 100;
      bigImage.style.filter = `sepia(${effectLevelSepia.toFixed(1)})`;
      break;

    case 'marvin':
      let effectLevelMarvin = effectLevelValue;
      bigImage.style.filter = `invert(${effectLevelMarvin}%)`;
      break;

    case 'phobos':
      let effectLevelPhobos = effectLevelValue * 0.03;
      bigImage.style.filter = `blur(${effectLevelPhobos}px)`;
      break;

    case 'heat':
      let effectLevelHeat = effectLevelValue * 0.03;
      bigImage.style.filter = `brightness(${effectLevelHeat})`;
      break;

    default:
      break;
  }
});

/// Валидация хеш_тегов и комментариев
const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const MAX_CHARACTERS = 20;
const MAX_TAGS = 5;

const showTagError = function (hashTags) {
  for (var i = 0; i < hashTags.length; i++) {
    if (hashTags[i].indexOf('#') !== 0) {
      return 'Начните ваш хэштег с символа "#"';
    } else if (hashTags[i].length === 1) {
      return 'Ваш хэштег не может состоять только из одной решетки';
    } else if (hashTags[i].length > MAX_CHARACTERS) {
      return 'Ваш хэштег превышает максимальную длинну на ' + (hashTags[i].length - MAX_CHARACTERS) + ' символов';
    } else if (hashTags.length > MAX_TAGS) {
      return 'Нельзя указывать больше пяти хэштегов';
    } else if (hashTags[i].indexOf('#', 1) > 0) {
      return 'Хэштеги должны разделяться пробелом';
    } else if (hashTags.indexOf(hashTags[i], i + 1) > 0) {
      return 'Хэштеги не должны повторяться';
    }
  }
  return '';
};

const setTagValidity = function () {
  let tagsArray = hashtagInput.value.toLowerCase().split(/[\s]+/).filter(function (word) {
    return word.length > 0;
  });

  hashtagInput.setCustomValidity(showTagError(tagsArray));
  hashtagInput.style.border = showTagError(tagsArray) ? '2px solid red' : '';
};

hashtagInput.addEventListener('input', function () {
  setTagValidity();
});

hashtagInput.addEventListener('focus', function () {
  document.removeEventListener('keydown', onEscPress);
});

hashtagInput.addEventListener('blur', function () {
  document.addEventListener('keydown', onEscPress);
});

commentInput.addEventListener('focus', function () {
  document.removeEventListener('keydown', onEscPress);
});

commentInput.addEventListener('blur', function () {
  document.addEventListener('keydown', onEscPress);
});

export {show, closeForm};
