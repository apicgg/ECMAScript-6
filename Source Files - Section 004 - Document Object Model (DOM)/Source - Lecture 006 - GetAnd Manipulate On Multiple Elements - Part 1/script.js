// Lecture: Get And Manipulate On Multiple Elements - Part 1

/*
var icons = document.getElementsByClassName('fa');
console.log(icons);
console.log(icons[0]);
console.log(icons[1]);

for(var i = 0; i < icons.length; i++) {
    console.log(icons[i]);
}

// icons.push('Hello');
 var iconsArr = Array.from(icons);
 console.log(iconsArr);
 console.log(icons);

iconsArr.push("Hello");
console.log(iconsArr);
*/

var icons = document.getElementsByClassName("fa");

for (let i = 0; i <= icons.length; i++) {
  console.log(icons[i]);
}

var iconsArr = Array.from(icons);
console.log(iconsArr[6]);
console.log(icons);

iconsArr.push("Hello");
console.log(iconsArr[6]);

// var text = document.querySelector(".fa");

// console.log(text);
