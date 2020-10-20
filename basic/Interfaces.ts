// === Interfaces ===

/**
 * One of TypeScript's core principles is that type checking
 * focuses on the shape that values have. This is sometimes
 * called "duck typing" or "structural subtyping".
 */

interface LabeledValue {
  label: string;
}

function printLabel(labeledObj: LabeledValue) {
  console.log(labeledObj.label);
}

let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);

/**
 * Optional Properties
 *
 * Not all properties of an interface may be required. Some
 * exist under certain conditions or may not be there at all.
 */
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare1(config: SquareConfig): { color: string; area: number } {
  let newSquare = { color: "white", area: 100 };
  if (config.color) {
    newSquare.color = config.color;
    // newSquare.color = config.clor;
    // !Property 'clor' does not exist on type 'SquareConfig'. Did you mean 'color'?
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

let mySquare1 = createSquare1({ color: "back" });

/**
 * Readonly properties
 *
 * Some properties should be modifiable when an object is
 * first created. You can specify this by putting `readonly`
 * before the name of the property:
 */
interface Point {
  readonly x: number;
  readonly y: number;
}
let p1: Point = { x: 10, y: 20 };
// p1.x = 5;
// !Cannot assign to 'x' because it is a read-only property.

// TypeScript comes with a `ReadonlyArray<T>` type that is
// the same as `Array<T>` with all mutating methods removed,
// so you can make sure you don't change your arrays after
// creation:
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;

// ro[0] = 12;
// !Index signature in type 'readonly number[]' only permits reading.
// ro.push(5)
// !Property assign to 'length' because it is a readonly property.
// a = ro;
// !The type 'readonly number[]' is 'readonly' and cannot be assigned to the mutable type 'number[]'.
// We can using type assertion to override it, though:
a = ro as number[];
// or
a = <number[]>ro;

// * readonly vs const *
/**
 * The easiest way to remember whether to use `readonly` or `const`
 * is to ask whether you're using it on a variable or a property.
 * Variables use `const` whereas properties use `readonly`.
 */

/**
 * Excess Property Checks
 */
function createSquare2(config: SquareConfig): { color: string; area: number } {
  return {
    color: config.color || "red",
    area: config.width ? config.width * config.width : 20,
  };
}
// let mySquare2 = createSquare2({ colour: "red", width: 100 });
// !Argument of type '{ colour: string; width: number; }' is not assignable to parameter of type 'SquareConfig'.
// ! Object literal may only specify known properties, but 'colour' does not exist in type 'SquareConfig'. Did you mean to write 'color'?

// Notice the given argument to `createSquare` is spelled colour
// instead of `color`. In plain JavaScript, this sort of thing
// fails silently.

// Getting around these is actually really simple. The easiest
// method is to just use a type assertion:
let mySquare = createSquare1({ width: 100, opacity: 0.5 } as SquareConfig);

// If `SquareConfig` can have `color` and `width` properties with
// the above types, but could also have any number of other properties,
// then we could define it like so:
interface SquareConfig3 {
  color?: string;
  width?: number;
  [propName: string]: any;
}

/**
 * Function Types
 *
 * Interfaces are capable(能够) of describing the wide range of shapes
 * that JavaScript objects can take. In addition to describing an
 * object with properties, interfaces are also capable of describing
 * function types.
 */
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;

mySearch = (source: string, subString: string) => {
  let result = source.search(subString);
  return result > -1;
};

// mySearch = (src, sub) => {
// !Type '(src: string, sub: string) => string' is not assignable to type 'SearchFunc'.
// !Type 'string' is not assignable to type 'boolean'.
//   let result = src.search(sub);
//   return "string";
// }

/**
 * Indexable(可索引的) Types
 *
 * We can also describe types that we can "index into" like `a[10]`,
 * or `ageMap["daniel"].
 * Indexable types have an index signature that describes the types
 * we can use into the object, along with the corresponding return
 * types when indexing.
 */
interface StringArray {
  [index: number]: string;
}

let myArray1: StringArray;
myArray1 = ["Bob", "Fred"];

let myStr: string = myArray1[0];
// This index signature states that when a `StringArray` is indexed
// with a `number`, it will return a `string`.

// When indexing with a `number`, JavaScript will actually convert
// that to a `string` before indexing into an object.
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

// Error: indexing with a numeric string might get you a completely separate type of Animal!
interface notOkay {
  // [x: number]: Animal;
  // !Numeric index type 'Animal' is not assignable to string index type 'Dog'.
  [x: string]: Dog;
}

// While string index signatures are a powerful way to describe the
// "dictionary" pattern, they also enforce(确保) that all properties
// match their return type. This is because a string index declares
// that `obj.property` is also available as `obj["property"].
interface NumberDictionary {
  [index: string]: number;
  length: number; // ok, length is a number
  // name: string; // error, the type of 'name' is not a subtype of the indexer
  // !Property 'name' of type 'string' is not assignable to string index type 'number'.
}

// However, properties of different types are acceptable if the index signature
// is a union of the property types:
interface NumberOrStringDictionary {
  [index: string]: number | string;
  length: number; // ok, length is a number
  name: string; // ok, name is a string
}

// Finally, you can make index signatures `readonly` in order to prevent assignment
// to their indices:
interface ReadonlyStringArray {
  readonly [index: number]: string;
}

let myArray2: ReadonlyStringArray = ["Alice", "Bob"];
// myArray2[2] = "Mallory"; // error!
// !Index signature in type 'ReadonlyStringArray' only permits reading.

/**
 * Class Types
 *
 * Implementing an interface
 * One of the most common uses of interfaces in languages like C#
 * and Java, that of explicitly enforcing that a class meets a
 * particular contract, is also possible in TypeScript.
 */
interface ClockInterface1 {
  currentTime: Date;
}

class Clock1 implements ClockInterface1 {
  currentTime: Date = new Date();
  constructor(h: number, m: number) {}
}

// We can also describe methods in an interface that are implemented
// in the class, as we do with `setTime` in the below example:
interface ClockInterface2 {
  currentTime: Date;
  setTime(d: Date): void;
}

class Clock2 implements ClockInterface2 {
  currentTime: Date = new Date();
  setTime(d: Date) {
    this.currentTime = d;
  }
  constructor(h: number, m: number) {}
}

// Interfaces describe the public side of the class, rather than both
// the public and private side. This prohibits(禁止) you from using
// them to check that a class also has particular types for the private
// side of the class instance.

// * Difference between the static and instance sides of classes *
// Keep in mind that a class has two types: the type of the static side
// and the type of the instance side.

// interface ClockConstructor {
//   new (hour: number, minute: number);
// }

// class Clock3 implements ClockConstructor {
// !Class 'Clock' incorrectly implements interface 'ClockConstructor'.
// !Type 'Clock' provides no match for the signature 'new (hour: number, minute: number): any'.
//   currentTime: Date;
//   constructor(h: number, m: number) {}
// }

// This is because when a class implements an interface, only the instance
// side of the class directly.
interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface3;
}

interface ClockInterface3 {
  tick(): void;
}

function createClock(
  ctor: ClockConstructor,
  hour: number,
  minute: number
): ClockInterface3 {
  return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface3 {
  constructor(h: number, m: number) {}
  tick() {
    console.log("beep beep");
  }
}

class AnalogClock implements ClockInterface3 {
  constructor(h: number, m: number) {}
  tick() {
    console.log("tick tock");
  }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);

interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface3;
}

interface ClockInterface3 {
  tick(): void;
}

const Clock: ClockConstructor = class Clock implements ClockInterface3 {
  constructor(h: number, m: number) {}
  tick() {
    console.log("beep beep");
  }
};

/**
 * Extending Interfaces
 *
 * Like classes, interfaces can extend each other. This allows you to
 * copy the members of one interface into another, which gives you more
 * flexibility in how you separate your interfaces into reusable components.
 */
interface Shape {
  color: string;
}

interface Square1 extends Shape {
  sideLength: number;
}

let square1 = {} as Square1;
square1.color = "blue";
square1.sideLength = 10;

// An interface can extend multiple interfaces, creating a combination of
// all the interfaces.
interface PenStroke {
  penWidth: number;
}

interface Square2 extends Shape, PenStroke {
  sideLength: number;
}

let square2 = {} as Square2;
square2.color = "blue";
square2.sideLength = 10;
square2.penWidth = 5.0;

/**
 * Hybrid(混合) Types
 */
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

function getCounter(): Counter {
  let counter = function (start: number) {} as Counter;
  counter.interval = 123;
  counter.reset = function () {};
  return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;

/**
 * Interfaces Extending Classes
 *
 * When an interface type extends a class type it inherits the members of
 * the class but not their implementations. It is as if the interface had
 * declared all of the members of the class without providing an
 * implementation. Interfaces inherit even the private and protected members
 * of a base class. This means that when you create an interface that extends
 * a class with private or protected members, that interface type can only
 * be implemented by that class or a sub class of it.
 * This is useful when your have a large inheritance hierarchy(层次；结构),
 * but want to specify that your code works with only subclasses that have
 * certain properties. The subclasses don't have to be related besides
 * inheriting from the base class.
 */
class Control {
  private state: any;
}

interface SelectableControl extends Control {
  select(): void;
}

class Button extends Control implements SelectableControl {
  select() {}
}

class TextBox extends Control {
  select() {}
}

// class ImageControl implements SelectableControl {
// !Class 'ImageControl' incorrectly implements interface 'SelectableControl'.
// !Types have separate declarations of a private property 'state'.
//   private state: any;
//   select() {}
// }
// In the above example, `SelectableControl contains all of the members of
// `Control`, including the private `state` property. Since `state` is a
// private member it is only possible for descendants(后代) of `Control` to
// implement `SelectableControl`. This is because only descendants of
// `Control` will have a `state` private member that originates in the same
// declaration, which is a requirement for private members to be compatible.
