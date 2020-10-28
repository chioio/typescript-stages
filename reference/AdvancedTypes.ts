// === Advance Types ===

/**
 * Type Guards and Differentiating Types
 */
let pet2 = getSmallPet();

// We can use the 'in' operator to check
if ("swim" in pet2) {
  pet2.swim();
}

// However, we cannot use property access
// if (pet.fly) {
// !Property 'fly' does not exist on type 'Fish | Bird'.
// !Property 'fly' does not exist on type 'Fish'.
//   pet.fly();
// !Property 'fly' does not exist on type 'Fish | Bird'.
// !Property 'fly' does not exist on type 'Fish'.
// }
