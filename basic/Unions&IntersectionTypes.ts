// === Unions and Intersection Types ===

/**
 * Union Types
 */

/**
 * Takes a string adds "padding" to the left.
 * If 'padding' is a string, then 'padding' is appended to the left side.
 * If 'padding' is a number, then that number of spaces is added to the left side.
 */
function padLeft1(value: string, padding: any) {
  if (typeof padding === "number") {
    return Array(padding + 1).join(" ") + value;
  }
  if (typeof padding === "string") {
    return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}

padLeft1("Hello world", 4); // returns "    Hello world"

// passes at compile time, fails at runtime.
let indentedString1 = padLeft1("Hello world", true);

/**
 * Takes a string and adds "padding" to the left.
 * If 'padding' is a string, then 'padding' is appended to the left side.
 * If 'padding' is a number, then that number of spaces is added to the left side.
 */
function padLeft2(value: string, padding: string | number) {
  // ...
}

// let indentedString2 = padLeft2("Hello world", true);
// !Argument of type 'boolean' is not assignable to parameter of type 'string | number'.

// A union type describes a value that can be one of several types. We use the
// vertical bar(`|`) to separate each type, so `number | string | boolean` is
// the type of a value that can be a `number`, a `string`, or a `boolean`.

/**
 * Unions with Common Fields
 *
 * If we have a value that is a union type, we can only access members that
 * are common to all types in the union.
 */
interface Bird {
  fly(): void;
  layEggs(): void;
}

interface Fish {
  swim(): void;
  layEggs(): void;
}

declare function getSmallPet(): Fish | Bird;

let pet = getSmallPet();
pet.layEggs();

// Only available in one of the two possible types
// pet.swim();
// !Property 'swim' does not exist on type 'Bird | Fish'.
// !Property 'swim' does not exist on type 'Bird'.

/**
 * Discriminating(区别的) Unions
 *
 * A common technique for working with unions is to have a single field which
 * uses literal types which you can use to let TypeSCript narrow down the
 * possible current type.
 */
type NetworkLoadingState = {
  state: "loading";
};

type NetworkFailedState = {
  state: "failed";
  code: number;
};

type NetworkSuccessState = {
  state: "success";
  response: {
    title: string;
    duration: number;
    summary: string;
  };
};

// Create a type which represents only one of the above types
// but you aren't sure which it is yet.
type NetworkState1 =
  | NetworkLoadingState
  | NetworkFailedState
  | NetworkSuccessState;

// With `state` as a literal type, you can compare the value of `state` to the
// equivalent string and TypeScript will know which type is currently being used.

function logger1(state: NetworkState1): string {
  // Right now TypeScript does not know which of the three
  // potential(可能的) types state could be.

  // Trying to access a property which isn't shared
  // across all types will raise an error
  // state.code;
  // !Property 'code' does not exist on type 'NetworkState'.
  // !Property 'code' does not exist on type 'NetworkLoadingState'.

  // By switching on state, TypeScript can narrow the union
  // down in code flow analysis
  switch (state.state) {
    case "loading":
      return "Downloading...";
    case "failed":
      // The type must be NetworkFailedState here,
      // so accessing the `code` field is safe
      return `Error ${state.code} downloading`;
    case "success":
      return `Downloaded ${state.response.title} - ${state.response.summary}`;
  }
}

/**
 * Union Exhaustiveness(彻底的) checking
 */
type NetworkFromCachedState = {
  state: "from_cache";
  id: string;
  response: NetworkSuccessState["response"];
};

type NetworkState2 =
  | NetworkLoadingState
  | NetworkFailedState
  | NetworkSuccessState
  | NetworkFromCachedState;

function logger2(s: NetworkState2) {
  switch (s.state) {
    case "loading":
      return "loading request";
    case "failed":
      return `failed with code ${s.code}`;
    case "success":
      return "got response";
  }
}

// There are two ways to do this. The first is to turn on `--strictNullChecks`
// and specify a return type:
// function logger3(s: NetworkState2): string {
// !Function lacks ending return statement and return type does not include 'undefined'.
//   switch (s.state) {
//     case "loading":
//       return "loading request";
//     case "failed":
//       return `failed with code ${s.code}`;
//     case "success":
//       return "got response";
//   }
// }

// The second method uses the `never` type that the compiler uses to check for
// exhaustiveness:
function assertNever(x: never): never {
  throw new Error("Unexpected object: " + x);
}

function logger4(s: NetworkState2): string {
  switch (s.state) {
    case "loading":
      return "loading request";
    case "failed":
      return `failed with code ${s.code}`;
    case "success":
      return "got response";
    // default:
    // return assertNever(s);
    // !Argument of type 'NetworkFromCachedState' is not assignable to parameter of type 'never'.
  }
}
// Here, `assertNever` checks that `s` is of type `never` -- the type that's
// left after all other cases have been removed.
// If we forget a case, then requires you to define an extra function, but
// it's much more obvious when you forget it because the error message includes
// the missing type name.

/**
 * Intersection(相交) Types
 *
 * Intersection types are closely related to union types, but they are used vary
 * differently. An intersection type combines multiple type into one.
 * This allows you to add together existing types to get a single type that has
 * all the features we need. For example, `Person & Serializable & Loggable` is
 * a type which is all of `Person` and `Serializable` and `Loggable`. That means
 * an object of this type will have all members of all three types.
 */
interface ErrorHandling {
  success: boolean;
  error?: { message: string };
}

interface ArtworksData {
  artworks: { title: string }[];
}

interface ArtistsData {
  artists: { name: string }[];
}

// These interfaces are composed to have
// consistent error handling, and their own data.

type ArtworksResponse = ArtworksData & ErrorHandling;
type ArtistsResponse = ArtistsData & ErrorHandling;

const handleArtistsResponse = (response: ArtistsResponse) => {
  if (response.error) {
    console.error(response.error.message);
    return;
  }

  console.log(response.artists);
};
