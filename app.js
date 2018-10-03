// Initialize Firebase
var config = {
    apiKey: "AIzaSyBYrNQRs0mTi81lDbhOEcZeUL_tGVcgb48",
    authDomain: "train-scheduler-fdf93.firebaseapp.com",
    databaseURL: "https://train-scheduler-fdf93.firebaseio.com",
    projectId: "train-scheduler-fdf93",
    storageBucket: "",
    messagingSenderId: "560177489721"
};
firebase.initializeApp(config);

var database = firebase.database();
var trainName;
var destination;
var frequency;
var firstTrainTime;
// var nextArrival;
var minutesAway;
var now = moment().format("HHMM");

$("#submit-button").on("click", function () {
    event.preventDefault();
    trainName = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    frequency = $("#frequency").val().trim();
    firstTrainTime = $("#firstTrainTime").val().trim();
    // nextArrival = $("#nextArrival").val().trim();
    database.ref().push({
        firebaseTrain: trainName,
        firebasedestination: destination,
        firebaseFrequency: frequency,
        firebaseFirstTrainTime: firstTrainTime
        // firebaseNextArrival: nextArrival
    });
});

function display(data) {
    var newFirstTrainTimeMilitary = parseInt(data.val().firebaseFirstTrainTime);
    var newFreq = parseInt(data.val().firebaseFrequency);
    var newKey = data.key;
    var newRow = $("<tr>");
    var newTrainName = $("<td>").text(data.val().firebaseTrain.toUpperCase());
    var newdestination = $("<td>").text(data.val().firebasedestination.toUpperCase());
    var newFrequency = $("<td>").text(data.val().firebaseFrequency);
    var newNextArrival;
    // console.log(typeof newFirstTrainTimeMilitary);
    // console.log(typeof newFreq);
    // console.log(data.val().firebaseFirstTrainTime+" "+now);
    if (newFirstTrainTimeMilitary <= now) {
        do {
            newFirstTrainTimeMilitary = newFirstTrainTimeMilitary + newFreq;
            console.log(newFirstTrainTimeMilitary);
            console.log("Now: " + now);
        }
        while (newFirstTrainTimeMilitary <= now);
    }
    // else {

    // }
    var minutesAway = $("<td>").text(newFirstTrainTimeMilitary - now);
    var newFirstTrainTime = $("<td>").text(newFirstTrainTimeMilitary);
    // var newMinutesAway = $("<td>").text();
    var deleteButton = $("<button>").text("Delete");
    deleteButton.addClass("btn btn-danger mb-2 my-2 delete-button");
    // newStartDate.addClass("true");
    newRow.append(newTrainName, newdestination, newFrequency, newFirstTrainTime, minutesAway, deleteButton);
    $("td").attr("contenteditable", "true");
    deleteButton.attr("data-key", newKey);
    newRow.attr("id", newKey);
    $("tbody").append(newRow);
    // editData();
}

database.ref().on("child_added", function (data) {
    display(data);
});


$(document).on("click", ".delete-button", function () {
    var thisKey = $(this).attr("data-key");
    database.ref().child(thisKey).remove();
    $("#" + thisKey).remove();
});

// function editData() {
//     var spans = document.getElementsByTagName("td"),
//         index,
//         span;

//     for (index = 0; index < spans.length; ++index) {
//         span = spans[index];
//         if (span.contentEditable) {
//             span.onblur = function () {
//                 var text = this.innerHTML;
//                 text = text.replace(/&/g, "&amp").replace(/</g, "&lt;");
//                 console.log("Content committed, span " +
//                     (this.id || "anonymous") +
//                     ": '" +
//                     text + "'");
//             };
//         }
//     }
// }