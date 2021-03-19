import {isEscEvent, isEnterEvent} from './util.js';
let pictureElement = document.querySelector('.big-picture');
let picturePhoto = pictureElement.querySelector('.big-picture__img > img');
let pictureLikes = pictureElement.querySelector('.likes-count');
let pictureCountComments = pictureElement.querySelector('.comments-count');
let pictureDesctiption = pictureElement.querySelector('.social__caption');
let pictureBoxComments = pictureElement.querySelector('.social__comments');
let buttonClose = pictureElement.querySelector('.big-picture__cancel');
let counterCommentBox = pictureElement.querySelector('.social__comment-count');
let commentLoader = document.querySelector('.comments-loader');

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
};

// это вынесли потому что убирать класс и обработчик необходимо как и на закрытие по esc так и по клику, так и по enter
function closeBigPicture () {
  pictureElement.classList.add('hidden');
  document.removeEventListener('keydown', onEscPress); // <-- onEscPress
};

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

buttonClose.addEventListener('click',  () => {
  closeBigPicture();
});

buttonClose.addEventListener('keydown', (evt) => {
  if (isEnterEvent(evt)) {
    closeBigPicture();
  }
});

export{show};
