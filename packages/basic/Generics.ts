// === Generics ===

function identity(arg: number): number {
  return arg;
}

function identity2(arg: any): any {
  return arg;
}
// While using `any` is certainly in that it will cause the function to
// accept any and all types for the type of `arg`, we actually are losing
// the information about what that was when the function returns.

// Instead, we need a way of capturing the type of the argument in such a
// way that we can also use it to denote what is being returned.
function identity3<T>(arg: T): T {
  return arg;
}

// We say that this version of the `identity` function is generic, as it
// works over a range of types.

let output = identity3<string>("myString");
//       ^ = let output: string

/**
 * Working with Generic Type Variables
 */
function identity4<T>(arg: T): T {
  // console.log(arg.length);
  // !Property 'length' does not exist on type 'T'.
  return arg;
}

function loggingIdentity<T>(arg: T[]): T[] {
  console.log(arg.length);
  return arg;
}

function loggingIdentity2<T>(arg: Array<T>): Array<T> {
  console.log(arg.length); // Array has a .length, so no more error
  return arg;
}

/**
 * Generic Types
 *
 * The type of generic functions is just like those of non-generic function,
 * with the type parameters listed first, similarly to function declarations:
 */
function identity5<T>(arg: T): T {
  return arg;
}

let myIdentity: <T>(arg: T) => T = identity5;

// We could also have used a different name for the generic type parameter in
// the type.
let myIdentity2: <U>(arg: U) => U = identity5;

// We can also write the generic type as a call signature of an object literal type:
let myIdentity3: { <T>(arg: T): T } = identity5;

interface GenericIdentityFn {
  <T>(arg: T): T;
}

let myIdentity4: GenericIdentityFn = identity3;

interface GenericIdentityFn2<T> {
  (arg: T): T;
}

let myIdentity5: GenericIdentityFn2<number> = identity3;

/**
 * Generic Classes
 *
 * A generic class has a similar shape to generic interface. Generic
 * classes have a generic type parameter list in angle brackets(`<>`)
 * following the name of the class.
 */
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
};

// @strict: false
class GenericNumber2<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

// ---cut---
let stringNumeric = new GenericNumber2<string>();
stringNumeric.zeroValue = "";
stringNumeric.add = function (x, y) {
  return x + y;
};

console.log(stringNumeric.add(stringNumeric.zeroValue, "test"));

// Just as with interface, putting the type parameter on the class itself lets
// us make sure all of the properties of the class are working with the same type.

/**
 * Generic Constraints(约束)
 */
interface Lengthwise {
  length: number;
}

function loggingIdentity3<T extends Lengthwise>(arg: T): T {
  console.log(arg.length); // Now we know it has a .length
  return arg;
}
// loggingIdentity3(3);
// !Argument of type 'number' is not assignable to parameter of type 'Lengthwise'.
loggingIdentity3({ length: 10, value: 3 });

/**
 * Using Type Parameters in Generic Constraints
 */
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

let x2 = { a: 1, b: 2, c: 3, d: 4 };
getProperty(x2, "a");
// getProperty(x2."m");
// !Argument of type '"m"' is not assignable to parameter of type '"a" | "b" | "c" | "d"'.

/**
 * Using Class Types in Generics
 * 
 * When creating factories in TypeScript using generics, it is necessary to 
 * refer to class types by their constructor function.
 */
class BeeKeeper {
  hasMask: boolean;
}

class ZooKeeper {
  nametag: string;
}

class Animal7 {
  numLegs: number;
}

class Bee extends Animal7 {
  keeper: BeeKeeper;
}

class Lion extends Animal7 {
  keeper: ZooKeeper
}

function createInstance<A extends Animal7>(c: new () => A): A {
  return new c();
}

createInstance(Lion).keeper.nametag;
createInstance(Bee).keeper.hasMask;
