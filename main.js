


// //<button id="settings-btn">Settings</button>  
// {/* <script> const settingsBtn = document.getElementById("settings-btn");  if (!loggedIn) {   settingsBtn.style.display = "none"; } </script> */}

const knighterForm = document.getElementById("knighter-form");
const knighterButton = document.getElementById("knighter-button");
const knighterInput = document.getElementById("knighter-input");
const knighterList= document.getElementById("knighter-list");
const followButton = document.getElementById("followButton");
const honorButton = document.querySelector(".knighter-footer.honor-button")
let newFollowButton = document.querySelector(".knighter-footer.followButton");
let id = ""
let u = "" 


const press = localStorage.getItem("press")
// if (press == "true") {
// followButton.innerHTML = "Following!";
// } else {
//   followButton.innerHTML = "Follow!";
// }


// variable to indicate if the user is logged in or not 
let loggedIn = true 



//OCULTAR PARTES CUANDO ESTEMOS LOGUEADOS
if (!loggedIn) {
  knighterForm.style.display = "none"; 
  // followButton.style.display = "none";//problema se ocultan todos los tweets
  // honorButton.style.display = "none";//problema se ocultan todos los tweets
}


//DRAW THE KNIGHTERS FROM THE API
const url = 'http://127.0.0.1:3000/api/listadeposts' 
fetch(url)
.then(response => response.json())
.then(data => {
  let postHTML = [];
  for (const i of data.listado) {
    postHTML += `
    <div class="knighter-container">
    <div class="knighter-header">
    <img src="/caballera404.png" alt="avatar">
    <h3>${i.usuario}</h3>
    <br>
    <p class="knighter-date">${i.fecha}</p>
    </div>
    <p class="knighter-text">${i.texto}</p>
    <div class="knighter-footer">
    <button class="honor-button" value="${i._id}">Honor</button>
        <span class="honor-count">0</span>
        <button class="followButton">Follow</button>
      </div>
      </div>` 
      document.getElementById('knighter-list').innerHTML = postHTML;
    }})
    

    //PUBLISH A KNIGHTER
    //adding an event to the button for publishing a knighter and conecting with the API
    knighterButton.addEventListener("click", function(){
      const usuario = "Gabriela"; //IMPORTANTE!!!!cambiar el usuario por el usuario logueado
      
      const knighter = knighterInput.value ;
      console.log(knighter)
      const url = 'http://127.0.0.1:3000/api/listadeposts?' + new URLSearchParams({usuario:usuario,texto:knighter,imagen:"img"});
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }})
  .then((resp) => resp.json())
  .then((data) => {
    id = JSON.stringify(data["result"])
    console.log(id)
    u  = JSON.stringify(data["usuario"])
    const li = document.createElement("li");
  li.innerHTML = `
  <div class="knighter-container">
  <div class="knighter-header">
  <h3>${usuario}</h3> //hay que poner el usuario
  </div>
  <p class="knighter-text">${knighter}</p>
  <button class="honor-button" value = ${data["result"]}>Honor</button>
  <span class="honor-count">0</span>
  <button class="followButton">Follow</button>
  </div>
  `;
  knighterList.prepend(li);
  })
  .catch((error) => {
    console.log(error);
  });
  
  
})



//ADING AN EVENT FOR THE FOLLOW BUTTON
knighterList.addEventListener("click", function(event) {
    if (event.target.className === "followButton") {
      const followButton = event.target;
      if (followButton.innerHTML === "Following!")
       {
        followButton.innerHTML = "Follow";
        followButton.disabled = false;
        // localStorage.setItem ("press",false);
      } else {
        followButton.innerHTML = "Following!";
        followButton.disabled = false;
        // localStorage.setItem ("press",true);

        const url= 'http://127.0.0.1:3000/api/seguidores/empezaraseguir?' + new URLSearchParams({usuario:"benito",user_to_follow:'Gabriela'}) ;
        fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' 
        }})
          .then((resp) => resp.json())
          .then((data) => console.log(data))
          .catch((error) => {
            console.error("Error connecting to the server");
          });
        }}
})


//ADDING AN EVENT FOR THE HONOR BUTTON
knighterList.addEventListener("click", function(event) {
  const honor = document.querySelector(".honor-button")
  if (event.target.className === "honor-button") {
    const knighterHonor = event.target.parentNode.parentNode;
    const honorCount = knighterHonor.querySelector(".honor-count");
    let count = parseInt(honorCount.innerHTML);
    if (event.target.innerHTML === "Honor") {
      count++;
      honorCount.innerHTML = count;
      event.target.innerHTML = "HONOR!";
      const usuario = 'monica'
      const idKnighter = honor.value
      console.log(honor.value)
      const url= 'http://localhost:3000/api/honors?'  + new URLSearchParams({user:usuario, publishing_id:idKnighter}); 
  fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' 
      },
        body: JSON.stringify({
        // publishing_id: publishingId,
        user: usuario,
        publishing_id:idKnighter
      })
    })
        .then((resp) => resp.json())
        .then((data) => console.log(data))
        .catch((error) => {
        console.error("Error connecting to the server");
        });
}}})