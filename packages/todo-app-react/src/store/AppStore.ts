import { AppState, AppAction } from '../typings'

const reducer = (state: AppState, action: AppAction) => {
  switch (action.type) {
    case 'NEW_TODO':
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
