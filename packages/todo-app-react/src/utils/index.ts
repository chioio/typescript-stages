import { AppState, LocalStorageKey } from '../TodoData'

export function LoadAppStateFromLocalStorage(): AppState {
  const stringifiedJSON: string | null = window.localStorage.getItem(
    LocalStorageKey.APP_TODOS
  )

  if (typeof stringifiedJSON === 'string') {
    const LoadedAppState: AppState = JSON.parse(stringifiedJSON)
    return LoadedAppState
  }

  const BlankAppState: AppState = { todoList: [] }

  return BlankAppState
}
