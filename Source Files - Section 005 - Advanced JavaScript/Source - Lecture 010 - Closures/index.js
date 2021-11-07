// ! This is a example of closure scope

/*
function a() {
  var arr = [];
  for (var i = 0; i < 3; i++) {
    arr.push(function () {
      console.log(i);
    });
  }
  return arr;
}

var b = a();

b[0]();
b[1]();
b[2]();

console.log(b);
*/

// ! This is a example of invoke function immediately for closure

function a() {
  var arr = [];
  for (var i = 0; i < 3; i++) {
    arr.push(
      (function () {
        console.log(i);
      })()
    );
  }
  return arr;
}

a();

// ** There is no need to invoke 'b' like before as it's done by invoking function 'a'
