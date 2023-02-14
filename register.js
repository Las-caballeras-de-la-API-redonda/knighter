const userInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const nameInput = document.getElementById("name");
const surnameInput = document.getElementById("surname");
const passwordInput1 = document.getElementById("password");
const submitButton = document.getElementById("submit");


// submitButton.addEventListener("click", function(event) {
//   // event.preventDefault();

//   // Validate username
//   const username = userInput.value;
//   if (!/^[a-zA-Z]+$/.test(username)) {
//     alert("Username must only contain letters!");
//     return;
//   }
  
//   // Check if username is already in use
//   // ...

//   // Validate email
//   const email = emailInput.value;
//   if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
//     alert("Invalid email address!");
//     return;
//   }
  
//   // Check if email is already in use
//   // ...

//   // Validate name
//   const name = nameInput.value;
//   if (!/^[a-zA-Z\s]+$/.test(name)) {
//     alert("Name must only contain letters and spaces!");
//     return;
//   }

//   // Validate surname
//   const surname = surnameInput.value;
//   if (!/^[a-zA-Z\s]+$/.test(surname)) {
//     alert("Surname must only contain letters and spaces!");
//     return;
//   }

//    // Validate password
//    const password = passwordInput1.value;
//    if (password.length < 12 || !/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[0-9]/.test(password) || !/[!@#\$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
//      alert("Password must be at least 12 characters long and include at least one uppercase letter, one lowercase letter, one number, and one symbol!");
//      return;
//    }
//   }) 

  
// // const form = document.getElementById("submit")

// submitButton.addEventListener("click", function(event){
//     event.preventDefault();    
//     console.log("conexion correcta")
//      const userName = document.getElementById('username').value;
//      const emailUser = document.getElementById('email').value;
//      const nameUser = document.getElementById('name').value;
//      const surnameUser = document.getElementById('surname').value;
//      const passwordUser = document.getElementById('password').value;
    
//      fetch('http://localhost:3000/api/users?' + new URLSearchParams({alias:userName,name:emailUser,password:passwordUser}) ,{
//        method: 'POST',
//        headers: {'Content-Type': 'application/json'},
//        body: JSON.stringify({
//         alias: userName,
//         name: emailUser,
//         password: passwordUser
//       })

//      })
//        .then(response => response.json())
//        .then(data => {
//          console.log(data)
//        })
//        .catch(error => {
//          console.error(error);
//        });
//    });



submitButton.addEventListener("click", function(event) {
  event.preventDefault();

  let valid = true;

  // Validate username
  const username = userInput.value;
  if (!/^[a-zA-Z]+$/.test(username)) {
    alert("Username must only contain letters!");
    valid = false;
  }
  
  // Validate email
  const email = emailInput.value;
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    alert("Invalid email address!");
    valid = false;
  }
  
  // Validate name
  const name = nameInput.value;
  if (!/^[a-zA-Z\s]+$/.test(name)) {
    alert("Name must only contain letters and spaces!");
    valid = false;
  }

  // Validate surname
  const surname = surnameInput.value;
  if (!/^[a-zA-Z\s]+$/.test(surname)) {
    alert("Surname must only contain letters and spaces!");
    valid = false;
  }

  // Validate password
  const password = passwordInput1.value;
  if (password.length < 12 || !/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[0-9]/.test(password) || !/[!@#\$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    alert("Password must be at least 12 characters long and include at least one uppercase letter, one lowercase letter, one number, and one symbol!");
    valid = false;
  }

  if (valid) {
    // Submit form
    const userName = document.getElementById('username').value;
    const emailUser = document.getElementById('email').value;
    const nameUser = document.getElementById('name').value;
    const surnameUser = document.getElementById('surname').value;
    const passwordUser = document.getElementById('password').value;

    fetch('http://localhost:3000/api/users?' + new URLSearchParams({alias:userName,name:emailUser,password:passwordUser}) ,{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        alias: userName,
        name: emailUser,
        password: passwordUser
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        location.replace("success.html");
      })
      .catch(error => {
        console.error(error);
      });
  }
});
