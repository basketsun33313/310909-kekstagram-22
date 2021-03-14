import { comments } from "./data";
let picturePhoto = document.querySelector('.big-picture__img > img');
let pictureLikes = document.querySelector('.likes-count');
let pictureCountComments = document.querySelector('.comments-count');
let pictureDesctiption = document.querySelector('.social__caption');
let pictureBoxComments = document.querySelector('.social__comments');
let buttonClose = document.querySelector('.big-picture__cancel');
let counterCommentBox = document.querySelector('.social__comment-count');
let commentLoader = document.querySelector('.comments-loader');
let bodyBackground = document.querySelector('body');

const show = (picture) => {
  const pictureElement = document.querySelector('.big-picture');
  pictureElement.classList.remove('hidden');
  picturePhoto.src = picture.url;
  pictureLikes = picture.textContent;
  pictureCountComments = picture.textContent;
  pictureDesctiption = picture.textContent = 'Описание фотографии';
  counterCommentBox.classList.add('hidden');
  commentLoader.classList.add('hidden');
  bodyBackground.classList.add('modal-open');
};

buttonClose.addEventListener('click', function () {
  pictureElement.classList.add('hidden');
});

const renderComments = (comments) => {
  for (let i = 0; i < comments.length; i++) {
    let commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');
  }
  pictureBoxComments.appendChild(commentElement);
}

export{show, renderComments};
