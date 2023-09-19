import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const btnEL = document.getElementById("btn-el")
const inputEl = document.getElementById("input-el")
const endorseUl = document.getElementById("endorse-el")
 
const appSettings = {
databaseURL: "https://champions-ea7b6-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorseInDB = ref(database, "endorse")

btnEL.addEventListener("click", function () {
    prependValue(inputEl.value);
    //to prevent from input from saving to DB
    // push(endorseInDB, inputEl.value); 
    clearValue();
});

onValueFunc();

function prependValue(itemValue) {
    let li = document.createElement("li");
    li.textContent = itemValue;
    endorseUl.insertBefore(li, endorseUl.firstChild);
}

function clearValue() {
    inputEl.value = "";
}

function onValueFunc() {
    onValue(endorseInDB, function (snapshot) {
        if (snapshot.exists()) {
            let itemsArray = Object.values(snapshot.val());
            endorseUl.innerHTML = "";
            for (let i = 0; i < itemsArray.length; i++) {
                prependValue(itemsArray[i]);
            }
        }
    });
}

