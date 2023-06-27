$(document).ready(function () {
  // Fetch rooms data from the API
  $.get("http://localhost:5000/blocks", function (data) {
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
    //clear time dropdown
    var timeDropdown = $("#inputTimeStart");
    timeDropdown.empty();
    timeDropdown.append('<option value="">Select Time Start</option>');

    var timeDropdownEnd = $("#inputTimeEnd");
    timeDropdownEnd.empty();
    timeDropdownEnd.append('<option value="">Select Time End</option>');

    if (selectedBlock && selectedRoomType) {
      // Fetch rooms data based on selected block and room type
      $.get(
        "http://localhost:5000/rooms",
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
    //clear time dropdown
    var timeDropdown = $("#inputTimeStart");
    timeDropdown.empty();
    timeDropdown.append('<option value="">Select Time Start</option>');

    var timeDropdownEnd = $("#inputTimeEnd");
    timeDropdownEnd.empty();
    timeDropdownEnd.append('<option value="">Select Time End</option>');

    if (selectedBlock && selectedRoomType) {
      // Fetch rooms data based on selected block and room type
      $.get(
        "http://localhost:5000/rooms",
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

  // Handle date selection
  $("#inputDate").change(function () {
    var selectedBlock = $("#inputBlock").val();
    var selectedRoomType = $("#inputRoomType").val();
    var selectedRoomName = $("#inputRoomName").val();
    var selectedDate = $(this).val();

    //clear time dropdown
    var timeDropdown = $("#inputTimeStart");
    timeDropdown.empty();
    timeDropdown.append('<option value="">Select Time Start</option>');

    var timeDropdownEnd = $("#inputTimeEnd");
    timeDropdownEnd.empty();
    timeDropdownEnd.append('<option value="">Select Time End</option>');

    if (selectedBlock && selectedRoomType && selectedRoomName && selectedDate) {
      // Fetch bookings data based on selected block, room type, room name, and date
      $.get(
        "http://localhost:5000/applications/available",
        {
          block: selectedBlock,
          room: selectedRoomName,
          date: selectedDate,
        },
        function (bookings) {
          //add option to time dropdown
          var timeDropdown = $("#inputTimeStart");
          timeDropdown.empty();
          timeDropdown.append('<option value="">Select Time Start</option>');
          $.each(bookings, function (index, time) {
            timeDropdown.append(
              '<option value="' + time + '">' + formatTime(time) + "</option>"
            );
          });
        }
      );
    }
  });

  // Handle time from
  $("#inputTimeStart").change(function () {
    var selectedBlock = $("#inputBlock").val();
    var selectedRoomType = $("#inputRoomType").val();
    var selectedRoomName = $("#inputRoomName").val();
    var selectedDate = $("#inputDate").val();
    var selectedTimeStart = $(this).val();

    if (
      selectedBlock &&
      selectedRoomType &&
      selectedRoomName &&
      selectedDate &&
      selectedTimeStart
    ) {
      // Fetch bookings data based on selected block, room type, room name, and date
      $.get(
        "http://localhost:5000/applications/available/period",
        {
          block: selectedBlock,
          room: selectedRoomName,
          date: selectedDate,
          time: selectedTimeStart,
        },
        function (bookings) {
          //add option to time dropdown
          var timeDropdown = $("#inputTimeEnd");
          timeDropdown.empty();
          timeDropdown.append('<option value="">Select Time End</option>');
          $.each(bookings, function (index, time) {
            timeDropdown.append(
              '<option value="' + time + '">' + formatTime(time) + "</option>"
            );
          });
        }
      );
    }
  });

  // Handle submit button click
  $("#applicationForm").submit(function (event) {
    // Prevent the form from submitting via the browser.
    event.preventDefault();
    var selectedBlock = $("#inputBlock").val();
    var selectedRoomType = $("#inputRoomType").val();
    var selectedRoomName = $("#inputRoomName").val();
    var selectedDate = $("#inputDate").val();
    var selectedTimeStart = $("#inputTimeStart").val();
    var selectedTimeEnd = $("#inputTimeEnd").val();
    var inputName = $("#inputName").val();
    var inputPhone = $("#inputPhone").val();

    if (
      selectedBlock &&
      selectedRoomType &&
      selectedRoomName &&
      selectedDate &&
      selectedTimeStart &&
      selectedTimeEnd &&
      inputName &&
      inputPhone
    ) {
      // Fetch bookings data based on selected block, room type, room name, and date
      $.post(
        "http://localhost:5000/applications",
        {
          block: selectedBlock,
          room: selectedRoomName,
          date: selectedDate,
          timeStart: selectedTimeStart,
          timeEnd: selectedTimeEnd,
          name: inputName,
          phone: inputPhone,
        },
        function (response) {
          console.log(response.status);
          if (response.status === "success") {
            alert("Booking successful!");
            location.reload();
          } else {
            alert("Booking failed!");
          }
        }
      );
    } else {
      alert("Please fill in all fields!");
    }
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
