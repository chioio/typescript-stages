import { createContext, Dispatch } from 'react'
import { AppState, AppAction } from '../TodoData'
import { LoadAppStateFromLocalStorage } from '../utils'

export interface TodoAppContextProps {
  appData: AppState,
  dispatch: Dispatch<AppAction>
}

export const todoAppContextDefault: TodoAppContextProps = {
  appData: LoadAppStateFromLocalStorage(),
  dispatch: () => {}
}

export default createContext<TodoAppContextProps>(todoAppContextDefault)
