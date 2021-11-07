// Lecture: Events - Part 1

// ** The recommended way to add event is through anonymous function from script.js rather that using as HTML attribute.
// ! The more modern approach is by event listener.

var h2 = document.querySelector("header h2");

h2.onclick = function () {
  console.log("Clicked");
};

h2.onmouseover = function () {
  console.log("Mouseover");
};

// function a() {
//   console.log("Clicked");
// }

// function b() {
//   console.log("Mouseover");
// }
