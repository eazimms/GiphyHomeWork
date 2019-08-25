
$( document ).ready(function() {
  // An array of topics, new toics will be pushed into this array;
  var topics = [
  "Dogs", 
  "Kittens", 
  "Yes", 
  "No", 
  "Fox", 
  "Dark Souls", 
  "Gundam", 
  "Nope", 
  "Cry", 
  "Wink",
  "Yum", 
  
  ]
  // Create the gif buttons. 
  function displayGifButtons(){
      $("#gifButtonsView").empty(); // erasing anything in this div id so that it doesnt duplicate the results
      for (var i = 0; i < topics.length; i++){
          var gifButton = $("<button>");
          gifButton.addClass("action");
          gifButton.addClass("btn btn-primary")
          gifButton.attr("data-name", topics[i]);
          gifButton.text(topics[i]);
          $("#gifButtonsView").append(gifButton);
      }
  }
  // Function to add a new action button
  function addNewButton(){
      $("#addGif").on("click", function(){
      var action = $("#gif-input").val().trim();
      if (action == ""){
        return false; // added so user cannot add a blank button
      }
      topics.push(action);
  
      displayGifButtons();
      return false;
      });
  }
  // Function to remove last action button
      // Doesnt work properly yet removes all of the added buttons
      // rather than just the last, need to work on that...
  function removeLastButton(){
      $("removeGif").on("click", function(){
      topics.pop(action);
      displayGifButtons();
      return false;
      });
  }
  // Function that displays all of the gifs
  function displayGifs(){
      var action = $(this).attr("data-name");
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + action + "&api_key=dc6zaTOxFJmzC&random&limit=10";
      console.log(queryURL); // displays the url
      $.ajax({
          url: queryURL,
          method: 'GET'
      })
      .done(function(response) {
          console.log(response); // console test to make sure something returns
          $("#gifsView").empty(); // erasing anything in this div id so that it doesnt keep any from the previous click
          var results = response.data; //shows results of gifs
          if (results == ""){
            alert("There isn't a gif for this selected button");
          }
          for (var i=0; i < results.length; i++){
  
              var gifDiv = $("<div>"); //div for the gifs to go inside
              gifDiv.addClass("gifDiv");
              // pulling rating of gif
            // Add rating of gif to teh gif div. 
              var gifRating = $("<p>").text("Rating: " + results[i].rating);
              gifDiv.append(gifRating);
              // pulling gif
              var gifImage = $("<img>","</br>");
            //  yea
              gifImage.attr("src", results[i].images.fixed_height_small_still.url); // still image stored into src of image
              gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); // still image
              gifImage.attr("data-animate",results[i].images.fixed_height_small.url); // animated image
              gifImage.attr("data-state", "still"); // set the image state, default still. 
              gifImage.addClass("image");
              gifDiv.append(gifImage);
              // pulling still image of gif
              // adding div of gifs to gifsView div
              $("#gifsView").prepend(gifDiv);
          }
      });
  }
  // Calling Functions & Methods
  displayGifButtons(); // displays list of actions already created
  addNewButton();
  removeLastButton();
  // Document Event Listeners. checking the state of the gif itself, if still it will animate, if not it will "pause the gif". 
  $(document).on("click", ".action", displayGifs);
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