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
    if(self.models.length > 4){
      generateChart();
      moviesCollection.fetch();
    }
  });
}
