import { AppState, AppAction } from '../TodoData'

const reducer = (state: AppState, action: AppAction) => {
  switch (action.type) {
    case 'newTodo':
      const todos = [action.todo, ...state.todos]  
      return {
        ...state,
        todos,
      }
    default:
      throw new Error()
  }
}

export default reducer
