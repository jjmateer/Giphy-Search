//Initial array of animals
var animals = ["dog", "cat", "mouse", "lion", "elephant"];

function displayAnimalInfo() {
    var animal = $(this).attr("data-name");
    var queryUrl= "http://api.giphy.com/v1/gifs/search?" + animal + "&api_key=NU4CtgobR6DQrOPgFkEn1MAdKV6cmqN7";
    //Create ajax call for the specific animalBtn being clicked
    $.ajax({
        url:queryUrl,
        method:"GET"
    }).then(function(response) {
        //Div to hold the animal
        var animalDiv = $("<div class='animalDiv'>")
        //Store rating data
        var rating = response.Rated;
        //Element to display the rating
        var ratingP = $("<p>").text("Rating: " + rating);
        animalDiv.append(ratingP);
        var imgURL = response.Poster;
        //create elemtn tot hol the image
        var image = $("<img>").attr("src", imgURL);
        animalDiv.append(image);
        $("#animalDisplay").prepend(animalDiv);
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



