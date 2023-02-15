
const navButtons = document.getElementsByClassName("nav-button")

const knighterButton = document.getElementById("knighter-button");
const knighterInput = document.getElementById("knighter-input");
const knighterList= document.getElementById("knighter-list");
const followButton = document.getElementById("followButton");
const honorButton = document.querySelector(".knighter-footer.honor-button")
let newFollowButton = document.querySelector(".knighter-footer.followButton");
let id = ""
let u = "" 
const searchInput = document.getElementById("search-input");


// const press = localStorage.getItem("press")


//OCULTAR PARTES CUANDO ESTEMOS LOGUEADOS
const loggedIn = localStorage.getItem('loggedIn') === 'true';
if (!loggedIn) {
  const profileButton = navButtons[1];
  const settingsButton = navButtons[3];// selecciona el segundo botón de la lista
  profileButton.style.display = "none"
  settingsButton.style.display = "none"
} else {
  const loginButton = navButtons[2];
  loginButton.style.display = "none"
}

//DRAW THE KNIGHTERS FROM THE API
function refreshKnighters(){
const url = 'http://127.0.0.1:3000/api/listadeposts' 
fetch(url)
.then(response => response.json())
.then(data => {
  let postHTML = [];
  for (const i of data.listado)  {
    postHTML += `
    <div class="knighter-container">
    <div class="knighter-header">
    <img src="images/logosquare.PNG" alt="avatar">
    <a class="knighter-name" href="/userprofilesecond.html">${i.usuario}</a>
    <br>
    <p class="knighter-date">${i.fecha}</p>
    </div>
    <p class="knighter-text">${i.texto}</p>
    <div class="knighter-footer">
    <button class="honor-button" value="${i._id}">Honor</button>
        <span class="honor-count">0</span>
        <button class="followButton">Follow</button>
      </div>
      </div>` }
      document.getElementById('knighter-list').innerHTML = postHTML;
    })
}

refreshKnighters()
    

