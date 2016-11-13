/*
  Content
*/

console.log('--> content.js');

// Count the Cookies!
//
var cookieCount = Cookies.getJSON();
var cookieCountNumber = 0;
function countCookies() {
  for (var key in cookieCount) {
     if (cookieCount.hasOwnProperty(key)) {
        var obj = cookieCount[key];
        for (var prop in obj) {
           if (obj.hasOwnProperty(prop)) {
              //console.log(prop + ": " + obj[prop]);
              cookieCountNumber++;
           }
        }
     }
  }
  $('main header[role=banner]').prepend('<span class="cookie-info">Cookies: ' + cookieCountNumber + '<br /></span>');
};
countCookies();


// Holiday Snow!
// a Pen by DIACO : twitter.com/Diaco_ml  ||  codepen.io/MAW
TweenLite.set("#snow",{perspective:600})

var total = 12;
var warp = document.getElementById("snow"),	w = window.innerWidth , h = window.innerHeight;
 
 for (i=0; i<total; i++){ 
   var Div = document.createElement('div');
   TweenLite.set(Div,{attr:{class:'dot'},x:R(0,w),y:R(-200,-150),z:R(-200,200)});
   warp.appendChild(Div);
   animm(Div);
 }
 
 function animm(elm){   
   TweenMax.to(elm,R(8,15),{y:h+100,ease:Linear.easeNone,repeat:-1,delay:-15});
   TweenMax.to(elm,R(4,8),{x:'+=100',rotationZ:R(0,180),repeat:-1,yoyo:true,ease:Sine.easeInOut});
   TweenMax.to(elm,R(2,8),{rotationX:R(0,360),rotationY:R(0,360),repeat:-1,yoyo:true,ease:Sine.easeInOut,delay:-5});
 };

function R(min,max) {return min+Math.random()*(max-min)};