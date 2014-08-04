// ******************LIKES MODEL******************
function Like(likedMovieObject) {
  // added additional fields for the model to persist data
  this.movie_id = likedMovieObject.id;
  this.movie_title = likedMovieObject.title;
  this.movie_poster = likedMovieObject.poster;
  this.movie_year = likedMovieObject.year;
  // this.movie_approve = true;
}


// *******************LIKES VIEW******************
function LikeView(model){
  this.model = model;
  this.el = undefined; 
}


LikeView.prototype.render = function(){
  var likeTemplate = _.template($('#likeTemplate').text(), this.model);
  this.el = $(likeTemplate);
  return this;
}


// **********View for LikesCollectionView *********
function LikesCollectionView(collection, el){
  this.collection = collection;
  this.el = el;
}

LikesCollectionView.prototype.render = function(){
  var self = this;

  this.el.html('');
  if (likesCollection.models.length > 5){
    likesCollection.replace();
  }

  this.collection.models.forEach(function(likedMovie){
    var likeView = new LikeView(likedMovie);
    self.el.append(likeView.render().el);
  });

}


// ******************LIKES Collection*************
function LikesCollection(){
  this.models = [];
}

LikesCollection.prototype.add = function(cardArray){
  var newLike = new Like(cardArray[0]);
  // the cardId is the "removed" movie object being popped by itself from splice method
  this.models.push(newLike);
  this.create(newLike);

  $(this).trigger('fetch-likes');

}

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
    // return data isn't being utilized but likesCollection length is used to trigger chart generation
    if(self.models.length > 4){
      generateChart();
    }
  });
}

LikesCollection.prototype.replace = function(){
  var garbage = this.models.splice(0, 1);
  delete garbage;
}





