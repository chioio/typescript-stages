// === Enums ===

/**
 * Enums allow developer to define a set of named constants. Using
 * enums can make it easier to document intent, or create a set of
 * distinct(清晰的) cases.
 */

/**
 * Numeric enums
 */
enum Direction {
  Up = 1,
  Down,
  Left,
  Right,
}

enum UserResponse {
  No = 0,
  Yes = 1,
}

function respond(recipient: string, message: UserResponse): void {
  // ...
}

respond("Princess Caroline", UserResponse.Yes);

// Enums without initializers either need to be first, or have to come after
// numeric enums initialized with numeric constants or other constant enum
// members.
function getSomeValue(): number {
  return 1;
}

enum E {
  A = getSomeValue(),
  // B
  // !Enum member must have initializer
}

/**
 * String enums
 *
 * In a string enum, each member has to be constant-initialized whit a string
 * literal, or with another string enum member.
 */
enum Direction2 {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}
// While string enums don't have auto-incrementing behavior, string enums have
// the benefit that they "serialize" well.

/**
 * Heterogeneous(各种各样的) enums
 *
 * Technically enums can be mixed with string and numeric members, but it's
 * not clear why you would ever want to do so:
 */
enum BooleanLikeHeterogeneousEnum {
  No = 0,
  Yes = "YES",
}

/**
 * Computed and constant members
 *
 * Each enum member has a value associated with it which can be either constant
 * or computed. An enum member is considered constant if:
 */
// E.X is constant:
enum E {
  X, // 0
}

// All enum members in 'E1' and 'E2' are constant.
enum E1 {
  X,
  Y,
  Z,
}

enum E2 {
  A = 1,
  B,
  C,
}

// enum member is considered computed.
enum FileAccess {
  // constant members
  None,
  Read = 1 << 1,
  Write = 1 << 2,
  ReadWrite = Read | Write,
  // computed member
  G = "123".length,
}

/**
 * Union enums and enum member types
 *
 * There is a special subset of constant enum members that aren't calculated:
 * literal enum members. A literal enum member is a constant enum member
 * with no initialized value, or with values that are initialized to
 *
 * * any string literal (e.g."foo", "bar", "baz")
 * * any numeric literal (e.g. 1, 100)
 * * unary minus applied to any numeric literal (e.g. -1, -100)
 *
 * When all members in an enum have literal enum values, some special semantics(语义)
 * come to play.
 * The first is that enum members also become types as well!
 */
enum ShapeKind {
  Circle,
  Square,
}

interface Circle {
  kind: ShapeKind.Circle;
  radius: number;
}

interface Square {
  kind: ShapeKind.Square;
  radius: number;
}

// let c4: Circle = {
// kind: ShapeKind.Square,
// !Type 'ShapeKind.Square' is not assignable to type 'ShapeKind.Circle'.
// radius: 100,
// };

// Enum types themselves effectively(本身地；实际地)
// become a union of each enum member.
enum E2 {
  Foo,
  Bar,
}

function f(x: E2) {
  // if (x !== E2.Foo || x !== E2.Bar) {
  // !This condition will always return 'true' since the types 'E.Foo' and 'E.Bar' have no overlap(共同之处).
  // ...
  // }
}

/**
 * Enums at runtime
 *
 * Enums are real objects that exist at runtime.
 */
enum E3 {
  X,
  Y,
  Z,
}
// can actually be passed around to functions
function f2(obj: { X: number }) {
  return obj.X;
}

// Works, since 'E' has a property named 'X' which is a number.
f2(E3);

/**
 * Enums at compile time
 *
 * Even though Enums are real objects that exist at runtime, the `typeof`
 * keyword works differently than you might expect for typical objects.
 * Instead, use `keyof typeof` to get a Type that represents all Enum keys
 * as strings.
 */
enum LogLevel {
  ERROR,
  WARN,
  INFO,
  DEBUG,
}

/**
 * This is equivalent to:
 * type LogLevelStrings = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';
 */
type LogLevelStrings = keyof typeof LogLevel;

function printImportant(key: LogLevelStrings, message: string) {
  const num = LogLevel[key];
  if (num <= LogLevel.WARN) {
    console.log("Log level key is:", key);
    console.log("Log level value is:", num);
    console.log("Log level message is:", message);
  }
}

printImportant("ERROR", "This is a message");

/**
 * Reverse mappings
 *
 * In addition to creating an object with property names for members,
 * numeric enums members also get a reverse mapping from enum values
 * to enum names.
 */
enum Enum {
  A,
}

let a2 = Enum.A;
let nameOfA = Enum[a2]; // "A"

// TypeScript compiles this down to the following JavaScript:
// "use strict";
// var Enum2;
// (function (Enum2) {
//   Enum2[Enum["A"] = 0] = "A";
// })(Enum2 || (Enum2 = {}));
// let a3 = Enum2.A;
// let nameOfA2 = Enum[a3]; // "A"

// In this generated code, an enum is compiled into an object that stores
// both forward (`name` -> `value`) and reverse (`value` -> `name`) mapping.

/**
 * * Keep in mind that string enum members do not get a reverse mapping
 * * generated at all.
 */

/**
 * const enums
 *
 * To avoid paying the cost of extra generated code and additional indirection
 * when accessing enum values, it's possible to use `const` enums.
 */

const enum Enum3 {
  A = 1,
  B = A * 2,
}

/**
 * Const enums can only use constant enum expressions and unlike regular enums
 * they are completely removed during compilation.
 *
 * Const enum members are inlined at use sites. This possible since const enums
 * cannot have computed members.
 */
const enum Direction3 {
  Up,
  Down,
  Left,
  Right,
}

let directions = [
  Direction3.Up,
  Direction3.Down,
  Direction3.Left,
  Direction3.Right,
];

// in generated code will become
("use strict");
let directions2 = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];

/**
 * Ambient(外部的；周围的) enums
 *
 * Ambient enums are used to describe the shape of already existing enum types.
 */
declare enum Enum4 {
  A = 1,
  B,
  C = 2,
}

/**
 * * One important different between ambient and non-ambient enums is 
 * * that, in regular enums, members that don't have an initializer will 
 * * be considered constant if its preceding(先于) enum member is considered 
 * * constant. In contrast, an ambient (and non-const) enum member that 
 * * does not have initialized is always considered computed.
 */
