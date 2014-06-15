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
  $('.film_card').draggable({
    stack: '#film_feed',
    cursor: 'move',
    revert: true
  });

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



// named functions
function displayAllMovies(){
  $('#film_feed').html('');

  for(id in moviesCollection.models){
    var movie = moviesCollection.models[id];
    var movieView = new MovieView(movie);
    $('#film_feed').append(movieView.render().el);
  }

}
// callback function for carddrop
function likeCreate(cardId) {
  $.ajax({
    url: '/movies/'+ cardId + '/likes',
    type: 'POST',
    dataType: 'JSON'
  }).done(function(data){
    console.log(data);
  });
}

// Ben's named function
function handleCardDrop( event, ui ) {
  ui.draggable.draggable( 'option', 'revert', false );
  ui.draggable.hide();
  ui.draggable.val("liked");
  var likedCardId = ui.draggable.attr('id');
  likeCreate(likedCardId);
  // into a like collection of pending ajax api get request
}


// *************************************
var moviesCollection = new MoviesCollection();
// *************************************




function setEventListeners(){
  $(moviesCollection).on('refresh', function(){
    displayAllMovies();
  });

$('#film_feed').on('click', '.film_card', function(){console.log($(this).attr("id"));
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
    ui.draggable.val("trashed");
    console.log(ui.draggable.attr("id"));
    var cardId = ui.draggable.attr("id")
    blah(cardId);
    }

  });
  // *********************************************
}







$(function(){

  setEventListeners();

});


