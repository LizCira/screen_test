$(document).ready(function() {

  $('.film_card').draggable({
      // containment: '#content_main',
      stack: '#film_feed',
      cursor: 'move',
      revert: true
  });


  $('#radar_chart').droppable({
    accept: '.film_card',
    hoverClass: 'highlight',
    drop: handleCardDrop
  });

    $('#trash_bin').droppable({
    accept: '.film_card',
    hoverClass: 'highlight',
    drop: function( event, ui ) {
      ui.draggable.draggable( 'option', 'revert', false );
      ui.draggable.hide();
    }
  });

})




function handleCardDrop( event, ui ) {
  ui.draggable.draggable( 'option', 'revert', false );
  ui.draggable.hide();
  }

  // $ajax({
  //   url: "/",
  //   type: "POST",
  //   dataType: "json",
  //   data: like
  // }).done(function(data) {



