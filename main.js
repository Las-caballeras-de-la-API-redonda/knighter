
const navButtons = document.getElementsByClassName("nav-button")
const knighterForm = document.getElementById("knighter-form");
const knighterButton = document.getElementById("knighter-button");
const knighterInput = document.getElementById("knighter-input");
const knighterList= document.getElementById("knighter-list");
const followButton = document.getElementsByClassName("followButton");
const honorButton = document.getElementsByClassName("honor-button")
let newFollowButton = document.querySelector(".knighter-footer.followButton");
let id = ""
let u = ""
const searchInput = document.getElementById("search-input");


// const press = localStorage.getItem("press")


//OCULTAR PARTES CUANDO ESTEMOS LOGUEADOS
const loggedIn = localStorage.getItem('loggedIn') === 'true';
if (!loggedIn) {
  knighterForm.style.display = "none";
  const profileButton = navButtons[1];
  const settingsButton = navButtons[3];// selecciona el segundo botón de la lista
  profileButton.style.display = "none"
  settingsButton.style.display = "none"
}else{
  const loginButton = navButtons[2];
  loginButton.style.display ="none"
}


//DRAW THE KNIGHTERS FROM THE API
const url = 'http://127.0.0.1:3000/api/listadeposts'
fetch(url)
.then(response => response.json())
.then(data => {
  let postHTML = [];
  for (const i of data.listado) {
    let buttonHTML = '';

    if (loggedIn) {
      buttonHTML = `
        <button class="honor-button" value="${i._id}">Honor</button>
        <span class="honor-count">0</span>
        <button class="followButton">Follow</button>
      `;
    }
    postHTML += `
    <div class="knighter-container">
    <div class="knighter-header">
    <img src="images/logosquare.PNG" alt="avatar">
    <a class="knighter-name" href="/userprofilesecond.html" data-usernameProfile="${i.usuario}">${i.usuario}</a>
    <br>
    <p class="knighter-date">${i.fecha}</p>
    </div>
    <p class="knighter-text">${i.texto}</p>
    <div class="knighter-footer">
    ${buttonHTML}
      </div>
      </div>`
 document.getElementById('knighter-list').innerHTML = postHTML;
  //intento para guardar el nombre cuando se pincha dentro del LocalStorage
  //       const knighterLinks = document.querySelectorAll('.knighter-name');
  //       knighterLinks.forEach(link => {
  //           link.addEventListener('click', (event) => {
  //           // Store the username in local storage when the link is clicked
  //           const usernameProfile = event.currentTarget.dataset.usernameProfile;
  //         console.log(usernameProfile)
  //           localStorage.setItem('usernameProfile', usernameProfile);

  // // Add click event listener to each knighter name link
  //         // Update the value of usernameProfile in the element's data attribute
  //         event.currentTarget.dataset.usernameProfile = 'new value';
  //         // // // Update the HTML content of the element to display the new value
  //         event.currentTarget.textContent = 'new value';
  //             });
            // });
    };
  })


//PUBLISH A KNIGHTER
//adding an event to the button for publishing a knighter and conecting with the API
  knighterButton.addEventListener("click", function(){
    var valueUser = localStorage.getItem('username');

    const usuario = valueUser ; //IMPORTANTE!!!!cambiar el usuario por el usuario logueado
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
  <img src="images/logosquare.PNG" alt="avatar">
  <a class="knighter-name" href="/userprofile.html" >${usuario}</a>
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
        //HAY QUE GUARDAR UNA VARIABLE DE A QUIEN PERTENECE EL POST
        const url= 'http://127.0.0.1:3000/api/seguidores/empezaraseguir?' + new URLSearchParams({usuario:"pepita",user_to_follow:'Gabriela'}) ;
        fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json'
        }})
          .then((resp) => resp.json())
          .then((data) => {
            const followerList = data.result
            const arrayFollowList = Object.values(followerList)
            console.log(arrayFollowList)
          })
          .catch((error) => {
            console.log(error)
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


//VERSIÓN CON JAVASCRIPT SIN API
//Creamos función que muestre los knighters que contengan la palabra buscada
function filterKnighters() {
  let searchTerm = document.getElementById("search-input").value;
  let knighters = document.getElementsByClassName("knighter-container");

  for (let i = 0; i < knighters.length; i++) {
    let knighter = knighters[i];
    let knighterName = knighter.getElementsByClassName("knighter-name")[0].innerText;
    let knighterText = knighter.getElementsByClassName("knighter-text")[0].innerText;
    if (knighterText.toLowerCase().includes(searchTerm.toLowerCase()) || knighterName.toLowerCase().includes(searchTerm.toLowerCase())) {
      knighter.style.display = "block";
    } else {
      knighter.style.display = "none";
    }
  }
}

searchInput.addEventListener("keyup", function() {
  filterKnighters();
});