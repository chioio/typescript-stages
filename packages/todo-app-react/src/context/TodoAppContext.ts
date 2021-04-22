import { createContext, Dispatch } from 'react'
import { IAppState, AppActionType } from '../typings'
import { LoadAppStateFromLocalStorage } from '../utils'

export interface TodoAppContextProps {
  appContext: IAppState,
  dispatch: Dispatch<AppActionType>
}

export const todoAppContextDefault: TodoAppContextProps = {
  appContext: LoadAppStateFromLocalStorage(),
  dispatch: () => {}
}

export default createContext<TodoAppContextProps>(todoAppContextDefault)
