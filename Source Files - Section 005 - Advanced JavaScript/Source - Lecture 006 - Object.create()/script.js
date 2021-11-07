// Lecture: Object.create()

/*
function Person() {
  this.name = "John";
}

Person.prototype.greet = "Hello";

var person1 = new Person();
var person2 = Object.create(Person.prototype);

console.log(person1);
console.log(person2);
*/

var firstProto = {
  sayHello: function () {
    return "Hello " + this.name;
  },
};

var john = Object.create(firstProto, {
  name: {
    value: "John",
  },
});

var secondProto = Object.create(firstProto, {
  sayHi: {
    value: function () {
      return "Hi " + this.name;
    },
  },
});

var bob = Object.create(secondProto, {
  name: {
    value: "Bob",
  },
});

var obj = Object.create(firstProto, {});

console.log(obj);
