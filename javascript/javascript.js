$( document ).ready(function() {
// An array of new animal names, new topics will be pushed here
var topics = ["Zoo", "Trex", "Lion", "Tiger", "Bear", "Cow", "Walrus"];

// Function that displays and creates all gif buttons
function displayGifButtons(){
    $("#gifButtons").empty();
    for (var i = 0; i < topics.length; i++){
        var gifButton = $("<button>");
        gifButton.addClass("animals");
        gifButton.addClass("btn btn-primary")
        gifButton.attr("data-name", topics[i]);
        gifButton.text(topics[i]);
        $("#gifButtons").append(gifButton);
    }
}
// Function to add a new animal button
function addNewButton(){
    $("#addGif").on("click", function(){
    var animals = $("#animals-input").val().trim();
    if (animals == ""){
      return false; // added so user cannot add a blank button
    }
    topics.push(animals);

    displayGifButtons();
    return false;
    });
}

// Function to display gifs
function displayGifs(){
    var animals = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animals + "&api_key=dc6zaTOxFJmzC&limit10&rating=pg";
    console.log(queryURL); // just in case I need the URL
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .done(function(response) {
   
        $("#gifsSpot").empty(); 
        var results = response.data; 
        if (results == ""){
          alert("There isn't a gif for this selected button");//alert in case there are no gifs for created button
        }
        for (var i=0; i<results.length; i++){

            var gifDiv = $("<div>"); //div for the gifs to go inside
            gifDiv.addClass("gifDiv");
            // pulling rating of gif
            var gifRating = $("<p>").text("Rating: " + results[i].rating);
            gifDiv.append(gifRating);
            // pulling gif
            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_small_still.url); // still image at start
            gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); // still image
            gifImage.attr("data-animate",results[i].images.fixed_height_small.url); // animated image
            gifImage.attr("data-state", "still"); // reset the image state to still
            gifImage.addClass("image");
            gifDiv.append(gifImage);
            $("#gifsSpot").prepend(gifDiv);
        }
    });
}
//calling functions
displayGifButtons();
addNewButton();
$(document).on("click", ".animals", displayGifs);
$(document).on("click", ".image", function(){
    var state = $(this).attr('data-state');
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});
});
