$(document).ready(function () {
  // Handle form submit event
  $("#searchForm").submit(function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the input value
    var phoneNumber = $("#inputPhone").val();

    // Make the AJAX request
    $.get(
      "http://localhost:5000/applications/history/" + phoneNumber,
      function (data) {
        // Clear existing table rows
        $("#bookingTable tbody").empty();

        // Check if data is empty
        if (data.length === 0) {
          $("#bookingTable").hide();
          $("#noBookingMessage").show();
        } else {
          // Iterate over each booking and add a row to the table
          $.each(data, function (index, booking) {
            var row = $("<tr>");
            row.append($("<th>").text(index + 1));
            row.append($("<td>").text(booking.room.type));
            row.append($("<td>").text(booking.room.name));

            // Format the date as DD/MM/YYYY
            var date = new Date(booking.date);
            var formattedDate =
              ("0" + date.getDate()).slice(-2) +
              "/" +
              ("0" + (date.getMonth() + 1)).slice(-2) +
              "/" +
              date.getFullYear();
            row.append($("<td>").text(formattedDate));

            // Format the time as AM/PM
            var startTime = formatTime(booking.time.from);
            var endTime = formatTime(booking.time.to);
            var formattedTime = startTime + " - " + endTime;
            row.append($("<td>").text(formattedTime));

            row.append($("<td>").text(booking.status));
            $("#bookingTable tbody").append(row);
          });

          $("#bookingTable").show();
          $("#noBookingMessage").hide();
        }
      }
    ).fail(function (error) {
      console.error("Error:", error);
    });
  });

  // Function to format the time as AM/PM
  function formatTime(time) {
    var hour = parseInt(time.substring(0, 2));
    var minute = time.substring(2);
    var period = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return ("0" + hour).slice(-2) + ":" + minute + " " + period;
  }
});
