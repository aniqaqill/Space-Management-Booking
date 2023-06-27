$(document).ready(function () {
  // Fetch rooms data from the API
  $.get("https://spacebooking.onrender.com/blocks", function (data) {
    // Populate the block table

    var blockTableBody = $("#blockTable tbody");
    blockTableBody.empty();

    $.each(data, function (index, block) {
      var row = $("<tr>");
      row.append($("<th>").text(index + 1));
      row.append($("<td>").text(block.name));
      row.append(
        $("<td>").append(
          $("<button>")
            .addClass("btn btn-danger btn-sm delete")
            .attr("data-id", block._id)
            .text("Delete")
        )
      );
      blockTableBody.append(row);
    });
  });

  // Handle add block button
  $("#addBlock").submit(function (event) {
    event.preventDefault();
    var blockName = $("#inputBlock").val();
    if (blockName) {
      $.post(
        "https://spacebooking.onrender.com/blocks",
        { name: blockName },
        function (data) {
          // append the new block to the block table
          var blockTableBody = $("#blockTable tbody");
          var row = $("<tr>");
          row.append($("<th>").text(blockTableBody.children().length + 1));
          row.append($("<td>").text(data.name));
          row.append(
            $("<td>").append(
              $("<button>")
                .addClass("btn btn-danger btn-sm delete")
                .attr("data-id", data._id)
                .text("Delete")
            )
          );

          blockTableBody.append(row);

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
        }
      );
    }
  });

  // Handle delete block button
  $("#blockTable").on("click", ".delete", function () {
    var deleteButton = $(this);
    var blockId = $(this).attr("data-id");
    var url = "https://spacebooking.onrender.com/blocks/" + blockId;

    $.ajax({
      url: url,
      type: "DELETE",
      success: function () {
        // Remove the row from the table using the booking ID as the identifier
        deleteButton.closest("tr").remove();

        // Handle the success response
        var alertDiv = createAlert("success", "Block deleted successfully.");

        $("#liveAlertPlaceholder").empty().append(alertDiv);

        // Close the alert after 3 seconds
        setTimeout(function () {
          alertDiv.alert("close");
        }, 3000);
      },
      error: function () {
        // Handle the error response
        var alertDiv = createAlert("danger", "Failed to delete block.");

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
