import { Todo, AppState, AppAction } from 'src/typings'

const reducer = (state: AppState, action: AppAction) => {
  let todos: Todo[] = []
  switch (action.type) {
    case 'NEW_TODO':
      todos = [action.todo, ...state.todos]
      return {
        ...state,
        todos,
      }
    case 'EDITED_TODO':
      todos = action.todos
      return {
        ...state,
        todos,
      }
    case 'REMOVED_TODO':
      todos = action.todos
      return {
        ...state,
        todos,
      }
    case 'COMPLETED_TODOS':
      todos = action.todos
      return {
        ...state,
        todos,
      }
    default:
      throw new Error()
  }
}

export default reducer
