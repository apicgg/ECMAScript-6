// Lecture: First-Class Functions

var scores = [55, 64, 81, 28];

function checkResult(arr, fn) {
  var newArr = [];
  for (let i = 0; i <= arr.length; i++) {
    newArr.push(fn(arr[i]));
  }
  return newArr;
}

function passFail(score) {
  return score >= 51;
}

function calcDifference(score) {
  return score - 51;
}

console.log(checkResult(scores, passFail));
console.log(checkResult(scores, calcDifference));

// var scores = [55, 64, 81, 28];

// function checkResult(arr) {
//   var newArr = [];
//   for (let i = 0; i <= arr.length; i++) {
//     newArr.push(arr[i]);
//   }
//   return newArr;
// }

// function passFail(score) {
//   return score >= 51;
// }

// function calcDifference(score) {
//   return score - 51;
// }

// console.log(checkResult(scores));
