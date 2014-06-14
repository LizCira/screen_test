$(document).ready(function() {

  $('.film_card').draggable({
      // containment: '#content_main',
      stack: '#film_feed',
      cursor: 'move',
      revert: true
  });


  $('#radar_chart').droppable({
    accept: '.film_card',
    hoverClass: 'hovered',
    drop: handleCardDrop

  });


})

function handleCardDrop( event, ui ) {
  ui.draggable.draggable( 'option', 'revert', false );
  ui.draggable.hide();


  }