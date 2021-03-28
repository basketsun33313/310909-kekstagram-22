import {closeForm} from './full-photo.js';
let getData = (cb) => {
  window.fetch("https://22.javascript.pages.academy/kekstagram/data").then(result => {
  return result.json();

})
.then(result => {
  cb(result);

}).catch(error => {
  let templateFragment = document.querySelector('#error').content;
  document.body.appendChild(templateFragment);
  let buttonErrorCloce = document.querySelector('.error__button');
  if (buttonErrorCloce) {
    buttonErrorCloce.addEventListener('click', function() {
      document.querySelector('.error').remove();
    });
  }
})
}

let toSend = (post) => {
  window.fetch("https://22.javascript.pages.academy/kekstagram", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(post),
  })
  .then(() => {
    closeForm();
    let templateSuccess = document.querySelector('#success').content;
    let successContainer = document.querySelector('.success');
    let buttonSuccessClose = document.querySelector('.success__button');
    let fragment = document.createDocumentFragment();
    let fragmentElement = templateSuccess.cloneNode(true);
    fragment.appendChild(fragmentElement);
    document.body.appendChild(fragment);
    if (buttonSuccessClose) {
        buttonSuccessClose.addEventListener('click', () => {
        successContainer.remove();
      });
        document.body.addEventListener('keydown', (evt) => {
        if (evt.key === 'Escape' || evt.key === 'Esc') {
          successContainer.remove();
        }
      });
    }
    console.log('Успех отправки');
  })
  .catch(() => {
    document.body.appendChild(templateFragment);
    console.log('Ошибка отправки');
  })
}

export{getData,toSend};
