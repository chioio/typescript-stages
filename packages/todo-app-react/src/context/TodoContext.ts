import { createContext } from 'react'
import { AppState } from '../TodoData'
import { LoadAppStateFromLocalStorage } from '../utils'

export interface TodoContextProps {
  appState: AppState
}

export const todoContextDefault: TodoContextProps = {
  appState: LoadAppStateFromLocalStorage(),
}

export default createContext<TodoContextProps>(todoContextDefault)
