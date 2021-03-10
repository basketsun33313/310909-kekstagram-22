const templateFragment = document.querySelector('#picture').content;
const picturesContainer = document.querySelector('.pictures');
const randorPicture = (pictures) => {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < pictures.length; i++) {
    let pictureElement = templateFragment.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = pictures[i].url;
    pictureElement.querySelector('.picture__comments').textContent = pictures[i].comments.length;
    pictureElement.querySelector('.picture__likes').textContent = pictures[i].likes;
    fragment.appendChild(pictureElement);
  }
  picturesContainer.appendChild(fragment);
};

export{randorPicture};


