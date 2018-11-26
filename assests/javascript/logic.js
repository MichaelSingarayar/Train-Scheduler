$(document).ready(function () {



// Initialize Firebase
var config = {
    apiKey: "AIzaSyD2l-_eERXFGilVhuMNwQAr5FEuFofFLD4",
    authDomain: "train-scheduler-df427.firebaseapp.com",
    databaseURL: "https://train-scheduler-df427.firebaseio.com",
    projectId: "train-scheduler-df427",
    storageBucket: "train-scheduler-df427.appspot.com",
    messagingSenderId: "885064490873"
  };
  

firebase.initializeApp(config);

var database = firebase.database();


$("#add-train-btn").on("click", function(event) {
    event.preventDefault();
    
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#train-destination-input").val().trim();
    var trainTime = moment($("#start-input").val().trim(), "HH:mm").format("X");
    var trainFreq = $("#frequency-input").val();
   
    var newTrain = {
        name: trainName,
        destination: trainDest,
        time: trainTime,
        frequency: trainFreq,
        dateAdded:firebase.database.ServerValue.TIMESTAMP

    };
    
    database.ref().push(newTrain);
    
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);
    
    
    $("#train-name-input").val("");
    $("#train-destination-input").val("");
    $("#start-input").val("");
    $("#frequency-input").val("");
});

database.ref().orderByChild("dateAdded").on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
    
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var trainFreq = childSnapshot.val().frequency;
    
    console.log(trainName);
    console.log(trainDest);
    console.log(trainTime);
    console.log(trainFreq);
    
    var timeConverted = moment(trainTime, "hh:mm").subtract(1, "years");
    console.log(timeConverted);
    
    

    
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    
    var diffTime = moment().diff(moment(timeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    
    var tRemainder = diffTime % trainFreq;
    console.log(tRemainder);

    
    var tMinutesTillTrain = trainFreq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
        trainFreq + "</td><td>" + moment(nextTrain).format("hh:mm A") + "</td><td>" + tMinutesTillTrain + "</td><td>");
});


});