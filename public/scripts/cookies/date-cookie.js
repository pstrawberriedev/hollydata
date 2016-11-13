/*
  Date Cookie (yum!)
*/


console.log('--> date-cookies.js');

// Set up dates via moment.js
//
var currentDate = Math.round(new Date().getTime());
var formattedDate = moment(currentDate).format('MMM Do YYYY hh:mma');

// Initial cookie check - make sure we've got a cookie, if not create a new one
//
var dateCookie = Cookies.getJSON('holly-date');

// Cookie Exists
if(dateCookie != undefined) {
  
  console.log('Date Cookie exists: ' + dateCookie);
  console.log('last visited: ' + dateCookie.visited);
  var lastVisited = moment(dateCookie.visited, 'MMM Do YYYY hh:mma').fromNow();
  
  // Greet User
  $('main header[role=banner]').prepend('<span class="cookie-info">Your last visit: ' + lastVisited + '<br /></span>');
  
  // Reset Last visited date
  setTimeout(function() {
    Cookies.set('holly-date', { visited: formattedDate }, { expires: 365 });
  },100);
  
} else {
  
  console.log('Creating new Date Cookie');
  Cookies.set('holly-date', { visited: formattedDate }, { expires: 365 });
  
  dateCookie = Cookies.getJSON('holly-date');
  console.log('New Date Cookie Created: ' + dateCookie);
  
  // Greet User
  $('main header[role=banner]').prepend('<span class="cookie-info">You haven\'t visited yet. Welcome!<br /></span>');
  
}