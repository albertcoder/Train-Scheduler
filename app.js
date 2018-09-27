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
    })
})

function display(data) {
    var newKey = data.key;
    var newRow = $("<tr>");
    var newTrainName = $("<td>").text(data.val().firebaseTrain);
    var newdestination = $("<td>").text(data.val().firebasedestination);
    var newFrequency = $("<td>").text(data.val().firebaseFrequency);
    var newFirstTrainTime = $("<td>").text(data.val().firebaseFirstTrainTime);
    var newNextArrival;
    // console.log(data.val().firebaseFirstTrainTime+" "+now);
    while(data.val().firebaseFirstTrainTime < now) {
        newFirstTrainTime = newFirstTrainTime + newFrequency;
        console.log(newFirstTrainTime);
    };
    // var newMinutesAway = $("<td>").text();
    var deleteButton = $("<button>").text("Delete");
    deleteButton.addClass("my-2 delete-button");
    // newStartDate.addClass("true");
    newRow.append(newTrainName, newdestination, newFrequency, newFrequency, newFrequency, deleteButton);
    $("td").attr("contenteditable", "true");
    deleteButton.attr("data-key", newKey);
    newRow.attr("id", newKey);
    $("tbody").append(newRow);
    // editData();
}

database.ref().on("child_added", function (data) {
    display(data);
})


$(document).on("click", ".delete-button", function () {
    var thisKey = $(this).attr("data-key");
    database.ref().child(thisKey).remove();
    $("#" + thisKey).remove();
})

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
