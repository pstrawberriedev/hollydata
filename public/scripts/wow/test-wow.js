/*
  Test WoW!
  Grap some WoW info via front-end (insecure local test)
*/


console.log('--> test-wow.js');
console.warn('[test-wow.js - Careful, API Key is exposed!]');

// Define WoW UI vars
//
var $mainLoader = $('.wow-loader.main');
var $mainArea = $('.wow-container');
var $mainError = $('.wow-error.main');

var $heroSearch = $('#wow-search');
var $realmSearch = $('#wow-search-realm');
var $searchButton = $('#wow-search-submit');

// Get Search
//
var searchable = 1;
var characterSearched;
var realmSearched;

$heroSearch.on('keyup', function(e) {if (e.which === 13) {$searchButton.click()} });
$searchButton.on('click', function() {
  
  if( $heroSearch.val() != '' && $realmSearch.val() != 'server' && searchable == 1 ) {
    
    $mainError.fadeOut(180);
    $mainError.removeClass('active');
    $mainLoader.fadeIn(180);
    
    characterSearched = $heroSearch.val().replace(/ /g,'').toLowerCase();
    realmSearched = $realmSearch.val();
    
    console.log('Searching Character: ' + characterSearched);
    console.log('On Realm: ' + realmSearched);
    
    setTimeout(function() {
      searchable = 0;
      var info = buildUrl('character', realmSearched, characterSearched);
      getWowFromSearch(info);
    },100);
    
  } else {
    
    if($mainError.hasClass('active')) {
      $mainError.fadeOut(180);
      setTimeout(function() {
        $mainError.fadeIn(180);
      },200);
    } else {
      $mainError.addClass('active');
      $mainError.fadeIn(180);
      $mainError.html('Error: Enter a Character Name and select a Realm');
    }
    
    
  }
  
});

// Build URL
//
//https://us.api.battle.net/wow/character/chogall/milkme
function buildUrl(calltype, server, name) {
  
  var baseUrl = 'https://us.api.battle.net/wow/';
  var secretUrl = '?locale=en_US&jsonp=apiCalled&apikey=cp9c5gugfpezfeewpmj26bme5cehdvx4';
  var finishedUrl = baseUrl + calltype + '/' + server + '/' + name + secretUrl;
  
  if(finishedUrl) {
    console.log('url: ' + finishedUrl);
    return finishedUrl;
  }
  
}

// WoW ajax call
//
function getWowFromSearch(info) {
  
  // Callback life
  window.apiCalled = function(data) {
    console.log('WoW api called');
    console.log(data);
  };
  
  // Do ajax call
  $.ajax({
    url: info,
    type: 'GET',
    dataType: 'jsonp',
    jsonp: 'callback',
    jsonpCallback: 'apiCalled',
    cache: false,
    timeout: 5000,

    success: function(data) {
      
      $mainError.fadeOut(180);
      $mainError.removeClass('active');
      $mainLoader.fadeOut(180);
      $mainArea.append(JSON.stringify(data));
      
      setTimeout(function() {
        searchable = 1;
      },150);

    },

    error: function(xhr, status, error) {
      
      $mainLoader.fadeOut(180);
      $mainError.html('Error: ' + status + " " + error);
      $mainError.fadeIn(180);
      $mainError.addClass('active');

    }
  
  });
  
}