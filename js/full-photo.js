let pictureElement = document.querySelector('.big-picture');
let picturePhoto = pictureElement.querySelector('.big-picture__img > img');
let pictureLikes = pictureElement.querySelector('.likes-count');
let pictureCountComments = pictureElement.querySelector('.comments-count');
let pictureDesctiption = pictureElement.querySelector('.social__caption');
let pictureBoxComments = pictureElement.querySelector('.social__comments');
let tamplateFragment = pictureElement.querySelector('.social__comment');
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
};

buttonClose.addEventListener('click', function () {
  pictureElement.classList.add('hidden');
});

export{show, renderComments};
