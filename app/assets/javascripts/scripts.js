// ******* Chart function *******
//below cdata variable exists outside of scope.
//it is referenced by calling chartShell in doc load
//and it sets initial chart values to zero
var cdata = [0,0,0,0,0,0,0];

//loads the chart on doc load
function chartShell(){
var radarChartData = {
    labels : ["Absolutistic","Achievist","Exploitative","Instinctive","Relativistic","Systemic","Tribalistic"],
     datasets : [
      {
        fillColor : "rgba(151,187,205,0.5)",
        strokeColor : "rgba(151,187,205,1)",
        pointColor : "rgba(151,187,205,1)",
        pointStrokeColor : "#fff",
        data : cdata
          }
        ]
      }

  var myRadar = new Chart(document.getElementById("canvas").getContext("2d")).Radar(radarChartData,{scaleShowLabels : false, pointLabelFontSize : 10});
}


// *********** Chart Value Model *******
//this is not currently used at all but saving it
//just for now
function NewChart(chartDataArray){
  this.absolutistic = chartDataArray[0];
  this.achievist = chartDataArray[1];
  this.exploitive = chartDataArray[2];
  this.instinctive = chartDataArray[3];
  this.relativistic = chartDataArray[4];
  this.systemic = chartDataArray[5];
  this.tribalistic = chartDataArray[6];
}


// named functions
function displayAllMovies(){

  for(id in moviesCollection.models){
    var movie = moviesCollection.models[id];
    var movieView = new MovieView(movie);
    $('#film_feed').append(movieView.render().el);
    $('.film_card').draggable({
      stack: '#film_feed',
      cursor: 'move',
      revert: true
    });
  }
}

//function to get chart data
function generateChart() {
  $.ajax({
    url: '/movies/new',
    type: 'GET',
    dataType: "JSON",
  }).done(function(chartDataArray){
    console.log(chartDataArray);
    cdata = chartDataArray;
    chartShell();
    return cdata;
    //cdata is passed to the chart function
    //the API response is parsed in movies controller
    //and sent back formatted for use in json
  })
}

function handleCardDrop( event, ui ) {
  ui.draggable.draggable( 'option', 'revert', false );
  ui.draggable.hide();
  var likedCardId = parseInt(ui.draggable.attr('id'), 10);
  likesCollection.add(moviesCollection.shiftAway(likedCardId));
}

function handleCardDislike( event, ui ) {
  ui.draggable.draggable( 'option', 'revert', false );
  ui.draggable.hide();
  var dislikedCardId = parseInt(ui.draggable.attr("id"), 10);
  // deletes trashed card from collections model
  console.log(dislikedCardId);
  moviesCollection.shiftAway(dislikedCardId);
}


// *************************************
var moviesCollection = new MoviesCollection();
var likesCollection = new LikesCollection();
// *************************************


function setEventListeners(){
  // executes when complete page is fully loaded, including all frames, objects and images
  // done this way because we want our posters to load AFTER the rest of the page has finished loading
  $(window).load(function(){
    moviesCollection.fetch();
  });

  $(moviesCollection).on('refresh', function(){
    displayAllMovies();
  });

  $('#film_feed').on('click', '.film_card', function(){
    console.log($(this).attr("id"));
    var ID = $(this).attr("id")
  });

  // ********************* Drop Actions ********************

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
    drop: handleCardDislike
  });
}


// ***************Document Ready****************

$(function(){

  setEventListeners();
  chartShell();
});

