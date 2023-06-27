$(document).ready(function () {
  // Fetch blocks data from the API
  $.get("https://spacebooking.onrender.com/blocks", function (data) {
    // Populate the block dropdown
    var blockDropdown = $("#inputBlock");
    blockDropdown.empty();
    blockDropdown.append('<option value="">Select Block</option>');
    $.each(data, function (index, block) {
      blockDropdown.append(
        '<option value="' + block._id + '">' + block.name + "</option>"
      );
    });
  });

  // Fetch rooms data from the API into table
  $.get("https://spacebooking.onrender.com/rooms", function (data) {
    // Populate the room table
    var roomTableBody = $("#roomTable tbody");
    roomTableBody.empty();
    $.each(data, function (index, room) {
      var row = $("<tr>");
      row.append($("<th>").text(index + 1));
      row.append($("<td>").text(room.name));
      row.append($("<td>").text(room.type));
      row.append($("<td>").text(room.block.name));
      row.append(
        $("<td>").append(
          $("<button>")
            .addClass("btn btn-danger btn-sm delete")
            .attr("data-id", room._id)
            .text("Delete")
        )
      );
      roomTableBody.append(row);
    });
  });

  // Handle add room button
  $("#addRoom").click(function (event) {
    event.preventDefault();
    var roomName = $("#inputRoomName").val();
    var roomType = $("#inputRoomType").val();
    var block = $("#inputBlock").val();
    if (roomName && roomType && block) {
      $.post(
        "https://spacebooking.onrender.com/rooms",
        { name: roomName, type: roomType, block: block },
        function (data) {
          // append the new room to the room table
          var roomTableBody = $("#roomTable tbody");
          var row = $("<tr>");
          row.append($("<th>").text(roomTableBody.children().length + 1));
          row.append($("<td>").text(data.name));
          row.append($("<td>").text(data.type));
          row.append($("<td>").text(data.block.name));
          row.append(
            $("<td>").append(
              $("<button>")
                .addClass("btn btn-danger btn-sm delete")
                .attr("data-id", data._id)
                .text("Delete")
            )
          );
          roomTableBody.append(row);

          // Handle the success response
          var alertDiv = createAlert("success", "Room added successfully.");

          $("#liveAlertPlaceholder").empty().append(alertDiv);

          // Close the alert after 3 seconds
          setTimeout(function () {
            alertDiv.alert("close");
          }, 3000);
        }
      );
    }
  });

  // Handle delete room button
  $("#roomTable").on("click", ".delete", function () {
    var deleteButton = $(this);
    var roomId = deleteButton.attr("data-id");
    $.ajax({
      url: "https://spacebooking.onrender.com/rooms/" + roomId,
      type: "DELETE",
      success: function () {
        // Remove the row from the table using the room ID as the identifier
        deleteButton.closest("tr").remove();

        // Handle the success response
        var alertDiv = createAlert("success", "Room deleted successfully.");

        $("#liveAlertPlaceholder").empty().append(alertDiv);

        // Close the alert after 3 seconds
        setTimeout(function () {
          alertDiv.alert("close");
        }, 3000);
      },
      error: function () {
        // Handle the error response
        var alertDiv = createAlert("danger", "Failed to delete room.");

        $("#liveAlertPlaceholder").empty().append(alertDiv);

        // Close the alert after 3 seconds
        setTimeout(function () {
          alertDiv.alert("close");
        }, 3000);
      },
    });
  });

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
});
