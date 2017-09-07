"use strict";


$(".popup").each(function() {
  var this_id = "#" + $(this).attr('data-container');
  $(this).on('click', function(clicked) {
    $( this_id ).dialog({
      modal: true,
      show: true,
      hide: true,
      draggable: false,
      resizeable: false,
      width: Math.min($(window).width() * 0.9, 620),
      open: function() {
        $('.ui-widget-overlay').bind('click',function() {
          $(this_id).dialog('close');
        });
      },
      buttons: {
        "Close": function() {
          $( this ).dialog( "close" );
        }
      }
    });
  });
});


$('.showcolumn').each(function() {
  $(this).on('click', function() {
    var class_name = $(this).attr('id');
    if (class_name === 'bitcoin_core') return;
    $('.showcolumn').toggleClass('active', false);
    $('.showcolumn#bitcoin_core, .showcolumn#' + class_name).toggleClass('active', true);
    $('.privacy-comparison th, .privacy-comparison td').toggle(false);
    $('.privacy-comparison td:first-child, .privacy-comparison th:first-child, .privacy-comparison .bitcoin_core').toggle(true);
    $('.privacy-comparison .' + class_name).toggle('highlight', 750);
  });
});


$(function() {
  $(".validation tr.details").hide();

  $(".validation tr.brief").click(function(){
      $(this).find("span").toggleClass("ui-icon-triangle-1-e").toggleClass("ui-icon-triangle-1-s");
      $(this).next("tr").fadeToggle();
  });
});


$(function() {
  $( ".wallet_accordion" ).accordion({
    active: -1,
    heightStyle: "content"
  });
});


$(function() {
  $(".show_more").hide();
  $(".toggle_show_more_less").show();

  $(".toggle_show_more_less").click(function() {
    $(".show_more").fadeToggle();
    $(".toggle_show_more_less").hide();
  });
});


$(function() {
  $( "#system-requirements-accordion" ).accordion({
    active: -1,
    heightStyle: "content"
  });
});




  
  function start_slideshow(container) {
    var group  = container.find('.slide-group');
    var slides = container.find('.slide');
    var buttons = container.find('.slide-btn');
    var button_array  = [];
    var current_index = 0;
    var timeout;
    
    var short_period = 3000;
    var long_period = short_period * 3;

    
    function move(new_index, period) {
      var animate_left;
      var slide_left;

      advance(period);

      
      if (group.is(':animated') || current_index === new_index) {
        return;
      }

      button_array[current_index].removeClass('active');
      button_array[new_index].addClass('active');

      
      if (new_index > current_index) {
        slide_left = '100%';
        animate_left = '-100%';
      } else {
        slide_left = '-100%';
        animate_left = '100%';
      }

      slides.eq(new_index).css({
        left: slide_left,
        display: 'block'
      });

      
      group.animate({left: animate_left}, function() {
        slides.eq(current_index).css({
          display: 'none'
        });
        slides.eq(new_index).css({
          left: 0
        });
        group.css({
          left: 0
        });
        current_index = new_index;
      });
    }

    
    function advance(period) {
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        if (current_index < (slides.length - 1)) {
          move(current_index + 1, short_period);
        } else {
          move(0, short_period);
        }
      }, period);
    }

    
    $.each(slides, function(index) {
      var button = $(buttons[index]);

      if (index === current_index) {
        button.addClass('active');
      }

      button.on('click', function() {
        move(index, long_period);
      });

      button_array.push(button);
    });

    advance(short_period);
  }

  
  function change_slider_height() {
      
      var revised_size = 125;

      
      $(".slide img").each(function() {
        var img_height = $(this).height();
        if (img_height > revised_size) {
          revised_size = img_height;
        }
      });

      $(".slide-viewer").css('height', revised_size + "px");
  }

  
  $(document).load(function() {
    change_slider_height();
  });

  $(window).resize(function() {
    change_slider_height();
  });


