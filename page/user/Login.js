function formValidator(){
    var username = document.getElementsByClassName("user")[0].value;
    var password = document.getElementsByClassName("pwd")[0].value;

    if(username == 'user'){
        if(password == 'user'){
            return true;
        }1
    }
    
    return false;
}

