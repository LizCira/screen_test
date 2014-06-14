$(document).ready(function() {

  $('.film_card').draggable({
      containment: 'document',
      // stack: '#film_feed div',
      cursor: 'move',
      // revert: true
  });


  $('#radar_chart').droppable({
    accept: 'film_card div',


  });



})