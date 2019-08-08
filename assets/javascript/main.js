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
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    console.log("test");

    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrain = moment($("#first-train-input").val().trim(), "MM/DD/YYYY");
    var frequency = $("#frequency-input").val().trim();

    // Creates local temporary object for holding train data
    var newTrain = {
        name: trainName,
        dest: destination,
        first: firstTrain._i,
        freq: frequency
    };

    console.log(newTrain);

    // Uploads Train data to the database
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

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
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


    // // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // console.log("DIFFERENCE IN TIME: " + diffTime);

    // // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    // console.log(tRemainder);

    // // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // // Time the next train arrives
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format('h:mm a');

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