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








// ************ Collection *************
function MoviesCollection(){
  this.models = {};
}


MoviesCollection.prototype.add = function(movieJSON){
  var newMovie = new Movie(movieJSON);
  this.models[movieJSON.id] = newMovie;
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



// *************************************
var moviesCollection = new MoviesCollection();
// *************************************




function setEventListeners(){
  
  // executes when complete page is fully loaded, including all frames, objects and images
  // done this way because we want our posters to load AFTER the rest of the page has finished loading
  $(window).load(function(){
    moviesCollection.fetch();
  });
}







$(function(){

  setEventListeners();



});


