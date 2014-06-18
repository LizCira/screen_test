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
  // var newElement = $('<div class="film_card" id="' + this.model.id + '">').html(this.model.title);
  // this.el = newElement;
  // return this;
  var newTemplate = _.template($('#filmTemplate').text(), this.model);
  this.el = $(newTemplate);
  return this;
}

// *********** View for MoviesCollectionView *************
function MoviesCollectionView(collection, el){ // right now: $('#film_feed')
  this.collection = collection;
  this.el = el;
}

MoviesCollectionView.prototype.render = function(){
  var self = this;

  this.el.html('');

  this.collection.models.forEach(function(movie){
    var movieView = new MovieView(movie);
    self.el.append(movieView.render().el);
    // console.log(movieView.el)
    // console.log(movieView)
    movieView.el.draggable({
      stack: '#film_feed',
      cursor: 'move',
      revert: true
    });
  });
}

// ************ Collection *************
function MoviesCollection(){
  this.models = [];
}


MoviesCollection.prototype.add = function(movieJSON){
  var newMovie = new Movie(movieJSON);
  this.models.push(newMovie);
  // console.log(moviesCollection.models);
  // $(this).trigger('refresh'); ...don't need to trigger refresh on add because it will refresh everytime something is added...
  // only need to create the view after the entire fetch has been done, hence trigger('fetch-done') 
  // after the .done function in MoviesCollection.prototype.fetch is done
}

MoviesCollection.prototype.fetch = function(){
  var self = this;
  $.ajax({
    url: '/movies',
    type: 'GET',
    dataType: 'JSON'
  }).done(function(data){
    console.log(data);
    // if (moviesCollection.models.length === 5){
    //   data = data.slice(0, 5);
    // }
    console.log(data);
    data.forEach(function(movieObject){
      self.add(movieObject);
    });
    $(self).trigger('fetch-done');
    // generates view here so that we don't create a view everytime we add(less 'refreshes')
  });
  console.log(moviesCollection.models.length)
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
  return removed[0];
}
