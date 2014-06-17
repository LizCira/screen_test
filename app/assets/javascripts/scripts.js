// named functions
function displayAllMovies(){
  $('#film_feed').html('');

  for(id in moviesCollection.models){
    var movie = moviesCollection.models[id];
    var movieView = new MovieView(movie);
    $('#film_feed').append(movieView.render().el);
    $('.film_card').draggable({
      stack: '#film_feed',
      cursor: 'move',
      revert: true
    });
  }
}

//function to get chart data
function generateChart() {
  $.ajax({
    url: '/movies/new',
    type: 'GET',
    dataType: "JSON",
  }).done(function(data){
    console.log(data);
  })
}

// Named functions for drag drops
function handleCardDrop( event, ui ) {
  ui.draggable.draggable( 'option', 'revert', false );
  ui.draggable.hide();
  var likedCardId = parseInt(ui.draggable.attr('id'), 10);
  likesCollection.add(moviesCollection.shiftAway(likedCardId));
}

function handleCardDislike( event, ui ) {
  ui.draggable.draggable( 'option', 'revert', false );
  ui.draggable.hide();
  var dislikedCardId = parseInt(ui.draggable.attr("id"), 10);
  // deletes trashed card from collections model
  console.log(dislikedCardId);
  moviesCollection.shiftAway(dislikedCardId);
}


// *************************************
var moviesCollection = new MoviesCollection();
var likesCollection = new LikesCollection();
// *************************************

//RESOLVES FILM CARD ID ISSUE
$('#film_feed').on('click', '.film_card', function(){console.log($(this).attr("id"));});



function setEventListeners(){
  // executes when complete page is fully loaded, including all frames, objects and images
  // done this way because we want our posters to load AFTER the rest of the page has finished loading
  $(window).load(function(){
    moviesCollection.fetch();
  });

  $(moviesCollection).on('refresh', function(){
    displayAllMovies();
  });

  $('#film_feed').on('click', '.film_card', function(){
    console.log($(this).attr("id"));
    var ID = $(this).attr("id")
  });

  // ********************* Drop Actions ********************

  $('#radar_chart').droppable({
    accept: '.film_card',
    hoverClass: 'highlight',
    tolerance: 'pointer',
    drop: handleCardDrop
  });

  $('#trash_bin').droppable({
    accept: '.film_card',
    hoverClass: 'highlight',
    tolerance: 'pointer',
    drop: handleCardDislike
  });

}


// ***************Document Ready****************
$(function(){

  setEventListeners();

});

