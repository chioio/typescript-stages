import { AppState, LocalStorageKey } from '../TodoData'

export function LoadAppStateFromLocalStorage(): AppState {
  const stringifiedJSON: string | null = window.localStorage.getItem(
    LocalStorageKey.APP_TODOS
  )

  if (typeof stringifiedJSON === 'string') {
    const LoadedAppData: AppState = JSON.parse(stringifiedJSON)
    return LoadedAppData
  }

  const BlankAppData: AppState = { todos: [] }

  return BlankAppData
}
