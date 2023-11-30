const bajs = null;
// En klassdefinition, bör matcha "entity.name"
class MyClass {
  constructor(name) {
    this.name = name; // 'this' och 'name' bör inte matcha "entity.name"
  }

  // En metod, bör inte matcha "entity.name"
  greet() {
    console.log(`Hello, ${this.name}`);
  }
}

// Användning av en inbyggd klass, bör matcha "support.class"
const myMap = new Map();

// Användning av en inbyggd typ, bör matcha "support.type"
const myNumber = Number("42");

// Användning av en användardefinierad klass, bör matcha "entity.name"
const myInstance = new MyClass("John");
myInstance.greet();
