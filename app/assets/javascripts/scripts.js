// ******* Chart function *******
//below cdata variable exists outside of scope.
//it is referenced by calling chartShell in doc load
//and it sets initial chart values to zero
var cdata = [0,0,0,0,0,0,0];
var myRadar;

//loads the chart on doc load
function chartShell(testData){
  var radarChartData = {
    labels : ["Absolutistic","Achievist","Exploitative","Instinctive","Relativistic","Systemic","Tribalistic"],
     datasets : [
      {
        fillColor : "rgba(255,0,0,0.5)",
        strokeColor : "rgba(204,0,0,1)",
        pointColor : "rgba(96,96,96,1)",
        pointStrokeColor : "#fff",
        data : cdata
        // data : testData //jane
      }
    ]
  };
  var radarChartOptions = { scaleShowLabels : false,
                            pointLabelFontSize : 19,
                            pointLabelFontFamily : "'Helvetica'",
                            pointLabelFontStyle : "bold",
                            showTooltips : true,
                            scaleBeginAtZero : true
                          };
  var ctx = $("#canvas").get(0).getContext("2d");
  myRadar = new Chart(ctx).Radar(radarChartData, radarChartOptions);
}


// *********** Chart Value Model *******
//this is not currently used at all but saving it
//just for now
// function NewChart(chartDataArray){
//   this.absolutistic = chartDataArray[0];
//   this.achievist = chartDataArray[1];
//   this.exploitive = chartDataArray[2];
//   this.instinctive = chartDataArray[3];
//   this.relativistic = chartDataArray[4];
//   this.systemic = chartDataArray[5];
//   this.tribalistic = chartDataArray[6];
// }


//function to get chart data
function generateChart() {
  $.ajax({
    url: '/movies/personality',
    type: 'GET',
    dataType: "JSON",
  }).done(function(chartDataArray){
    console.log(chartDataArray); //originalcode
    cdata = chartDataArray; //originalcode
    chartShell(); // originalcode
    // return chartShell(chartDataArray);
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
var moviesCollectionView;
var likesCollectionView;
// *************************************


function setEventListeners(){
  // (window).load executes when complete page is fully loaded, including all frames, objects and images
  // done this way because we want our posters to load AFTER the rest of the page has finished loading
  $(window).load(function(){
    moviesCollection.fetch();

  });

  // $(moviesCollection).on('refresh', function(){
  //   //no-op
  // });

  $(moviesCollection).on('fetch-done', function(){
    moviesCollectionView.render();
  });

  $(likesCollection).on('fetch-likes', function(){
    likesCollectionView.render();
  });


  // ********* reset button ************
  $("#reset_button").on('click', function() {
      cdata = [0,0,0,0,0,0,0]; //originalcode
      chartShell([0,0,0,0,0,0,0]); //originalcode

      likesCollection.models = [];
      likesCollectionView.render();
      $('#like_tracker').append(
        "<div class='like_text'><p>Choose</p><p>Five</p><p>Movies</p></div><div class='parenthesis'><p>(Drag titles on left into the chart!)</p></div>"
      ); 
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

  $('.tlt').textillate({
      // loop: true
  });

  setEventListeners();
  chartShell([0,0,0,0,0,0,0]);

  moviesCollectionView = new MoviesCollectionView(moviesCollection, $("#film_feed"));
  likesCollectionView = new LikesCollectionView(likesCollection, $("#like_tracker"));

  $("canvas").on("click", function(){
    $(".key_dialog").removeClass("hidden")
              .on("click", function(){
                $(".key_dialog").addClass("hidden");
    });
  });
});
