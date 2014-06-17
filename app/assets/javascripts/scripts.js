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
  this.models = [];
}


MoviesCollection.prototype.add = function(movieJSON){
  var newMovie = new Movie(movieJSON);
  this.models.push(newMovie);
  // console.log(moviesCollection.models);
  $(this).trigger('refresh');
}

MoviesCollection.prototype.fetch = function(){
  $.ajax({
    url: '/movies',
    type: 'GET',
    dataType: 'JSON'
  }).done(function(data){
    console.log(data);
    for (id in data){
      moviesCollection.add(data[id]);
    }
  });
}

MoviesCollection.prototype.shiftAway = function(movieId){
  var self = this;
  var removed = [];
  // console.log("outside": this)
  this.models.forEach(function(object, i){
  // console.log("inside": this)
  // this WITHIN this callback does NOT persist...hence which is why we need to declare self = this
  // we are interating over the array and each index has an object and i automatically becomes the object's index
    if (object.id === movieId){
      var popped = self.models.splice(i, 1);
      removed.push(popped);
    }

  });
  // if the length of the collection becomes equal to 5, it repopulates the feed...ask for advice on how to make this logic function better
  if (this.models.length === 5) {
    moviesCollection.fetch();
  }
  console.log(removed[0]);
  return removed[0];
}


// ******************LIKES MODEL******************
function Like(likedMovieObject) {
  // added additional fields for the model to persist data
  this.movie_id = likedMovieObject.id;
  this.movie_title = likedMovieObject.title;
  this.movie_poster = likedMovieObject.poster;
  this.movie_year = likedMovieObject.year;
}


// ******************LIKES Collection*************
function LikesCollection(){
  this.models = [];
}

LikesCollection.prototype.add = function(cardArray){
  var newLike = new Like(cardArray[0]);
  // the cardId is the "removed" movie object being popped by itself from splice method
  this.models.push(newLike);
  likesCollection.create(newLike);
  // this is where delete from moviesCollection takes place
  // delete moviesCollection.models[cardId];
}

// possibly change counter to if(Object.keys(likesCollection.models).length === 5)

LikesCollection.prototype.create = function(likeParams){
  var self = this;
  // console.log(likeParams);
  // likeParams has much more data but only data accepted through strong params is the ID
  $.ajax({
    url: '/movies/'+ likeParams.movie_id + '/likes',
    type: 'POST',
    dataType: 'JSON',
    data: {like: likeParams},
    beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))}
  }).done(function(data){
    console.log(data);
    console.log(data.movie_id);
    // return data isn't being utilized but likesCollection length is used to trigger chart generation
    if(self.models.length === 5){
      generateChart();
      moviesCollection.fetch();
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

