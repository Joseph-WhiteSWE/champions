import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import {
  getDatabase,
  ref,
  push,
  onValue,
} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js';

const btnEl = document.getElementById('btn-el');
const inputEl = document.getElementById('input-el');
const endorseUl = document.getElementById('endorse-el');

const appSettings = {
  databaseURL: 'https://champions-ea7b6-default-rtdb.firebaseio.com/',
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const endorseInDB = ref(database, 'endorse');

btnEl.addEventListener('click', function () {
  appendValue(inputEl.value);
  clearValue();
});

onValue(endorseInDB, function (snapshot) {
  if (snapshot.exists()) {
    let itemsArray = Object.values(snapshot.val());
    endorseUl.innerHTML = '';
    for (let i = 0; i < itemsArray.length; i++) {
      appendValue(itemsArray[i]);
    }
  }
});

function clearValue() {
  inputEl.value = '';
}

function appendValue(itemValue) {
  endorseUl.innerHTML += `<li> ${itemValue} </li>`;
}
