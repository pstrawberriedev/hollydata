/*
  Search Cookie (yum!)
*/


console.log('--> search-cookies.js');

// Define search UI variables
//
var $searchBox = $('#search-box');
var $recentContainer = $('#recent-searches');
var $recentBox = $('#recent-searches ul');

// Check if the user has a search cookie
//
var searchCookie = Cookies.getJSON('holly-search');

if(searchCookie != undefined) {

  var recentArray = searchCookie.searches;
  if(recentArray.length > 0) { arrayToList(); }
  console.log('Search Cookie exists: ' + recentArray);
  registerUI(recentArray);
  
} else {
  
  console.log('Creating new search cookie.');
  Cookies.set('holly-search', { searches: [] }, { expires: 365 });
  
  setTimeout(function() {
    searchCookie = Cookies.getJSON('holly-search');
    var recentArray = searchCookie.searches;
    console.log('Search Cookie created: ' + recentArray);
    registerUI(recentArray);
  },50);
    
}

// UI: 'Recently Searched' hide/show Functionality
//
function registerUI(recentArray) {
  $searchBox.on('focus', function() { 
    if(recentArray.length > 0) {$recentBox.find('li.filler').hide();}
    $recentBox.fadeIn();
    $recentContainer.fadeIn();
  });
  $searchBox.on('blur', function() { 
    $recentBox.fadeOut();
    $recentContainer.fadeOut();
  });

  // Format Array into HTML
  function arrayToList() {
    $recentBox.html('');
    $.each(recentArray, function(i) {
        var li = $('<li/>')
            .text(recentArray[i])
            .appendTo($recentBox);
    });
  }
  
  // Capture Searches on Enter key
  $searchBox.keyup(function (e) {
    if (e.which === 13) {

        var searchText = $searchBox.val();

        // Make sure our array doesn't have more than 5 items
        // - if it does, delete the oldest one and push in the new item
        // - if it doesn't, just push in the new item
        if(recentArray.length >= 5) {

          var firstItem = recentArray[0];
          var index = recentArray.indexOf(firstItem);
          recentArray.splice(index, 1);

          setTimeout(function() {
            recentArray.push(searchText);

            setTimeout(function() {
              Cookies.set('holly-search', { searches: recentArray }, { expires: 365 });
              arrayToList();
            },50);

          },100);

        } else {
          recentArray.push(searchText);
          setTimeout(function() {
            Cookies.set('holly-search', { searches: recentArray }, { expires: 365 });
            arrayToList();
          },100);
        }

    }
  });
  
}