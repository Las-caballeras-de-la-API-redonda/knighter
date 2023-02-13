
const usernameInput = document.getElementById("username-input");
const passwordInput = document.getElementById("password-input");
const errorMessage = document.getElementById("error-message");
const form = document.getElementById('submit');

form.addEventListener("click", event => {
  event.preventDefault();
  
  const username = usernameInput.value;
  const password = passwordInput.value;
  
  if (username === "admin" && password === "password") {
    window.location.href = "login.html";
  } else {
    errorMessage.textContent = "Invalid username or password.";
  }
});

function validatePassword(password) {
  var pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return pattern.test(password);
}

const settingsBtn = document.getElementById("settings-btn");

// if (!loggedIn) {
//   settingsBtn.style.display = "none";
// }

form.addEventListener('click', (event) => {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
    fetch('http://localhost:3000/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })
    .then(response => response.json())
    .then(data => {
      // handle the API response
    })
    .catch(error => {
      console.error(error);
    });
});
