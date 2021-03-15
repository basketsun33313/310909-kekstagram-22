let pictureElement = document.querySelector('.big-picture');
let picturePhoto = pictureElement.querySelector('.big-picture__img > img');
let pictureLikes = pictureElement.querySelector('.likes-count');
let pictureCountComments = pictureElement.querySelector('.comments-count');
let pictureDesctiption = pictureElement.querySelector('.social__caption');
let pictureBoxComments = pictureElement.querySelector('.social__comments');
let tamplateFragment = pictureElement.querySelector('.social__comment').content;
let buttonClose = pictureElement.querySelector('.big-picture__cancel');
let counterCommentBox = pictureElement.querySelector('.social__comment-count');
let commentLoader = document.querySelector('.comments-loader');
let bodyBackground = document.querySelector('body');

const show = (picture) => {
  const pictureElement = document.querySelector('.big-picture');
  pictureElement.classList.remove('hidden');
  picturePhoto.src = picture.url;
  pictureLikes.textContent = pictureElement.querySelector('.likes-count');
  pictureCountComments.textContent = pictureElement.querySelector('.comments-count');
  pictureDesctiption.textContent = pictureElement.querySelector('.social__caption');
  counterCommentBox.classList.add('hidden');
  commentLoader.classList.add('hidden');
  bodyBackground.classList.add('modal-open');
};

buttonClose.addEventListener('click', function () {
  pictureElement.classList.add('hidden');
});

const renderComments = (comments) => {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < comments.length; i++) {
    const commentElement = tamplateFragment.cloneNode(true);
    commentElement.classList.add('social__comment');
    fragment.appendChild(commentElement);
  }
  pictureBoxComments.appendChild(fragment);
}

export{show, renderComments};
