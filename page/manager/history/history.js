$(document).ready(function () {
  // Fetch rooms data from the API
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

  // Handle room type selection
  $("#inputRoomType").change(function () {
    var selectedBlock = $("#inputBlock").val();
    var selectedRoomType = $(this).val();

    if (selectedBlock && selectedRoomType) {
      // Fetch rooms data based on selected block and room type
      $.get(
        "https://spacebooking.onrender.com/rooms",
        { block: selectedBlock, type: selectedRoomType },
        function (rooms) {
          // Populate the room name dropdown
          var roomNameDropdown = $("#inputRoomName");
          roomNameDropdown.empty();
          roomNameDropdown.append('<option value="">Select Room Name</option>');
          $.each(rooms, function (index, room) {
            roomNameDropdown.append(
              '<option value="' + room._id + '">' + room.name + "</option>"
            );
          });

          // Clear the booking table
          $("#bookingTable").hide();
        }
      );
    }
  });

  // Handle block selection
  $("#inputBlock").change(function () {
    var selectedBlock = $(this).val();
    var selectedRoomType = $("#inputRoomType").val();

    if (selectedBlock && selectedRoomType) {
      // Fetch rooms data based on selected block and room type
      $.get(
        "https://spacebooking.onrender.com/rooms",
        { block: selectedBlock, type: selectedRoomType },
        function (rooms) {
          // Populate the room name dropdown
          var roomNameDropdown = $("#inputRoomName");
          roomNameDropdown.empty();
          roomNameDropdown.append('<option value="">Select Room Name</option>');
          $.each(rooms, function (index, room) {
            roomNameDropdown.append(
              '<option value="' + room._id + '">' + room.name + "</option>"
            );
          });

          // Clear the booking table
          $("#bookingTable").hide();
        }
      );
    }
  });

  // Handle form submission
  $("#searchForm").submit(function (event) {
    event.preventDefault();
    var selectedBlock = $("#inputBlock").val();
    var selectedRoomType = $("#inputRoomType").val();
    var selectedRoomName = $("#inputRoomName").val();

    if (selectedBlock && selectedRoomType && selectedRoomName) {
      // Fetch application data based on selected block, room type, and room name
      $.get(
        "https://spacebooking.onrender.com/applications/history",
        {
          block: selectedBlock,
          type: selectedRoomType,
          room: selectedRoomName,
        },
        function (applications) {
          if (applications.length > 0) {
            // Display the booking table
            $("#bookingTable").show();
            $("#noBookingMessage").hide();

            // Populate the booking table with application data
            var bookingTableBody = $("#bookingTable tbody");
            bookingTableBody.empty();
            $.each(applications, function (index, application) {
              var row = $("<tr>");
              row.append($("<th>").text(index + 1));
              row.append($("<td>").text(application.name));
              row.append($("<td>").text(application.phone));
              var date = new Date(application.date);
              var formattedDate =
                ("0" + date.getDate()).slice(-2) +
                "/" +
                ("0" + (date.getMonth() + 1)).slice(-2) +
                "/" +
                date.getFullYear();
              row.append($("<td>").text(formattedDate));

              // Format the time as AM/PM
              var startTime = formatTime(application.time.from);
              var endTime = formatTime(application.time.to);
              var formattedTime = startTime + " - " + endTime;
              row.append($("<td>").text(formattedTime));

              row.append($("<td>").text(application.status));

              bookingTableBody.append(row);
            });
          } else {
            // Display "No history found" message
            $("#bookingTable").hide();
            $("#noBookingMessage").show();
          }
        }
      );
    } else {
      alert("Please select a block, room type, and room name");
    }
  });

  //handle room name selection
  $("#inputRoomName").change(function () {
    $("#bookingTable").hide();
    $("#noBookingMessage").hide();
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
