import { AppState, AppAction } from 'src/typings'

const reducer = (state: AppState, action: AppAction) => {
  switch (action.type) {
    case 'NEW_TODO':
      return {
        ...state,
        todos: [action.todo, ...state.todos],
      }
    case 'UPDATE_TODOS':
      return {
        ...state,
        todos: [...action.todos],
      }
    default:
      throw new Error()
  }
}

export default reducer
