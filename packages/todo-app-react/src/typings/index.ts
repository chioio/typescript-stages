import { LoadAppStateFromLocalStorage } from '../utils'

export type TodoType = {
  id: number
  content: string
  completed: boolean
}

export type TodoListType = TodoType[]

export type AppActionType =
  | {
      type: 'NEW_TODO'
      todo: TodoType
    }
  | {
      type: 'EDIT_TODO'
      todo: TodoType
    }
  | {
      type: 'REMOVE_TODO'
      todo: TodoType
    }
  | {
      type: 'REVERSE_TODO_STATE'
      todo: TodoType
    }
  | {
      type: 'REVERSE_ALL_STATE'
    }
  | {
      type: 'REMOVE_COMPLETED'
    }
  | {
      type: 'REMOVE_ALL'
    }

export interface IAppState {
  todos: TodoListType
}

export enum LocalStorageKey {
  APP_TODOS = 'TODOS',
}

export const defaultData: IAppState = LoadAppStateFromLocalStorage()
