
var topicArray = ["hurricane", "thunderstorm", "tornado", "hail"];

function renderButtons() {

    // Deletes the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#display-buttons").empty();

    // Loops through the array of movies
    for (var i = 0; i < topicArray.length; i++) {

      // Then dynamicaly generates buttons for each movie in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var newButton = $("<button>");
      // Adds a class of movie to our button
      newButton.addClass("btn btn-info my-2 my-sm-0 search-gif");
      // Added a data-attribute
      newButton.attr("data-search-term", topicArray[i]);
      // Provided the initial button text
      newButton.text(topicArray[i]);
      // Added the button to the buttons-view div
      $("#display-buttons").append(newButton);
    }
}

function renderGifs() {
    

    // sets the address for the api the ajax function will call

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + $(this).attr("data-search-term") + "&api_key=OhZrjm8gM81S7sDkbDCRchGPqr2WVCpc&limit=10" ;
    

    // sends a get request to the api
    $.ajax({
        url: queryURL,
        method: "GET"
    })

    // collects the response from the api while the rest of code runs
        .then(function(response) {

        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            gifDiv = $("<div>");
            gifDiv.addClass("rounded float-left mr-3 mb-3");
            p = $("<p>");
            p.text("rating: " + results[i].rating);
            gifImage=$("<img>");
            gifImage.attr("src", results[i].images.fixed_height_still.url);
            gifImage.attr("data-still", results[i].images.fixed_height_still.url);
            gifImage.attr("data-animate", results[i].images.fixed_height.url);
            gifImage.attr("data-state", "still");
            gifImage.addClass("gif-result");
            gifDiv.append(gifImage);
            gifDiv.append(p);
            $("#display-gif").prepend(gifDiv);
        }
    })
}

function changeState() {

    var state = $(this).attr("data-state");
    if (state === "still") {
        var animateURL=$(this).attr("data-animate")
        $(this).attr("src", animateURL);
        $(this).attr("data-state", "animate");
      } else if (state==="animate") {
        stillURL = $(this).attr("data-still");
        $(this).attr("src", stillURL);
        $(this).attr("data-state", "still");

      }
}
      


window.onload = function() {

    // create new button from 
    $("#gif-submit").on("click", function(event) {
        event.preventDefault();
        // grab the input from the textbox
        var gifSearch = $("#gif-input").val().trim();

        // add the gif search term to the array
        topicArray.push(gifSearch);

        $("#gif-input").val("");

        // Calling renderButtons 
        renderButtons();
        

    });


    // add event listener to window so that it will pick up dynamically created buttons
    $(document).on("click", ".search-gif", renderGifs);
    $(document).on("click", ".gif-result", changeState);

    
    // create inital list of buttons and gifs from hard-coded array
    renderButtons();
    
} 