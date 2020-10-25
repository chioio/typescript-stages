// === Classes ===

/**
 * Traditional JavaScript uses functions and prototype-based inheritance to build
 * up reusable components, but this may feel a bit awkward(不方便的) to programmers
 * more comfortable with an object-oriented approach, where classes inherit
 * functionality and objects are build from these classes.
 */

/**
 * Classes
 */
class Greeter {
  greeting: string;

  constructor(message: string) {
    this.greeting = message;
  }

  greet() {
    return "Hello, " + this.greeting;
  }
}

let greeter = new Greeter("world");

/**
 * Inheritance
 *
 * In TypeScript, we can use common object-oriented patterns. One of the most
 * fundamental patterns in class-based programming is being able to extend
 * existing classes to create new ones using inheritance.
 */
class Animal {
  name: string;
  constructor(theName: string) {
    this.name = theName;
  }
  move(distanceInMeters: number = 0) {
    console.log(`Animal moved ${distanceInMeters}m.`);
  }
}

class Dog extends Animal {
  bark() {
    console.log("Woof! Woof!");
  }
}

class Snake extends Animal {
  constructor(name: string) {
    super(name);
  }
  move(distanceInMeters = 5) {
    console.log("Slithering...");
    super.move(distanceInMeters);
  }
}

class Horse extends Animal {
  constructor(name: string) {
    super(name);
  }
  move(distanceInMeters = 45) {
    console.log("Galloping...");
    super.move(distanceInMeters);
  }
}

const dog = new Dog("dog");
dog.bark();
dog.move(10);
dog.bark();

let sam = new Snake("Sammy the Python");
let tom: Animal = new Horse("Tommy the Palomino");

sam.move();
tom.move(34);

// Classes inherit properties and methods from base classes.

// Before we ever access a property on `this` in a constructor body, we have
// to call `super()`. This is an important rule that TypeScript will enforce.

/**
 * Public, private, and protected modifiers
 *
 * Public by default
 * In TypeScript, each member is `public` default.
 */
class Animal2 {
  public name: string;

  public constructor(theName: string) {
    this.name = theName;
  }

  public move(distanceInMeters: number) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}

/**
 * ECMAScript Private Fields
 */
class Animal3 {
  #name: string;
  constructor(theName: string) {
    this.#name = theName;
  }
}

// new Animal3("Cat").#name;
// !Property '#name' is not accessible outside class 'Animal3' because it has a private identifier.

// This syntax is built into the JavaScript runtime and can have better guarantees
// about the isolation(分离) of each private field.

/**
 * Understanding TypeScript's private
 *
 * TypeScript also has its own way to declare a member as being marked `private`,
 * it cannot be accessed from outside of its containing class.
 */
class Animal4 {
  private name: string;

  constructor(theName: string) {
    this.name = theName;
  }
}

// new Animal4("Cat").name;
// !Property 'name' is private and only accessible within class 'Animal4'.

/**
 * TypeScript is a structural type system. When we compare two different types,
 * regardless(忽略) of where they came from, if the types of all members are
 * compatible(相符的；兼容的), then we say the types themselves are compatible.
 *
 * However, when comparing types that have `private` and `protected` members,
 * we treat these types differently. For two types to be considered compatible,
 * if one of them has a `private member, then the other must have a `private`
 * member that originated in the same declaration. The same applies to
 * `protected` members.
 */
class Animal5 {
  private name: string;
  constructor(theName: string) {
    this.name = theName;
  }
}

class Rhino extends Animal5 {
  constructor() {
    super("Rhino");
  }
}

class Employee {
  private name: string;
  constructor(theName: string) {
    this.name = theName;
  }
}

let animal = new Animal5("Goat");
let rhino = new Rhino();
let employee = new Employee("Bob");

animal = rhino;
// animal = employee;
// !Type 'Employee' is not assignable to type 'Animal5'.
// !Types have separate declarations of a private property 'name'.

/**
 * Understanding protected
 *
 * The `protected` modifier acts much like the `private` modifier with the
 * exception that members declared `protected` can also be accessed within
 * deriving classes. For example,
 */
class Person {
  protected name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class Employee2 extends Person {
  private department: string;

  constructor(name: string, department: string) {
    super(name);
    this.department = department;
  }

  public getElevatorPitch() {
    return `Hello, my name is ${this.name} and I work in ${this.department}.`;
  }
}

let howard = new Employee2("Howard", "Sales");
console.log(howard.getElevatorPitch());
// console.log(howard.name);
// !Property 'name' is protected and only accessible within class 'Person' and its subclasses.

// Notice that while we can't use `name` from outside of `Person`, we can
// still use it from within an instance method of `Employee` because `Employee`
// derives from `Person`.

// A constructor may also be marked `protected`. This means that the class
// cannot be instantiated outside of its containing class, but can be extended.
class Person2 {
  protected name: string;
  protected constructor(theName: string) {
    this.name = theName;
  }
}

// Employee can extend Person
class Employee3 extends Person {
  private department: string;

  constructor(name: string, department: string) {
    super(name);
    this.department = department;
  }

  public getElevatorPitch() {
    return `Hello, my name is ${this.name} and I work in ${this.department}.`;
  }
}

let howard2 = new Employee3("Howard", "Sales");
// let john = new Person("John");
// !Constructor of class 'Person' is protected and only accessible within the class declaration.

/**
 * Readonly modifier
 *
 * Readonly properties must be initialized at their declaration or in the
 * constructor.
 */
class Octopus {
  readonly name: string;
  readonly numberOfLegs: number = 8;

  constructor(theName: string) {
    this.name = theName;
  }
}

let dad = new Octopus("Man with the 8 strong legs");
// dad.name = "Man with the 3-piece suit";
// !Cannot assign to 'name' because it is a read-only property.

/**
 * Parameter properties
 *
 * Parameter properties let you create and initialized a member in one place.
 */
class Octopus2 {
  readonly numberOfLegs: number = 8;
  constructor(readonly name: string) {}
}

let dad2 = new Octopus("Man with the 8 strong legs");
dad2.name;

/**
 * Accessors
 *
 * TypeScript supports getters/setters as a way of intercepting(拦截) accesses
 * to a member of an object.
 */
class Employee4 {
  fullName: string;
}

let employee2 = new Employee4();
employee2.fullName = "Bob Smith";

if (employee2.fullName) {
  console.log(employee2.fullName);
}

const fullNameMaxLength = 10;

class Employee5 {
  private _fullName: string = "";

  get fullName(): string {
    return this._fullName;
  }

  set fullName(newName: string) {
    if (newName && newName.length > fullNameMaxLength) {
      throw new Error("fullName has a max length of " + fullNameMaxLength);
    }

    this._fullName = newName;
  }
}

let employee3 = new Employee5();
employee3.fullName = "Bob Smith";

if (employee3.fullName) {
  console.log(employee3.fullName);
}

/**
 * Static Properties
 */
class Grid {
  static origin = { x: 0, y: 0 };

  calculateDistanceFromOrigin(point: { x: number; y: number }) {
    let xDist = point.x - Grid.origin.x;
    let yDist = point.y - Grid.origin.y;
    return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
  }

  constructor(public scale: number) {}
}

let grid1 = new Grid(1.0); // 1x scale
let grid2 = new Grid(5.0); // 5x scale

console.log(grid1.calculateDistanceFromOrigin({ x: 10, y: 10 }));
console.log(grid2.calculateDistanceFromOrigin({ x: 10, y: 10 }));

/**
 * Abstract Classes
 *
 * Abstract classes are base classes from which other  classes may be
 * derived. They may not be instantiate directly. Unlike an interface,
 * an abstract class may contain implementation details for its members.
 */
abstract class Animal6 {
  abstract makeSound(): void;

  move(): void {
    console.log("roaming the earth...");
  }
}

// Methods within an abstract class that are marked as abstract do not
// contain an implementation and must be implemented in derived classes.
// Abstract methods share a similar syntax to interface methods. Both
// define the signature of a method without including a method body.
abstract class Department {
  constructor(public name: string) {}

  printName(): void {
    console.log("Department name: " + this.name);
  }

  abstract printMeeting(): void; // must be implemented in derived classes
}

class AccountingDepartment extends Department {
  constructor() {
    super("Accounting and Auditing"); // constructors
  }

  printMeeting(): void {
    console.log("The Accounting Department meets each Monday at 10am.");
  }

  generateReports(): void {
    console.log("Generating accounting reports...");
  }
}

let department: Department; // ok to create a reference to an abstract type
// department = new Department();  // error: cannot create an instance of an abstract class
// !Cannot create an instance of an abstract class.
department = new AccountingDepartment(); // ok to create and assign a non-abstract subclass
department.printName();
department.printMeeting();
// department.generateReports();
// !Property 'generateReports' does not exist on type 'Department'.

/**
 * Advanced Techniques
 *
 * Constructor functions
 */
class Greeter2 {
  greeting: string;

  constructor(message: string) {
    this.greeting = message;
  }

  greet() {
    return "Hello, " + this.greeting;
  }
}

let greeter2: Greeter2;
greeter2 = new Greeter("world");
console.log(greeter.greet()); // "Hello, world"

class Greeter3 {
  static standardGreeting = "Hello, there";
  greeting: string;
  greet() {
    if (this.greeting) {
      return "Hello, " + this.greeting;
    } else {
      return Greeter3.standardGreeting;
    }
  }
}

let greeter3: Greeter3;
greeter3 = new Greeter3();
console.log(greeter3.greet()); // "Hello, there"

let greeterMaker: typeof Greeter3 = Greeter3;
greeterMaker.standardGreeting = "Hey there!";

let greeter4: Greeter3 = new greeterMaker();
console.log(greeter4.greet());  // "Hey there!"

/**
 * Using a class as an interface
 * 
 * A class declaration creates two things: a type representing instances of the class and 
 * a constructor function.
 */
class Point {
  readonly x: number;
  readonly y: number;
}

interface Point3d extends Point {
  z: number;
}

let point3d: Point3d = { x: 1, y: 2, z: 3};
