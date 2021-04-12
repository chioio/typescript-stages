import { LoadAppStateFromLocalStorage } from "./utils"

export type Todo = {
  id: number
  text: string
  done: boolean
}

export interface AppAction {
  type: 'newTodo',
  newTodo: Todo
}

export interface AppState {
  todos: Todo[]
}

export enum LocalStorageKey {
  APP_TODOS = 'TODOS',
}

export const defaultData: AppState = LoadAppStateFromLocalStorage()
