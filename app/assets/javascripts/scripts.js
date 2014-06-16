// ************ Model *************
function Movie(movieJSON){
  this.id = movieJSON.id;
  this.title = movieJSON.title;
  this.poster = movieJSON.poster;
  this.year = movieJSON.year;
  this.plot = movieJSON.plot;
}

// ************ View *************
function MovieView(model){
  this.model = model;
  this.el = undefined;
}

MovieView.prototype.render = function(){
// where the template will go?
  var newElement = $('<div class="film_card" id="' + this.model.id + '">').html(this.model.title);
  this.el = newElement;
  return this;
}






// ************ Collection *************
function MoviesCollection(){
  this.models = {};
}


MoviesCollection.prototype.add = function(movieJSON){
  var newMovie = new Movie(movieJSON);
  this.models[movieJSON.id] = newMovie;
  $(this).trigger('refresh');
}


MoviesCollection.prototype.fetch = function(){
  $.ajax({
    url: '/movies',
    type: 'GET',
    dataType: 'JSON'
  }).done(function(data){
    for (id in data){
      moviesCollection.add(data[id]);
    }
  });
}


// ******************LIKES MODEL******************
function Like(likedMovieId) {
  this.movie_id = likedMovieId;
}


// ******************LIKES Collection*************
function LikesCollection(){
  this.models = {};
}

LikesCollection.prototype.add = function(cardId){
  var newLike = new Like(cardId);
  // the cardId is the actual id and doesnt need to have movie_id called cause cardId is the actual ID being passed in from the drop event.
  this.models[cardId] = newLike;
  likesCollection.create(newLike);
}

var counter = 0
LikesCollection.prototype.create = function(likeParams){
  $.ajax({
    url: '/movies/'+ likeParams.movie_id+ '/likes',
    type: 'POST',
    dataType: 'JSON',
    data: {like: likeParams},
    beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))}
  }).done(function(data){
    console.log(data);
    console.log(data.movie_id);
    counter++
    console.log(counter);
    if (counter === 5){
      generateChart();
    }
  });
}




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


// callback function for carddrop
// var counter = 0
// function likeCreate(cardId) {
//   console.log(cardId);
//   // var cardIdJSON = {movie_id: cardId};
//   $.ajax({
//     url: '/movies/'+ cardId + '/likes',
//     type: 'POST',
//     dataType: 'JSON',
//     // data: cardIdJSON,
//     beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))}
//   }).done(function(data){
//     console.log(data);
//     console.log(data.movie_id);
//   });
  // counter++
  // console.log(counter);
  // if (counter === 5){
  //   generateChart();
//   }
// }

// Ben's named function
function handleCardDrop( event, ui ) {
  ui.draggable.draggable( 'option', 'revert', false );
  ui.draggable.hide();
  var likedCardId = ui.draggable.attr('id');
  likesCollection.add(likedCardId);
  console.log(likedCardId);
}


// *************************************
var moviesCollection = new MoviesCollection();
var likesCollection = new LikesCollection();
// *************************************

//RESOLVES FILM CARD ID ISSUE
  $('#film_feed').on('click', '.film_card', function(){console.log($(this).attr("id"));});



function setEventListeners(){
  $(moviesCollection).on('refresh', function(){
    displayAllMovies();
  });

$('#film_feed').on('click', '.film_card', function(){
  console.log($(this).attr("id"));
  var ID = $(this).attr("id")
});

  // executes when complete page is fully loaded, including all frames, objects and images
  // done this way because we want our posters to load AFTER the rest of the page has finished loading
  $(window).load(function(){
    moviesCollection.fetch();
  });

  

  // *********************BEN********************


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
    drop: function( event, ui ) {
      ui.draggable.draggable( 'option', 'revert', false );
      ui.draggable.hide();
      var cardId = ui.draggable.attr("id")
      // deletes trashed card from collections model
      delete moviesCollection.models[cardId];
      // if the length of the collection becomes equal to 5, it repopulates the feed...ask for advice on how to make this logic function better
      if (Object.keys(moviesCollection.models).length === 5) {
        moviesCollection.fetch();
      }
    }

  });
  // *********************************************
}







$(function(){

  setEventListeners();

});

