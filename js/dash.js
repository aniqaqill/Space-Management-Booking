function validatePassword(password){
    var pass = password.value;
    let length = pass.length;

    if(length >= 6){
        alert("Your new password has been updated.");
    }else{
        alert("Password must be at least 6 characters.");
    }
}