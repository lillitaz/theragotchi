
let minCharactersUserName = 3; 
let emailRegex = new RegExp("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}$");
let minCharactersPassword = 8; 


function validateUserName(userName) {
    return userName.length >=  minCharactersUserName;
}

function validateEmail(email) {
    /*console.log(email);
    console.log(emailRegex.test(email));
    return emailRegex.test(email);*/
    return true;
}

function validatePassword(password) {
    //return password.length >= minCharactersPassword //&& /[a-z]/.test(password) && /[A-Z]/.test(password) && /\d/.test(password) && /[@#$%^&*!]/.test(password)
    return true;
}

export default {
    validateUserName,
    validateEmail,
    validatePassword,
  };