// Lecture: Prototype - Object Function

/*
var a = {};
var b = new Object();

console.log(a);
console.log(b);
console.log(Object);
console.log(Object.prototype);

Object.prototype.greet = 'Hello';
console.log(Object.prototype);
*/

function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

Person.prototype.getFullName = function () {
  return this.firstName + " " + this.lastName;
};

Person.prototype.greet = function () {
  return "Hello from prototype object";
};

var person1 = new Person("John", "Doe");
var person2 = new Person("Mary", "Smith");

person1.greet = "Hello from person1 object";
console.log(person1.getFullName());
console.log(person2.getFullName());
// console.log(person1.greet());
