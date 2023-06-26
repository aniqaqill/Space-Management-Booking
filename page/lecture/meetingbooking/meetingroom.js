function meetsubmit() {
    var date = document.getElementById('Sdate').value;
    var time1 = document.querySelector('#Stime').value;
    var time2 = document.querySelector('#Etime').value;
    var id = document.getElementById("meet_selection");

    if (confirm("Are you sure you want to submit the form?")) {
        //check if all credentials has been fill in
        if (!isValidDate(date) || !time1.match(/\d+:\d+/) || !time2.match(/\d+:\d+/) || id.value == "") {
            alert("One of the credentials is not fulfilled. Please double check.");
            return false;
        } else {
            alert("You have submmitted the credentials.");
            redirect();
            return true;
        }
    }
}

function redirect() {
    window.location.href = "../ROOM SELECTION/roomselection.html";
}

function isValidDate(d) {
    return !isNaN((new Date(d)).getTime());
}