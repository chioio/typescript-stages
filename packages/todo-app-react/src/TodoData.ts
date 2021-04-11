import { LoadAppStateFromLocalStorage } from "./utils"

export type Todo = {
  id: number
  text: string
  done: boolean
}

export interface AppState {
  todoList: Todo[]
}

export enum LocalStorageKey {
  APP_TODOS = 'TODOS',
}

export const defaultData: AppState = LoadAppStateFromLocalStorage()
