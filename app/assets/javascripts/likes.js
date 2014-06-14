
// ************ Model *************



// ************ View *************


// ************ Collection *************
function LikeCollection(){
  this.models = {};
}

LikeCollection.prototype.create = function(paramObject){

  $.ajax({
    url: '/likes',
    method: 'post',
    dataType: 'json',
    data: {like: paramObject}
  })


$(function(){

// below is pseudo code for securing values of like after selection trigger
$("#radar_chart").on('drop', function(e){

  var currentUserId = $.ajax({
    url: '/likes',
    method: 'get',
    dataType: 'json'
    })

  var chosenMovieId =

  likeCollection.create({
  user_id: currentUserId,
  movie_id: chosenMovieId
});


});
