// === Basic Types ===

/**
 * @type boolean
 */
let isDone: boolean = false;

/**
 * @type number
 */
let dec: number = 6;
let hex: number = 0xf00d;
let bin: number = 0b1010;
let oct: number = 0o744;
let big: bigint = 100n; // !The `bigint` is the latest type in ES2020.

/**
 * @type string
 */
let color: string = "blue";
color = "red";
// Templates strings
let fullName: string = `Tenn Chio`;
let age: number = 22;
let sentence1: string = `Hello, my name is ${fullName}.

I'll be ${age + 1} years old next month.`;
// This is equivalent to declaring `sentence2` like so:
let sentence2: string =
  "Hello, my name is " +
  fullName +
  ".\n\n" +
  "I'll be " +
  (age + 1) +
  " years old next month.";

/**
 * @type Array
 *
 * TypeScript, like JavaScript, allows you to work
 * with arrays of values.
 */
let list1: number[] = [1, 2, 3];
// As same as using a generic array type `Array<elemType>`,
// like so:
let list2: Array<number> = [1, 2, 3];

/**
 * @type Tuple
 *
 * Tuple types allow you to express an array with
 * a fixed number of elements whose types are known,
 * but need not be the same.
 */
// Declare a tuple type
let x: [string, number];
// Initialize it
x = ["hello", 10]; // OK
// Initialize it incorrectly
// x = [10, "hello"];
// !Type 'number' is not assignable to type 'string'.
// !Type 'string' is not assignable to type 'number'.

// When accessing an element with a known index, the
// correct type is retrieved:
// OK
console.log(x[0].substring(1));
// console.log(x[1].substring(1));
// !Property 'substring' does not exist on type 'number'.

// Accessing an element outside the set of known
// indices(索引) fails with an error:
// x[3] = "world";
// !Tuple type '[string, number]' of length '2' has no element at index '3'.
// console.log(x[5].toString());
// !Object is possibly ' undefined'. Tuple type '[string, number]' of length '2' has no element at index '5'.

/**
 * @type Enum
 *
 * A helpful addition to the standard set of datatypes
 * from JavaScript is the `enum`. As in languages like
 * C#/Java, an enum is a way of giving more friendly
 * names to sets of numeric values.
 */
enum Color1 {
  Red,
  Green,
  Blue,
}
let c1: Color1 = Color1.Green;

// By default, enums begin numbering their members starting
// at `0`. You can change this by manually setting the value
// of one of its members.
enum Color2 {
  Red = 1,
  Green,
  Blue,
}
let c2: Color2 = Color2.Green;
enum Color3 {
  Red = 1,
  Green = 2,
  Blue = 4,
}
let c3: Color3 = Color3.Green;

// A handy feature of enums is that you can also go from
// a numeric value to the name of that value in the enum.
let colorName: string = Color2[2];
// Displays 'Green'
console.log(colorName);

/**
 * @type Unknown
 *
 * Describe the type of variables that we do not know when
 * wei are writing an application. These value may come
 * from dynamic content.
 */
let notSure: unknown = 4;
notSure = "maybe a string instead";
// OK, definitely a boolean
notSure = false;

// If you have a variable with an unknown type, you can narrow
// it to something more specific by doing `typeof` checks,
// comparison checks, or more advanced type guards(保护).
declare const maybe: unknown;
// 'maybe' could be a string, object, boolean, undefined, or other types
// const aNumber: number = maybe;
// !Type 'unknown' is not assignable to type 'number'.

if (maybe === true) {
  // TypeScript knows that maybe is a boolean now
  const aBoolean: boolean = maybe;
  // So, it cannot be a string
  // const aString: string = maybe;
  // !Type 'boolean' is not assignable to type 'string'.
}
if (typeof maybe === "string") {
  // TypeScript knows that maybe is a string
  const aString: string = maybe;
  // So, it cannot be a boolean
  // const aBoolean: boolean = maybe;
  // !Type 'string' is not assignable to type 'boolean'.
}

/**
 * @type Any
 *
 * In some situations, not all type information is available
 * or its declaration would take an inappropriate(不适当)
 * amount of effort.
 */
declare function getValue(key: string): any;
// OK, return value of 'getValue' is not checked
const str: string = getValue("myString");

// Unlike `unknown`, variables of type `any` allow you to
// access arbitrary(任意的) properties, even ones that don't
// exist.
let looselyTyped1: any = 4;
// OK, ifItExists might exist at runtime
looselyTyped1.ifItExists();
// OK, toFixed exists (but the compiler doesn't check)
looselyTyped1.toFixed();

let strictlyTyped: unknown = 4;
// strictlyTyped.toFixed();
// !Object is of type 'unknown'.

// the `any` will continue to propagate through your objects:
let looselyTyped2: any = {};
let d = looselyTyped2.a.b.c.d;
//  ^ = let d: any

/**
 * @type Void
 *
 * `void` is a little like the opposite of `any`: the absence(没有)
 * of having any type at all.
 */
function warnUser(): void {
  console.log("This is my warning message");
}
// Declaring variables of type `void` is not useful because you
// can only assign `null` (only if `--strictNullChecks` is not
// specified) or `undefined` to them:
let unusable: void = undefined;
// OK if `--strictNullChecks` is not given
// unusable = null;
// `--strictNullChecks` is given
// !Type 'null' is not assignable to type 'void'.

/**
 * @type Null and Undefined
 *
 * In TypeScript, both `undefined` and `null` actually have their
 * types named `undefined` and `null` respectively(分别地). Much
 * like `void`, they're not extremely useful on their own:
 */
// Not much else we can assign to these variables!
let u: undefined = undefined;
let n: null = null;

// By default `null` and `undefined` are subtypes of all other types.
// That means you can assign `null` and `undefined` to something like
// `number`/`string`/`boolean` etc.

/**
 * @type Never
 *
 * The `never` type represents the type of values that never occur.
 * For instance, `never` is the return type of a function expression
 * or an arrow function expression that always throws an exception or
 * one that never by any type guards that can never be true.
 *
 * The `never` type is a subtype of, and assignable to, every type;
 * however, no type is a subtype of, or assignable to, `never` (except
 * `never` it self). __ Even `any` isn't assignable `never`. __
 */
// Function returning never must not have a reachable end point
function error(message: string): never {
  throw new Error(message);
}
// Inferred return type is never
function fail() {
  return error("Something failed");
}
// Function returning never must not have a reachable end point
function infiniteLoop(): never {
  while (true) {}
}

/**
 * @type Object
 *
 * `object` is a type that represents the non-primitive type, i.e.
 * anything that is not `number`, `string`, `boolean`, `bigint`,
 * `symbol`, `null`, or `undefined`.
 *
 * With `object` type APIs like `Object.create` can be better
 * represented.
 *
 * Generally, you won't need to use this.
 */
declare function create(o: object | null): void;

// OK
create({ prop: 0 });
create(null);

// create(42);
// !Argument of type '42' is not assignable to parameter of type 'object | null'.
// create("string");
// !Argument of type '"string"' is not assignable to parameter of type 'object | null'.
// create(false);
// !Argument of type 'false' is not assignable to parameter of type 'object | null'.
// create(undefined);
// !Argument of type 'undefined' is not assignable to parameter of type 'object | null'.

/**
 * Type assertions(类型断言)
 *
 * Sometimes you'll end up in a situation where you'll known more
 * about a value than TypeScript does. Usually, this will happen
 * when you known the type of some entity could be more specific
 * than its current type.
 *
 * Type assertions are a way to tell the compiler "trust me, I
 * know what I'm doing." A type assertion is like a type cast in
 * other languages, but it performs no special checking or
 * restructuring of data. It has no runtime impact and is used
 * purely by the compiler. TypeScript assumes that you, the
 * programmer, have performed any special checks that you need.
 */
// `as`-syntax:
let someValue: unknown = "this is a string";
let strLength1: number = (someValue as string).length;
// "angle-bracket" syntax:
let strLength2: number = (<string>someValue).length;
// When using TypeScript with JSX, only `as`-style assertions are allowed.

/**
 * About Number, String, Boolean, Symbol and Object
 *
 * It can be tempting to think that the types `Number`, `String`, `Boolean`,
 * `Symbol`, or `Object` are the same as the lowercase versions recommended
 * above. These types do not refer to the language primitives however, and
 * almost never should be used as a type.
 */
function reverse1(s: String): String {
  return s.split("").reverse().join("");
}
reverse1("hello world");
// Instead, use the types `number`, `string`, `boolean`, `object` and `symbol`.
function reverse2(s: string): string {
  return s.split("").reverse().join("");
}
reverse2("hello world");
