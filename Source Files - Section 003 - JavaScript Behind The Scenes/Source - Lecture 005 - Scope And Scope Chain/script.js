// Lecture: Scope And Scope Chain

/*
var num1 = 5;
// console.log(num2 + num1);
// console.log(num1);

function a() {
  num2 = 10;
  // num1 = 10;
  // console.log(num3 + num2 + num1);
  // console.log(num1);

  function b() {
    var num3 = 15;
    // var num1 = 15;
    console.log(num3 + num2 + num1);
    // console.log(num1);
  }

  b();
}

a();

// console.log(num1);
*/

var num1 = 5

function a() {
  var num2 = 5

  function b() {
    var num3 = 8
    console.log(num1 + num2 + num3);
    console.log(num1);


  }
  b()
}

a()