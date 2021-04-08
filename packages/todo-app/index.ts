/**
 * Define Place type with `union type`
 */
type Place = 'home' | 'work' | { custom: string }

/**
 * Define Todo type
 * toggleTodo must return a new todo object,
 * so make the properties `readonly`.
 */
// type Todo = {
//   readonly id: number
//   readonly text: string
//   readonly done: boolean
// }
type Todo = Readonly<{
  id: number
  text: string
  done: boolean
  place?: Place // '?' mark make the property optional.
}>

/**
 * We can use exact values when specifying a type.
 * This is called literal types.
 *
 * intersection type(&)
 */
type CompletedTodo = Todo & {
  readonly done: true
}

type Foo = {
  bar: number
}

/**
 * Convert Foo to a new read-only type.
 * The keywords like `Readonly<...>` are called mapped types:
 * `Required<...>`, `Partial<...>`, etc
 */
type ReadonlyFoo = Readonly<Foo>

/**
 * Param "todo" must match the Todo type,
 * and the return value must match Todo type.
 */
export const toggleTodo = (todo: Todo): Todo => {
  return {
    id: todo.id,
    text: todo.text,
    done: !todo.done,
  }
}

// * test toggleTodo
console.log(toggleTodo({ id: 0, text: '...', done: false }))

/**
 * Although the Todo properties are `readonly`,
 * but the array itself is NOT `readonly` yet.
 */
export const completeAll = (todos: readonly Todo[]): CompletedTodo[] => {
  return todos.map((todo) => ({
    ...todo,
    done: true,
  }))
}

// * test completeAll
console.log(
  completeAll([
    { id: 1, text: '…', done: false },
    { id: 2, text: '…', done: true },
  ])
)

export const placeToString = (place: Place): string => {
  switch (place) {
    case 'home':
      return '🏠 Home'
    case 'work':
      return '💼 Work'
    default:
      return `📍 ${place.custom}`
  }
}

// * test placeToString
console.log(placeToString('home'))
console.log(placeToString('work'))
console.log(placeToString({ custom: 'School' }))
