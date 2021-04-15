import { LoadAppStateFromLocalStorage } from '../utils'

export type Todo = {
  id: number
  text: string
  done: boolean
}

export interface AppRoutes {
  all: '/'
  active: '/active'
  completed: '/completed'
}

export type AppAction =
  | {
      type: 'NEW_TODO'
      todo: Todo
    }
  | {
      type: 'REMOVE_TODO'
      todos: Todo[]
    }

export interface AppState {
  todos: Todo[]
}

export enum LocalStorageKey {
  APP_TODOS = 'TODOS',
}

export const defaultData: AppState = LoadAppStateFromLocalStorage()
