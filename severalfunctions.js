function validatePassword(password) {
    var pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return pattern.test(password);
  }
  //input to html
  var password = "Password1@";
  if (validatePassword(password)) {
    console.log("Password is valid");
  } else {
    console.log("Password is invalid");
  }
    

  async function checkUsernameAndEmail(username, email) {
    try {
      const response = await fetch(`https://serverexample.com/api/check-username-and-email?username=${username}&email=${email}`);
      const data = await response.json();
      if (data.usernameExists || data.emailExists) {
        return {
          success: false,
          message: data.usernameExists ? "Username already exists" : "Email already exists"
        };
      } else {
        return {
          success: true,
          message: "Both username and email are available"
        };
      }
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: "An error occurred while checking the availability of the username and email"
      };
    }
  }
  
 //input to html
  const username = "newuser";
  const email = "newuser@example.com";
  checkUsernameAndEmail(username, email).then(result => {
    if (result.success) {
      console.log(result.message);
      // Create the new user account here
    } else {
      console.error(result.message);
    }
  });
  

 ///input to hmtl
  function validateEmail(email) {
   ///  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  ///   return emailRegex.test(email);
 ///  }
 ///  const email = "example@email.com";
/// if (validateEmail(email)) {
///   console.log("Email is valid");
/// } else {
///   console.error("Email is not valid");
}


function generatePasswordResetLink(email, token) {
  return `https://your-website.com/reset-password?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`;
}


function constructPasswordResetEmail(email, link) {
  return `
    Hi,
    
    We received a request to reset the password for your account. If you did not make this request, you can safely ignore this email.
    
    To reset your password, please click the link below:
    
    ${link}
    
    If the link does not work, you can copy and paste it into your browser's address bar.
    
    Thank you,
    The Support Team
  `;
}
/// nodemailer library for Node.js