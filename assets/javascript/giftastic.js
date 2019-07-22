//Initial array of animals
var animals = ["dog", "cat", "mouse", "lion", "elephant"];

function displayAnimalInfo() {
    var animal = $(this).attr("data-name");
    var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=NU4CtgobR6DQrOPgFkEn1MAdKV6cmqN7";
    //Create ajax call for the specific animalBtn being clicked
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {
        $("#animalDisplay").empty();
        for (var i = 0; i < 10; i++) {
            console.log(response.data[i]);
            var item = response.data[i];
            //Div to hold the animal
            var animalDiv = $("<div>").addClass("animalDiv")
            //Store rating data
            var rating = item.rating;
            //Element to display the rating
            var ratingP = $("<p>").text("Rating: " + rating);
            animalDiv.append(ratingP);
            var imgURL = item.images.fixed_height_still.url;
            //create elemtn tot hol the image
            var image = $("<img>").attr("src", imgURL).addClass("animalImage");
            animalDiv.append(image);
            $("#animalDisplay").prepend(animalDiv);
        }
    });
}
function renderButtons() {
    //Make sure there are no duplicate buttons
    $("#buttonDisplay").empty();
    //Loop through animals array
    for (var i = 0; i < animals.length; i++) {
        //Dynamically generate buttons for each animal
        var a = $("<button>");
        a.addClass("animalButton");
        //Add data attribute with value of animals at index i
        a.attr("data-name", animals[i]);
        //Add text inside button
        a.text(animals[i]);
        $("#buttonDisplay").append(a);
    }
}




$(".animalImage").on("click", function () {
    console.log(state);
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }

});

//On-click function for submitBtn
$("#submitBtn").on("click", function (event) {
    //Prevents form from trying to submit itself
    event.preventDefault();
    //Get text from input
    var animalBtn = $("#animalInput").val().trim();
    //Add text from input to array
    animals.push(animalBtn);
    console.log(animals);
    renderButtons();

});


$(document).on("click", ".animalButton", displayAnimalInfo);
//Display the initial buttons
renderButtons();



