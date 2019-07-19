//Initial array of animals
var animals = ["dog", "cat", "mouse", "lion", "elephant"];

function renderButtons() {
    //Make sure there are no duplicate buttons
    $("#buttonDisplay").empty();
    //Loop through animals array
    for (var i = 0; i < animals.length; i++) {
        //Dynamically generate buttons for each animal
        var animalButton = $("<button>");
        animalButton.addClass("animal");
        //Add data attribute with value of animals at index i
        animalButton.attr("data-name", animals[i]);
        //Add text inside button
        animalButton.text(animals[i]);
        $("#buttonDisplay").append(animalButton)
    }
}

//On-click function for submitBtn
$("#submitBtn").on("click", function (event) {
    //Prevents form from trying to submit itself
    event.preventDefault();
    //Get text from input
    var animal = $("#animalInput").val().trim();
    //Add text from input to array
    animals.push(animal);
    console.log(animals);
    renderButtons();
});
renderButtons();



