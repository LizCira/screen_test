$(function(){
  // // we have an array called booArray
  // // it has hashes inside of it.
  // booArray = [{outsideBoo: {boo: "boo"}}, {outsideBoo: {boo: "bootoo"}}]

  // // in html we created with the id 'testTemplate'
  // // we're going to get the html inside the template
  // // and return as a string
  // templateString = $('#testTemplate').text()

  // // now iterate over booArray
  // booArray.forEach(function(booHash){
  //   // we're going to append/preprend/html the element of choice
  //   // using underscore's .template method.
  //   // it wants the string of html (we saved it as templateString)
  //   // and a hash of information
  //   // .template expects a hash key for each variable in the erb in templateString
  //   $("body").prepend(_.template(templateString, booHash))
  // }) 

  // model
  // responsible for data of object
  function BooModel(infoHash){
    this.scream = infoHash["scream"]
  }

  // view
  // responsible for displaying it specific model
  function BooView(model){
    this.model = model
    this.el = $('body')
  }

  // returns the template string for this view
  BooView.prototype.getTemplate = function(){
    return _.template($('#testTemplate').text(), this.model)
  }

  // takes the template string and
  // prepend it to this views element
  BooView.prototype.render = function(){
    this.el.prepend(this.getTemplate());
  }

  // collection
  // responsible for the collection of models
  function BooCollection(){
    this.models = []
  }

  // adds a boo to the collection of models
  BooCollection.prototype.add = function(boo){
    this.models.push(boo)
  }

  // iterates over the collections models
  // makes a view for them, and calls render on it
  BooCollection.prototype.showAllBoos = function(){
    this.models.forEach(function(booModel){
      var newBooView = new BooView(booModel)
      newBooView.render()
    })
  }

  booHash = {scream: "boooooo!"}

  var newBoo = new BooModel(booHash);
  var newBooToo = new BooModel(booHash);
  var newBooCollection = new BooCollection();
  newBooCollection.add(newBoo);
  newBooCollection.add(newBooToo);
  newBooCollection.showAllBoos();
})

