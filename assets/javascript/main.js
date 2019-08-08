// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
// Your web app's Firebase configuration
// <!-- The core Firebase JS SDK is always required and must be listed first -->


// <!-- TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#config-web-app -->


  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDJ2mUvHGOYNpw4eBoVKIo5UroUAaQ5vB8",
    authDomain: "choo-choo-schedule-b2a93.firebaseapp.com",
    databaseURL: "https://choo-choo-schedule-b2a93.firebaseio.com",
    projectId: "choo-choo-schedule-b2a93",
    storageBucket: "",
    messagingSenderId: "343938144640",
    appId: "1:343938144640:web:345d72375f71ea9b"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();
  
  // 2. Button for adding Trains
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();

console.log("test");

    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrain = moment($("#first-train-input").val().trim(), "MM/DD/YYYY");
    var frequency = $("#frequency-input").val().trim();


    /* A reference to check back on what the original variables were
    var empName = $("#employee-name-input").val().trim();
    var empRole = $("#destination-input").val().trim();
    var empStart = moment($("#start-input").val().trim(), "MM/DD/YYYY");
    var empRate = $("#rate-input").val().trim();
  */
  
    // Creates local "temporary" object for holding train data
    var newTrain = {
      name: trainName,
      dest: destination,
      first: firstTrain._i,
      freq: frequency
    };
    
    console.log(newTrain);

    // Uploads employee data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.dest);
    console.log(newTrain.first);
    console.log(newTrain.freq);
  
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
  });

  console.log(event);
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().dest;
    var firstTrain = childSnapshot.val().first;
    var frequency = childSnapshot.val().freq;
  
    // Train Info
    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);
  
    var tFrequency = frequency;

    // Time is 3:30 AM
    var firstTime = firstTrain;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    var firstTimeConverted = moment(firstTime, "HH:mm");
    console.log(firstTimeConverted);

    // // Current Time
    var currentTime = moment();
    // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // console.log("DIFFERENCE IN TIME: " + diffTime);

    // // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    // console.log(tRemainder);

    // // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format('h:mm a');
    // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


    // Prettify the train start
    var firstTrainPretty = moment(firstTrain).format("MM/DD/YYYY");
  
    // Calculate the months worked using hardcore math
    // To calculate the months worked
    var empMonths = moment().diff(moment(firstTrain), "months");
    console.log(empMonths);
  
    // Calculate the total billed rate
    var empBilled = empMonths * frequency;
    console.log(empBilled);
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(frequency),
      $("<td>").text(nextTrain),
      $("<td>").text(tMinutesTillTrain),
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });
  
  // Example Time Math
  // -----------------------------------------------------------------------------
  // Assume Employee start date of January 1, 2015
  // Assume current date is March 1, 2016
  
  // We know that this is 15 months.
  // Now we will create code in moment.js to confirm that any attempt we use meets this test case
  