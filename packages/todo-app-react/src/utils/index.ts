import { IAppState, LocalStorageKey } from '../typings'

export function LoadAppStateFromLocalStorage(): IAppState {
  const stringifiedJSON: string | null = window.localStorage.getItem(
    LocalStorageKey.APP_TODOS
  )

  if (typeof stringifiedJSON === 'string') {
    const LoadedAppData: IAppState = JSON.parse(stringifiedJSON)
    return LoadedAppData
  }

  const BlankAppData: IAppState = { todos: [] }

  return BlankAppData
}
