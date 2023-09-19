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

onValueFunc()
let isCLicked = false

btnEL.addEventListener("click", function () {
    appendValue(inputEl.value)
    isCLicked = true
    push(endorseInDB, inputEl.value)
    clearValue()
    
})

function appendValue(itemValue){
    endorseUl.innerHTML = `<li> ${itemValue} </li>`
}

function clearValue(){
    inputEl.value = ""
}

function onValueFunc(){
    onValue(endorseInDB, function (snapshot){
        if(snapshot.exists()){
        let itemsArray = Object.values(snapshot.val());
            if(isCLicked){
                for(let i=0; i < itemsArray.length -1; i++ ){
                endorseUl.innerHTML += `<li>${itemsArray[i]}</li>`
                }
            
            }  else{
                for(let i=0; i < itemsArray.length; i++ ){
                endorseUl.innerHTML += `<li>${itemsArray[i]}</li>`
                }
            }
        }
    
    });
}

