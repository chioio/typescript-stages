import { LoadAppStateFromLocalStorage } from '../utils'

export type Todo = {
  id: number
  content: string
  completed: boolean
}

export type TodoList = Todo[]

export type RouteList = string[]

export type AppAction =
  | {
      type: 'NEW_TODO'
      todo: Todo
    }
  | {
      type: 'EDITED_TODO'
      todos: TodoList
    }
  | {
      type: 'REMOVED_TODO'
      todos: TodoList
    }
  | {
      type: 'COMPLETED_TODOS'
      todos: TodoList
    }

export interface AppState {
  todos: TodoList
}

export enum AppRoutes {
  ALL = '/',
  ACTIVE = '/active',
  COMPLETED = '/completed',
}

export enum LocalStorageKey {
  APP_TODOS = 'TODOS',
}

export const defaultData: AppState = LoadAppStateFromLocalStorage()
