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
        searchable = 1;
      },200);
    } else {
      $mainError.addClass('active');
      $mainError.fadeIn(180);
      $mainError.html('Error: Enter a Character Name and select a Realm');
      searchable = 1;
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
    console.log('WoW api queried');
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
      populateBasicInfo(data);
      //$mainArea.append(JSON.stringify(data));
      
      
      setTimeout(function() {
        searchable = 1;
      },150);

    },

    error: function(xhr, status, error) {
      
      $mainLoader.fadeOut(180);
      $mainError.fadeIn(180);
      $mainError.addClass('active');
      searchable = 1;
      
      if(xhr.status === 404) { //Character Not Found
        $mainError.html('Character doesn\'t exist. Make sure you selected a server and try again.');
      } else {
        $mainError.html('Dang...something went very wrong...');
        console.log('xhr: ' + JSON.stringify(xhr));
        console.log('Status: ' + JSON.stringify(status));
        console.log('Error: ' + JSON.stringify(error));
        //$mainError.html('xhr: ' + JSON.stringify(xhr) + '<br />Error: ' + JSON.stringify(status) + '<br />' + JSON.stringify(error));
      }
      
    }
  
  });
  
  // Populate Page with Basic Info
  //
  var $basicArea = $('.wow-container .hero-basic');
  var $heroName = $('[data-wow="hero-name"]');
  var $heroPicture = $('[data-wow="hero-image"]');
  
  function populateBasicInfo(data) {
    var cleanRace;
    var cleanClass;
    var cleanFaction;
    
    // Define Uknown Information (Race, Class, Faction, etc.)
    switch(data.faction) { //Races
      case 1: cleanFaction = 'Horde'; break;
      case 2: cleanFaction = 'Alliance'; break;
      default: cleanFaction = 'Unknown Faction'; break;
    }
    
    switch(data.race) { //Races
      case 1: cleanRace = 'Race 1'; break;
      case 2: cleanRace = 'Race 2'; break;
      case 3: cleanRace = 'Race 3'; break;
      case 4: cleanRace = 'Race 4'; break;
      case 5: cleanRace = 'Race 5'; break;
      case 6: cleanRace = 'Race 6'; break;
      case 7: cleanRace = 'Race 7'; break;
      case 8: cleanRace = 'Race 8'; break;
      default: cleanRace = 'Unknown Race'; break;
    }
    
    switch(data.class) { //Classes
      case 1: cleanClass = 'Class 1'; break;
      case 2: cleanClass = 'Class 2'; break;
      case 3: cleanClass = 'Class 3'; break;
      case 4: cleanClass = 'Class 4'; break;
      case 5: cleanClass = 'Class 5'; break;
      case 6: cleanClass = 'Class 6'; break;
      case 7: cleanClass = 'Class 7'; break;
      case 8: cleanClass = 'Class 8'; break;
      default: cleanClass = 'Unknown Class'; break;
    }
    
    //Insert Image
    $heroPicture.attr('src', data.thumbnail);
    
    $basicArea.fadeIn(180);
    $heroName.html(data.name + ' (' + data.realm + ' / ' + cleanFaction + ')' + '<br />' + '<span>Level ' + data.level + ' ' + ' ' + cleanRace + ' ' + cleanClass + '</span>' + '<br />' + '<span>');
    
  }
  
}