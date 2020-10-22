// === Functions ===

/**
 * Functions
 */
// Name function
// function add(x, y) {
//   return x + y;
// }

// Anonymous function
// let myAdd = function(x, y) {
//   return x + y;
// }

/**
 * Function Types
 *
 * Typing the function
 */

function add(x: number, y: number): number {
  return x + y;
}

let myAdd1 = function (x: number, y: number): number {
  return x + y;
};

/**
 * Writing the function type
 */
let myAdd2: (x: number, y: number) => number = function (
  x: number,
  y: number
): number {
  return x + y;
};

// A function's type has the same two parts: the type of the arguments
// and the return type. When writing out the whole function type, both
// parts are required.
let myAdd3: (baseValue: number, increment: number) => number = function (
  x: number,
  y: number
): number {
  return x + y;
};

// The second part is the return type. We make it clear which is the return
// type by using an arrow (`=>`) between the parameters and the return type.

/**
 * Inferring the types
 */
// The parameters 'x' and 'y' have the type number
let myAdd4 = function (x: number, y: number): number {
  return x + y;
};

// myAdd has the full function type
let myAdd5: (baseValue: number, increment: number) => number = function (x, y) {
  return x + y;
};
// This is called "contextual typing", a from of type inference. This helps
// cut down on the amount of effort to keep your program typed.

/**
 * Optional and Default Parameters
 */
function buildName1(firstName: string, lastName: string) {
  return firstName + " " + lastName;
}

// let result1 = buildName1("Bob"); // error, too few parameters
// !Expected 2 arguments, but got 1.
// let result2 = buildName1("Bob", "Adams", "Sr."); // error, too
// !Expected 2 arguments, but got 3.
let result3 = buildName1("Bob", "Adams"); // ah, just right

// In JavaScript, every parameter is optional, and users may leave them off
// as they see fit.
function buildName2(firstName: string, lastName?: string) {
  if (lastName) return firstName + " " + lastName;
  else return firstName;
}

let result4 = buildName2("Bob"); // works correctly now
// let result5 = buildName2("Bob", "Adams", "Sr.");  // error, too
// Expected 1-2 arguments, but got 3.
let result6 = buildName2("Bob", "Adams"); // ah, just right

// Any optional parameters must follow required parameters.
// In TypeScript, we can also set a value that a parameter will be assigned
// if the use does not provide one, or if the user passes `undefined` in its
// place. These are called default-initialized parameters.
function buildName3(firstName: string, lastName = "Smith") {
  return firstName + " " + lastName;
}

let result7 = buildName3("Bob"); // works correctly now, returns "Bob Smith"
let result8 = buildName3("Bob", undefined); // still works, also returns "Bob Smith"
// let result9 = buildName3("Bob", "Adams", "Sr."); // error, too many parameters
// !Expected 1-2 arguments, but got 3.
let result9 = buildName3("Bob", "Adams"); // ah, just right

// Default-initialized parameters that come after all required parameters are
// treated as optional, and just like optional parameters, can be omitted(省略)
// when calling their respective(各自的) function. This means optional parameters
// and trailing default parameters will share commonality(通用性) in their types,
// so both
function buildName4(firstName: string, lastName?: string) {
  // ...
}
// and
function buildName5(firstName: string, lastName = "Smith") {
  // ...
}

/**
 * Rest(剩余) Parameters
 */
function buildName6(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}

// employeeName will be "Joseph Samuel Lucas MacKinzie"
let employeeName = buildName6("Joseph", "Samuel", "Lucas", "MacKinzie");

// Rest parameters are treated as boundless number of optional parameters.

// The ellipsis is also used in the type of the function with rest parameters:
let buildNameFun: (fname: string, ...rest: string[]) => string = buildName6;

/**
 * this
 *
 * In TypeScript, developers also need to learn how to use `this` and how to
 * spot when it's not being used correctly.
 *
 * this and arrow functions
 *
 * In JavaScript, `this`is a variable that's set when a function is called.
 */
let deck1 = {
  suits: ["hearts", "spades", "clubs", "diamonds"],
  cards: Array(52),
  createCardPicker: function () {
    return function () {
      let pickedCard: number = Math.floor(Math.random() * 52);
      let pickedSuit: number = Math.floor(pickedCard / 13);

      // return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
      // !'this' implicitly has type 'any' because it does not have a type annotation.
    };
  },
};

let cardPicker1 = deck1.createCardPicker();
let pickedCard1 = cardPicker1();

// alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

// Notice that `createCardPicker` is a function that itself returns a function.

let deck2 = {
  suits: ["hearts", "spades", "clubs", "diamonds"],
  cards: Array(52),
  createCardPicker: function () {
    // NOTE: the line below is now an arrow function, allowing us to capture 'this' right here
    return () => {
      let pickedCard = Math.floor(Math.random() * 52);
      let pickedSuit = Math.floor(pickedCard / 13);

      return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
    };
  },
};

let cardPicker2 = deck2.createCardPicker();
let pickedCard2 = cardPicker2();

alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);

/**
 * this parameters
 *
 * The type of `this.suits[pickedSuit] is `any`. That's because `this` comes from
 * the function expression inside the object literal. To fix this, you can provide
 * an explicit(显式的) `this` parameter are fake parameters that come first in the
 * parameter list of a function:
 */
function f(this: void) {
  // make sure `this` is unusable in this standalone function
}

interface Card {
  suit: string;
  card: number;
}

interface Deck {
  suits: string[];
  cards: number[];
  createCardPicker(this: Deck): () => Card;
}

let deck3: Deck = {
  suits: ["hearts", "spades", "clubs", "diamonds"],
  cards: Array(52),
  // NOTE: The function now explicitly specifies that its callee must be of type Deck
  createCardPicker: function (this: Deck) {
    return () => {
      let pickedCard = Math.floor(Math.random() * 52);
      let pickedSuit = Math.floor(pickedCard / 13);

      return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
    };
  },
};

let cardPicker3 = deck3.createCardPicker();
let pickedCard3 = cardPicker3();

alert("card: " + pickedCard3.card + " of " + pickedCard3.suit);
// Now TypeScript knows that `createCardPicker` expects to be called on a `Deck`
// object. That means that `this` is of type `Deck` now, not `any`, so
// `--noImplicitThis` will not cause any errors.

/**
 * this parameters in callbacks
 */
interface UIElement {
  addClickListener(onclick: (this: void, e: Event) => void): void;
}

// `this: void` means that `addClickListener` expects `onclick` to be a function
// that does not require a `this` type.

class Handler1 {
  info: string;
  onClickBad(this: Handler1, e: Event) {
    // oops, used `this` here. using this callback would crash at runtime
    // this.info = e.message;
  }
}

let h1 = new Handler1();
// uiElement.addClickListener(h1.onClickBad); // error!
// !Argument of type '(this: Handler, e: Event) => void' is not assignable to parameter of type '(this: void, e: Event) => void'.
// !The 'this' types of each signature are incompatible.
// !Type 'void' is not assignable to type 'Handler'.

// With `this` annotated, you make it explicit that `onClickBad` must be called
// on an instance of `Handler`. Then TypeScript will detect that `addClickListener`
// requires a function that has `this: void`. To fix the error, change the type of
// `this`:
class Handler2 {
  info: string;
  onClickGood(this: void, e: Event) {
    // can't use `this` here because it's of type void!
    console.log("clicked!");
  }
}

let h2 = new Handler2();
// uiElement.addClickListener(h2.onClickGood);

// Because `onClickGood` specifies its `this` type as `void`, it is legal to pass to
// `addClickListener`. Of course, this also means that it can't use `this.info`. If
// you want both then you'll have to use an arrow function:
class Handler3 {
  info: string;
  onClickGood = (e: Event) => {
    this.info = e.message;
  };
}

// This works because arrow functions use the outer `this`, so you can always pass
// them to something that expects `this: void`.

/**
 * Overloads
 *
 * JavaScript is inherently a very dynamic language. It's not uncommon for a single
 * JavaScript function to return different types of objects based on the shape of
 * the arguments passed in.
 */
let suits = ["hearts", "spades", "clubs", "diamonds"];

function pickCard0(x: any): any {
  // Check to see if we're working with an object/array
  // if so, they gave us the deck and we'll pick the card
  if (typeof x == "object") {
    let pickedCard = Math.floor(Math.random() * x.length);
    return pickedCard;
  }
  // Otherwise just let them pick the card
  else if (typeof x == "number") {
    let pickedSuit = Math.floor(x / 13);
    return { suit: suits[pickedSuit], card: x % 13 };
  }
}

let myDeck1 = [
  { suit: "diamonds", card: 2 },
  { suit: "spades", card: 10 },
  { suit: "hearts", card: 4 },
];

let pickedCard4 = myDeck1[pickCard0(myDeck1)];
alert("card: " + pickedCard4.card + " of " + pickedCard4.suit);

let pickedCard5 = pickCard0(15);
alert("card: " + pickedCard5.card + " of " + pickedCard5.suit);

// The answer is to supply multiple function types for the same function as a list
// of overloads. This list is what the compiler will use to resolve function calls.

function pickCard(x: { suit: string; card: number }[]): number;
function pickCard(x: number): { suit: string; card: number };
function pickCard(x: any): any {
  // Check to see if we're working with an object/array
  // if so, they gave us the deck and we'll pick the card
  if (typeof x == "object") {
    let pickedCard = Math.floor(Math.random() * x.length);
    return pickedCard;
  }
  // Otherwise just let them pick the card
  else if (typeof x == "number") {
    let pickedSuit = Math.floor(x / 13);
    return { suit: suits[pickedSuit], card: x % 13 };
  }
}

let myDeck2 = [
  { suit: "diamonds", card: 2 },
  { suit: "spades", card: 10 },
  { suit: "hearts", card: 4 },
];

let pickedCard6 = myDeck2[pickCard(myDeck2)];
alert("card: " + pickedCard6.card + " of " + pickedCard6.suit);

let pickedCard7 = pickCard(15);
alert("card: " + pickedCard7.card + " of " + pickedCard7.suit);

// With this change, the overloads now give us type checked calls to the `pickCard` 
// function.

// Note that the `function pickCard(x): any` piece is not part of the overload list, 
// so it only has two overloads: one that takes an object and one that takes a number. 
// Calling `pickCard` with any other parameter types would cause an error.
