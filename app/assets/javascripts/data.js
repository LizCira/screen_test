

function getChartScore(plot_text){
$.ajax({
  url: '/data/new',
  type: 'GET',
  dataType: 'JSON',
  data: plot_text
})
}

function getMoviePlot(title){
 $.ajax({
    url: 'http://www.omdbapi.com/?t=' + title + '&plot=full',
    type: 'GET',
    dataType: "JSON",
    }).done(function(data){
    console.log(data);
    var movieHash = data;
    var plot = movieHash["Plot"];
    return plot;
  })
    getChartScore(plot)
}


$(function(){

$("#movie_title_button").on('click', function(){
  var title = $("#movie_title_field").val();
  console.log(title);
  getMoviePlot(title);
});

  });

