$(document).ready(function () {
  // Handle form submission
  $("#searchForm").submit(function (event) {
    event.preventDefault();
    var inputPhone = $("#inputPhone").val();

    if (inputPhone) {
      // Fetch application data based on selected block, room type, and room name
      $.get(
        "https://spacebooking.onrender.com/applications/history/" + inputPhone,
        function (applications) {
          const { pastApplications, upcomingApplications } = applications;

          // Populate the past application table
          if (pastApplications.length > 0) {
            $("#historyTable").show();
            $("#noHistoryMessage").hide();
            $("#historyTitle").show();
            $("#historyTable tbody").empty();
            $.each(pastApplications, function (index, application) {
              var row = $("<tr>");
              row.append($("<th>").text(index + 1));
              row.append($("<td>").text(application.room.name));
              row.append($("<td>").text(application.room.type));
              row.append($("<td>").text(application.room.block.name));
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

              $("#historyTable tbody").append(row);
            });
          } else {
            $("#historyTable").hide();
            $("#noHistoryMessage").show();
            $("#historyTitle").show();
          }

          // Populate the upcoming application table
          if (upcomingApplications.length > 0) {
            $("#upcomingTable").show();
            $("#upcomingTitle").show();
            $("#noUpcomingMessage").hide();
            $("#upcomingTable tbody").empty();
            $.each(upcomingApplications, function (index, application) {
              var row = $("<tr>");
              row.append($("<th>").text(index + 1));
              row.append($("<td>").text(application.room.name));
              row.append($("<td>").text(application.room.type));
              row.append($("<td>").text(application.room.block.name));
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

              $("#upcomingTable tbody").append(row);
            });
          } else {
            $("#upcomingTable").hide();
            $("#upcomingTitle").show();
            $("#noUpcomingMessage").show();
          }
        }
      );
    } else {
      alert("Please enter phone number");
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
