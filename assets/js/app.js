   // Initialize Firebase
   var config = {
    apiKey: "AIzaSyAcJPRDhWmbq91zIF28c2ihBiCRQfXOepY",
    authDomain: "astrology-calendar.firebaseapp.com",
    databaseURL: "https://astrology-calendar.firebaseio.com",
    projectId: "astrology-calendar",
    storageBucket: "astrology-calendar.appspot.com",
    messagingSenderId: "64338624046"
};


firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

// Initial Values
var planet = "";
var sign = "";
var position = "";
var frequency = "";

// Capture Button Click
$("#add-user").on("click", function(event) {
  event.preventDefault();

  // Grabbed values from text boxes
  planet = $("#planet").val().trim();
  sign = $("#sign").val().trim();
  position = $("#position").val().trim();
  frequency = $("#frequency").val().trim();

  // Code for handling the push
  database.ref().push({
    planet: planet,
    sign: sign,
    position: position,
    frequency: frequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });

});

// Firebase watcher .on("child_added"
database.ref().on("child_added", function(snapshot) {
  // storing the snapshot.val() in a variable for convenience
  var sv = snapshot.val();

  // Console.loging the last user's data
  console.log(sv.planet);
  console.log(sv.sign);
  console.log(sv.position);
  console.log(sv.frequency);

  // Change the HTML to reflect
  $("#planet-display").text(sv.name);
  $("#sign-display").text(sv.email);
  $("#position-display").text(sv.age);
  $("#frequency-display").text(sv.comment);

  // Handle the errors
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});

$("#add-transit-btn").on("click", function(event){
    event.preventDefault();

    planet = $("#planet-input").val().trim();
    sign = $("#sign-input").val().trim();
    position = $("#position-input").val().trim();
    frequency = $("#frequency-input").val().trim();

    database.ref().push({
      planet: planet,
      sign: sign,
      position: position,
      frequency: frequency,
    });
  });
  
  database.ref().on("child_added", function(childSnapshot){

    var currentPlanetPosition = childSnapshot.val().firstPlanetPosition;
    var timeFormat = "YY:dd";
    var convertedTime = moment(currentPlanetPosition, timeFormat);
    var displayedTime = moment(convertedTime).format("YY:dd");

    var frequencyRate = childSnapshot.val().frequency;

    var firstTimeConverted = moment(currentPlanetPosition, "YY:dd").subtract(1, "years");
    var diffTime = moment().diff(moment(firstTimeConverted), "days");
    var tRemainder = diffTime % frequencyRate;
    var tDaysTillTransit = frequencyRate - tRemainder;
  })

  $("#Transit-Schedule").append("<h2> </h2> " + childSnapshot.val.planet)
  $("#Transit-Schedule").append("<h2> </h2> " + childSnapshot.val.sign)
  $("#Transit-Schedule").append("<h2> </h2> " + childSnapshot.val.position)
  $("#Transit-Schedule").append("<h2> </h2> " + childSnapshot.val.frequency)