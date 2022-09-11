function labsubmit() {
    var date = document.getElementById('Sdate').value;
    var time1 = document.querySelector('#Stime').value;
    var time2 = document.querySelector('#Etime').value;
    var id = document.getElementById("lab_selection");

    if (confirm("Are you sure you want to submit the form?")) {
        //check if all credentials has been fill in
        if (!isValidDate(date) || !time1.match(/\d+:\d+/) || !time2.match(/\d+:\d+/) || id.value == "") {
            alert("One of the credentials is not fulfilled. Please double check.");
        } else {
            alert("You have submmitted the credentials.");
            location.href = '/ROOM SELECTION/roomselection.html';
        }
    }
}

function redirect(){
    location.href = 'roomselection.html';
}

function isValidDate(d) {
    return !isNaN((new Date(d)).getTime());
}