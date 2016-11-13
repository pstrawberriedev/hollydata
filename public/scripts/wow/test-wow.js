/*
  Test WoW!
  Grap some WoW info via front-end (insecure local test)
*/


console.log('--> test-wow.js');
console.log('[test-wow.js is mean for local testing - API Key exposed]');

// Define WoW UI vars
//
var $mainLoader = $('.wow-loader-main');
var $mainArea = $('.wow-container');


// WoW ajax call
//
function getWoW(character, realm) {
  
  // Do ajax call
  // - requires: character(string), realm(string)
  $.ajax({
    url: 'http://192.168.1.103:8124/',
    dataType: "jsonp",
    jsonpCallback: "_testcb",
    cache: false,
    timeout: 5000,

    success: function(data) {

      $mainLoader.fadeOut(180);
      $mainArea.append(data);

    },

    error: function(jqXHR, textStatus, errorThrown) {

      alert('error ' + textStatus + " " + errorThrown);


    }
  
  });
  
}