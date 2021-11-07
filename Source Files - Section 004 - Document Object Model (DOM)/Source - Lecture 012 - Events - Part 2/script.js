// Lecture: Events - Part 2

var h2 = document.querySelector("header h2");

h2.addEventListener("click", a);
// h2.addEventListener("click", b);

// function a(e) {
//   console.log(e);
// }

function a() {
  console.log(this);
}
// function b() {
//   console.log("Clicked b");
// }
