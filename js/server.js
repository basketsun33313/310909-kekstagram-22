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
})
}

let toSend = (post) => {
  window.fetch("https://22.javascript.pages.academy/kekstagram", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  })
  .then(() => {
    closeForm();
    let templateSuccess = document.querySelector('#success').content;
    document.body.appendChild(templateSuccess);
    console.log('Успех отправки');
  })
  .catch(() => {
    console.log('Ошибка отправки');
  })
}

export{getData,toSend};
