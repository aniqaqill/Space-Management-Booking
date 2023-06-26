function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("room-sort");
    switching = true;
    //Set the sorting direction to ascending:
    dir = "asc"; 
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
      //start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /*Loop through all table rows (except the
      first, which contains table headers):*/
      for (i = 1; i < (rows.length - 1); i++) {
        //start by saying there should be no switching:
        shouldSwitch = false;
        /*Get the two elements you want to compare,
        one from current row and one from the next:*/
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        /*check if the two rows should switch place,
        based on the direction, asc or desc:*/
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            //if so, mark as a switch and break the loop:
            shouldSwitch= true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /*If a switch has been marked, make the switch
        and mark that a switch has been done:*/
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        //Each time a switch is done, increase this count by 1:
        switchcount ++;      
      } else {
        /*If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again.*/
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }

$(document).ready(function() {
      $("#searchForm").submit(function(event) {
        event.preventDefault();

        var phoneNumber = $("#phone").val();

        $.get("http://localhost:5000/applications/history/" + phoneNumber, function(response) {
          populateTable(response);
        })
        .fail(function(error) {
          console.error("Error:", error);
        });
      });

      function populateTable(data) {
        var tableBody = $("#tableBody");
        tableBody.empty();

        // Iterate through the data and create table rows
        data.forEach(function(application, index) {
          var row = $("<tr></tr>");

          var no = $("<td></td>").text(index + 1);
          var roomType = $("<td></td>").text(application.room.type);
          var roomCode = $("<td></td>").text(application.room.name);
          var timeDate = $("<td></td>").text(application.time.from + " - " + application.time.to + " HRS\n" + formatDate(application.date));
          var roomResult = $("<td></td>").text(application.status);

          row.append(no, roomType, roomCode, timeDate, roomResult);
          tableBody.append(row);
        });
      }

      function formatDate(dateString) {
        var date = new Date(dateString);
        var formattedDate = date.toLocaleDateString("en-US", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric"
        });
        return formattedDate;
      }
    });
