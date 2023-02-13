const form = document.getElementById("login-form");
const usernameInput = document.getElementById("username-input");
const passwordInput = document.getElementById("password-input");
const errorMessage = document.getElementById("error-message");

/*
form.addEventListener("submit", event => {
  event.preventDefault();
  
  const username = usernameInput.value;
  const password = passwordInput.value;
  
  if (username === "admin" && password === "password") {
    window.location.href = "login.html";
  } else {
    errorMessage.textContent = "Invalid username or password.";
  }
});
*/
function validatePassword(password) {
  var pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return pattern.test(password);
}

const settingsBtn = document.getElementById("settings-btn");
/*
if (!loggedIn) {
  settingsBtn.style.display = "none";
}
*/
//const form = document.getElementById('login-form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  fetch('http://localhost:3000/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error(error);
    });
});
