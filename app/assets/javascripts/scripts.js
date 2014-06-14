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



// *************************************
var moviesCollection = new MoviesCollection();
// *************************************




function setEventListeners(){


  
}







$(function(){

  setEventListeners();

});