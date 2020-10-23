// === Literal(字面的) Types ===

/**
 * Literal Types
 *
 * A literal is a more concrete(具体的) sub-type of a collective type.
 * What this means is that "Hello World" is a `string`, but a `string`
 * is not "Hello World" inside the type system.
 *
 * There are three sets of literal types available in TypeScript today:
 * strings, numbers, and booleans.
 */

/**
 * Liter Narrowing(缩窄)
 */
// We're making a guarantee(保证) that this variable helloWorld will
// never change, by using const.

// So, TypeScript sets the type to be "Hello World" not string
const helloWorld = "Hello World";

// On the other hand, a let can change, and so the compiler declares
// it a string
let hiWorld = "Hi World";

/**
 * String Literal Types
 *
 * In practice string literal types combine nicely with union types,
 * type guards, and type aliases. You can use these features together
 * to get enum-like behavior with strings.
 */
type Easing = "ease-in" | "ease-out" | "ease-in-out";

class UIElement {
  animate(dx: number, dy: number, easing: Easing) {
    if (easing === "ease-in") {
      // ...
    } else if (easing === "ease-out") {
      // ...
    } else if (easing === "ease-in-out") {
      // ...
    } else {
      // It's possible that someone could reach this by ignoring your types though.
    }
  }
}

let button = new UIElement();
button.animate(0, 0, "ease-in");
// button.animate(0, 0, "uneasy");
// !Argument of type '"uneasy"' is note assignable to parameter of type 'Easing'.

// String literal types can be used in the same way to distinguish(区分) overloads:
function createElement(tagName: "img"): HTMLImageElement;
function createElement(tagName: "input"): HTMLInputElement;
// ... more overloads ...
function createElement(tagName: string): Element {
  // ... code goes here ...
  return;
}

/**
 * Numeric Literal Types
 */
function rollDice(): 1 | 2 | 3 | 4 | 5 | 6 {
  return (Math.floor(Math.random() * 6) + 1) as 1 | 2 | 3 | 4 | 5 | 6;
}

const result = rollDice();

// A common case for their use is for describing config values:
interface MapConfig {
  lng: number;
  lat: number;
  tileSize: 8 | 16 | 32;
}

// setupMap({ lng: -73.935242, lat: 40.73061, tileSize: 16});

/**
 * Boolean Literal Types
 */
interface ValidationSuccess {
  isValid: true;
  reason: null;
}

interface ValidationFailure {
  isValid: false;
  reason: string;
}

type ValidationResult = ValidationSuccess | ValidationFailure;
