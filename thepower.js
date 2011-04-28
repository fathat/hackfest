/**
 *  _   _    _    ____ _  _______ _____ ____ _____ 
 * | | | |  / \  / ___| |/ /  ___| ____/ ___|_   _|
 * | |_| | / _ \| |   | ' /| |_  |  _| \___ \ | |  
 * |  _  |/ ___ \ |___| . \|  _| | |___ ___) || |  
 * |_| |_/_/   \_\____|_|\_\_|   |_____|____/ |_|  
 *
 * QuickLeft Hackfest
 * April 27 2011
 *
 * JavaScript
 * Written by, Nico Valencia
 *
 * @module HACKFEST
 */

function getParameterByName( name ) {
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}



(function( window, undefined ){

  var HACKFEST = {

    init: function () {
      var target = "#" + getParameterByName('to');
      var message = getParameterByName('message');
      
      if(target == "#") {
        target = "#hipster_octopus";
      }

      var zw = $('#zombie_whale');
      
      function makeWhaleClassy() {
        zw.css('background-position', '0 -380px' );  
      }
      
      function makeWhaleMessenger() {
        zw.css('background-position', '0 -490px' );  
      }
      
      function makeWhaleAngry() {
        zw.css('background-position', '0 -490px' );  
      }
      
      makeWhaleClassy();
      
      var showForm = function() {
        $('#message_form').show()
      }
      
      var moveScTo = function(sc, dest, whenThere) {
        $(sc).animate($(dest).position(), 2000, whenThere)
      };
      
      if(target == '#hipster_octopus') {
        moveScTo('#zombie_whale', '#hipster_octopus', showForm)
      }
      else {
        moveScTo('#zombie_whale', target,
                 function() {
                   $('#message_text').text(message);
                   $('#message_display').position($(target).position());
                   $('#message_display').show('slow');
                 })
      }
      
      function showMessageAt(msg, p) {
          $('#message_text').text(msg);
          $('#message_display').css('top', p.top + 'px');
          $('#message_display').css('left', p.left + 'px');
          $('#message_display').show('fast');
      }
      
      window.sendWhaleMessage = function() {
        var mytarget = "#" + $('#to').val();
        
        makeWhaleMessenger();
        
        function deliverMessage() {
          var sendTo = $('#to').val();
          console.log($('#to').val());
          var targetPosition = $(mytarget).position();

          showMessageAt('#hipster_octopus says: ' + $('#message').val(), targetPosition)

          t=setTimeout("hateOnHO()",5000);

        }
        
        function responseToHipster() {
          return 'THAT IS SO LAST WEEK HIPSTER OCTOPUS';
        }
        
        window.hateOnHO = function() {
          $('#message_display').hide('slow');
          moveScTo('#zombie_whale', target, function() {  
            showMessageAt('#' + $('#to').val() + ' says: ' + responseToHipster() , $('#hipster_octopus').position())
          });
        }
        
        moveScTo('#zombie_whale', mytarget, deliverMessage);
        
        $('#message_display').hide('fast');
        $('#message_form').hide('fast');
      }
    }

  };

  $( document ).ready( HACKFEST.init );

})( this );
