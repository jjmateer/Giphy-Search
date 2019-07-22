//Initial array of animals
var animals = ["dog", "cat", "mouse", "lion", "elephant"];

function displayAnimalInfo() {
    var animal = $(this).attr("data-name");
    var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=NU4CtgobR6DQrOPgFkEn1MAdKV6cmqN7";
    //Create ajax call for the specific animalBtn being clicked
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).done(function (response) {
        $("#animalDisplay").empty();
        for (var i = 0; i < 10; i++) {
            var animalDiv = $("<div>").addClass("animalDiv")
            console.log(response.data[i]);
            var results = response.data[i];
            //Get the rating and append it to the screen with the divs
            var rating = results.rating;
            var ratingP = $("<p>").text("Rating: " + results.rating);
            animalDiv.append(ratingP);
            //variable that dynamically creates an image element 
            var image = $("<img>");
            //variable with the source of an animated gif
            var imgAnimate = results.images.fixed_height.url;
            //variable with the source of a static gif
            var imgStill = results.images.fixed_height_still.url;
            
            //Add attributes that can be used in the if else statements to start
            //and stop the gifs.
            image.addClass("animalImage");
            image.attr("src", imgStill);
            image.attr("data-state", "still");
            image.attr("data-still", imgStill);
            image.attr("data-animate", imgAnimate);
            //Append the image to the animal div and prepend animalDiv to #animalDisplay
            animalDiv.append(image);
            $("#animalDisplay").prepend(animalDiv);

        }
    });
}
    //If else statements to determine if the gif is animated or still and
    //change it to the opposite attribute.
    function startStopGif() {
        console.log(state);
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");

        }
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

    //Event listener for animalButton to display the gifs and rating to the page.
    $(document).on("click", ".animalButton", displayAnimalInfo);
    //Event listener for animalImage to start or stop the gif on click.
    $(document).on('click', ".animalImage", startStopGif);
    //Display the initial buttons
    renderButtons();



