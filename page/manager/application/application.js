$(document).ready(function () {
  var bookingTable = $("#bookingTable");
  var noBookingMessage = $("#noBookingMessage");

  $.get("http://localhost:5000/applications/", function (data) {
    if (data.length > 0) {
      populateTable(data);
    } else {
      showNoBookingMessage();
    }
  });

  function populateTable(data) {
    bookingTable.show();

    var tbody = bookingTable.find("tbody");
    tbody.empty();

    $.each(data, function (index, booking) {
      var row = $("<tr>");
      row.attr("data-booking-id", booking._id);
      row.append($("<th>").text(index + 1));
      row.append($("<td>").text(booking.name));
      row.append($("<td>").text(booking.phone));
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

      var actionColumn = $("<td>");
      var approveButton = $("<button>")
        .text("Approve")
        .addClass("btn btn-success btn-sm")
        .click(function () {
          updateBookingStatus(booking._id, "Approved");
        });
      var rejectButton = $("<button>")
        .text("Reject")
        .addClass("btn btn-danger btn-sm")
        .click(function () {
          updateBookingStatus(booking._id, "Rejected");
        });

      actionColumn.append(approveButton);
      actionColumn.append(rejectButton);
      row.append(actionColumn);

      tbody.append(row);
    });
  }

  function updateBookingStatus(bookingId, status) {
    var url = "http://localhost:5000/applications/" + bookingId;
    var data = { status: status };

    $.ajax({
      url: url,
      type: "PATCH",
      data: data,
      success: function () {
        // Handle the success response
        console.log("Booking status updated successfully.");

        var row = $("#bookingTable tbody").find(
          'tr[data-booking-id="' + bookingId + '"]'
        );
        row.remove();
      },
      error: function () {
        // Handle the error response
        console.error("Failed to update booking status.");
      },
    });
  }

  function updateBookingStatus(bookingId, status) {
    var url = "http://localhost:5000/applications/" + bookingId;
    var data = { status: status };

    $.ajax({
      url: url,
      type: "PATCH",
      data: data,
      success: function () {
        // Handle the success response
        var alertDiv = createAlert(
          "success",
          "Booking status updated successfully."
        );

        $("#liveAlertPlaceholder").empty().append(alertDiv);

        // Close the alert after 3 seconds
        setTimeout(function () {
          alertDiv.alert("close");
        }, 3000);

        // Remove the row from the table using the booking ID as the identifier
        var row = $("#bookingTable tbody").find(
          'tr[data-booking-id="' + bookingId + '"]'
        );
        row.remove();
      },
      error: function () {
        // Handle the error response
        var alertDiv = createAlert(
          "danger",
          "Failed to update booking status."
        );

        $("#liveAlertPlaceholder").empty().append(alertDiv);

        // Close the alert after 3 seconds
        setTimeout(function () {
          alertDiv.alert("close");
        }, 3000);
      },
    });
  }

  function createAlert(type, message) {
    var alertDiv = $("<div>").addClass(
      "alert alert-dismissible fade show alert-" + type
    );
    var closeButton = $("<button>")
      .addClass("btn-close")
      .attr("type", "button")
      .attr("data-bs-dismiss", "alert");

    alertDiv.text(message);
    alertDiv.append(closeButton);

    return alertDiv;
  }

  function showNoBookingMessage() {
    noBookingMessage.show();
  }

  // Function to format the time as AM/PM
  function formatTime(time) {
    var hour = parseInt(time.substring(0, 2));
    var minute = time.substring(2);
    var period = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return ("0" + hour).slice(-2) + ":" + minute + " " + period;
  }
});
