

function getChartScore(plot_text){
$.ajax({
  url: '/data/new',
  type: 'GET',
  dataType: 'JSON',
  data: plot_text
}).done(function(chartDataArray){
  console.log(chartDataArray);
  cdata = chartDataArray;
  chartShell();
  return cdata;
})
}

//badly need a title clean filter
function getMoviePlot(title){
 $.ajax({
    url: 'http://www.omdbapi.com/?t=' + title + '&plot=full',
    type: 'GET',
    dataType: "JSON",
    }).done(function(data){
    console.log(data);
    // debugger
    movieHash = data;
    console.log("moviehash: " + movieHash);
    console.log(movieHash["Plot"])
    plot = {plot: movieHash["Plot"]}
    getChartScore(plot);
    return plot;
    // console.log(plot)
  })

}


$(function(){

$("#movie_title_button").on('click', function(){
  var title = $("#movie_title_field").val();
  var cleanTitle = title.replace(" ","%20");
  getMoviePlot(title);
});

  });

