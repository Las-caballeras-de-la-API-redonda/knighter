const form = document.getElementById("login-form");
const usernameInput = document.getElementById("username-input");
const passwordInput = document.getElementById("password-input");
const errorMessage = document.getElementById("error-message");

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

const settingsBtn = document.getElementById("settings-btn");

if (!loggedIn) {
  settingsBtn.style.display = "none";
}
