// Lecture: Events - Part 3

/*
var h2 = document.querySelector("header h2");

h2.addEventListener("click", function () {
  a(5, 5);
});

function a(x, y) {
  console.log(x * y);
}
*/

/*
var div = document.querySelector("div.wrapper");
var header = document.querySelector("header");
var h2 = document.querySelector("header h2");

div.addEventListener(
  "click",
  function () {
    var delay = new Date().getTime() + 1000;
    while (new Date() < delay) {}
    console.log("Clicked wrapper");
  },
  true
);

header.addEventListener(
  "click",
  function () {
    var delay = new Date().getTime() + 1000;
    while (new Date() < delay) {}
    console.log("Clicked header");
  },
  true
);

h2.addEventListener(
  "click",
  function () {
    var delay = new Date().getTime() + 1000;
    while (new Date() < delay) {}
    console.log("Clicked h2");
  },
  true
);
*/

// ** The third parameter of event 'false' is default - This is event bubbling!
// ** The third parameter of event 'true' is event capturing!

var h2 = document.querySelector("header h2");

h2.addEventListener("click", function () {
  console.log("Clicked h2");
});

function a() {
  var delay = new Date().getTime() + 3000;
  while (new Date() < delay) {}
  console.log("From function a");
}

a();

console.log("Global code here!");
