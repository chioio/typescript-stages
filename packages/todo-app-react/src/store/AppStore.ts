import { AppState, AppAction } from 'src/typings'

const reducer = (state: AppState, action: AppAction) => {
  switch (action.type) {
    case 'NEW_TODO':
      return {
        ...state,
        todos: [action.todo, ...state.todos],
      }
    case 'EDITED_TODO':
      return {
        ...state,
        todos: [...action.todos],
      }
    case 'REMOVED_TODO':
      return {
        ...state,
        todos: [...action.todos]
      }
    case 'COMPLETED_TODOS':
      return {
        ...state,
        todos: [...action.todos]
      }
    default:
      throw new Error()
  }
}

export default reducer
