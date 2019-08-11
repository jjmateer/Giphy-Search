//Initial array of gifs
var gifs = ["skyscraper", "car", "ocean", "lion", "elephant"];

function displaygifInfo() {
    var gif = $(this).attr("data-name");
    var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" +
        gif + "&api_key=NU4CtgobR6DQrOPgFkEn1MAdKV6cmqN7";
    //Create ajax call for the specific gifBtn being clicked
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).done(function (response) {
        $("#gifDisplay").empty();
        for (var i = 0; i < 25; i++) {
            var gifDiv = $("<div>").addClass("gifDiv")
            console.log(response.data[i]);
            var results = response.data[i];
            //Get the rating and append it to the screen with the divs
            var rating = results.rating;
            var ratingP = $("<p class='ratingP'>").text("Rating: " + results.rating);
            gifDiv.append(ratingP);
            //variable that dynamically creates an image element 
            var image = $("<img>");
            //variable with the source of an animated gif
            var imgAnimate = results.images.fixed_height.url;
            //variable with the source of a static gif
            var imgStill = results.images.fixed_height_still.url;
            
            //Add attributes that can be used in the if else statements to start
            //and stop the gifs.
            image.addClass("gifImage");
            image.attr("src", imgStill);
            image.attr("data-state", "still");
            image.attr("data-still", imgStill);
            image.attr("data-animate", imgAnimate);
            //Append the image to the gif div and prepend gifDiv to #gifDisplay
            gifDiv.append(image);
            $("#gifDisplay").prepend(gifDiv);

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
        //Loop through gifs array
        for (var i = 0; i < gifs.length; i++) {
            //Dynamically generate buttons for each gif
            var a = $("<button>");
            a.addClass("gifButton");
            //Add data attribute with value of gifs at index i
            a.attr("data-name", gifs[i]);
            //Add text inside button
            a.text(gifs[i]);
            $("#buttonDisplay").append(a);

        }
    }


    //On-click function for submitBtn
    $("#submitBtn").on("click", function (event) {
        //Prevents form from trying to submit itself
        event.preventDefault();
        //Get text from input
        var gifBtn = $("#gifInput").val().trim();
        //Add text from input to array
        gifs.push(gifBtn);
        console.log(gifs);
        renderButtons();

    });

    //Event listener for gifButton to display the gifs and rating to the page.
    $(document).on("click", ".gifButton", displaygifInfo);
    //Event listener for gifImage to start or stop the gif on click.
    $(document).on('click', ".gifImage", startStopGif);
    //Display the initial buttons
    renderButtons();



