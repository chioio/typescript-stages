import { createContext, Dispatch } from 'react'
import { AppState, AppAction } from '../typings'
import { LoadAppStateFromLocalStorage } from '../utils'

export interface TodoAppContextProps {
  appContext: AppState,
  dispatch: Dispatch<AppAction>
}

export const todoAppContextDefault: TodoAppContextProps = {
  appContext: LoadAppStateFromLocalStorage(),
  dispatch: () => {}
}

export default createContext<TodoAppContextProps>(todoAppContextDefault)
