// ************ Model *************

function Customer(customerJSON){
  this.user_id = customerJSON.name;
  this.movie_id = customerJSON.id;
}


// ************ View *************


// ************ Collection *************
function LikeCollection(){
  this.models = {};
}

LikeCollection.prototype.add = function(likeJSON){
  var newLike = new Like(likeJSON);
  this.models[likeJSON.id] = newLike; //adding to the array created above
}

LikeCollection.prototype.create = function(paramObject){

  $.ajax({
    url: '/likes',
    method: 'post',
    dataType: 'json',
    data: {like: paramObject}
  }).done(function(data){
    likeCollection.add(data);
  })
}

var likeCollection = new LikeCollection();

$(function(){
// below is pseudo code for securing values of like after selection trigger
$("#radar_chart").on('drop', function(e){
//need to get the movie ID from object dropped here
  var chosenMovieId =
  likeCollection.create({
  movie_id: chosenMovieId
});


});
