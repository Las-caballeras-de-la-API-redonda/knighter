const usernameInput = document.getElementById("username-input");
const passwordInput = document.getElementById("password-input");
const form = document.getElementById('submitButton');
let id = ""
let u = "" 


form.addEventListener("click", event => {
  event.preventDefault();
  
  const username = usernameInput.value;
  const password = passwordInput.value;

  fetch('http://localhost:3000/api/users?' + new URLSearchParams({name: username, password: password}))
  .then(response => response.json())
  .then(data => {
    const userList = data.listado //guardamos el listado de los usuarios en una variable (es objeto)
    const arrayUserList = Object.values(userList) //convertimos el objeto en un arrray para poder comprobar si esta la contraseña
    const user = arrayUserList.find(user => user.name === username && user.password === password);
    if (user) {
    console.log(user.name); // show de user
    console.log(user.password); // show de password
      // Update login status and show hidden buttons of other 
      localStorage.setItem('loggedIn', true);
      localStorage.setItem('username', user.name);
      localStorage.setItem('email', user.email);
      localStorage.setItem('user', user.alias);
      // Redirect to main page
      window.location.href = "/main.html";
    } else {
      alert("Invalid username or password.");
    }
  })
  .catch(error => {
    console.error(error);
  });
});



//save the LOGIN in the LOCAL STORAGE : 
