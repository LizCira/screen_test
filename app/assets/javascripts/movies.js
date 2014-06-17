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
