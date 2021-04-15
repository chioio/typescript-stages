import React, { useReducer, useContext, useState, createRef } from 'react'
import { Todo } from 'src/typings'
import AppReducer from 'src/store/AppStore'
import TodoAppContext from 'src/context/TodoAppContext'

interface EditState {
  onEdit: boolean
}

export const TodoItem = ({ todo }: { todo: Todo }) => {
  const { appContext } = useContext(TodoAppContext)
  const [appState, dispatch] = useReducer<typeof AppReducer>(
    AppReducer,
    appContext
  )
  const editInput = createRef<HTMLInputElement>()
  const [editState, setEditState] = useState<EditState>({ onEdit: false })

  const removeItem = (terminate: Todo['id']): void => {
    const removed: Todo[] = appState.todos.filter(
      (t: Todo): boolean => t.id !== terminate
    )

    dispatch({
      type: 'REMOVE_TODO',
      todos: removed,
    })
  }
  
  const onDoubleClick = (): void => {
    setEditState({ onEdit: true })
  }

  const onBlurEdit = (e: React.FocusEvent<HTMLInputElement>): void => {
    if (e.currentTarget.value.trim().length > 0) {
      setEditState({ onEdit: false })
    } else {
      removeItem(todo.id)
    }
  }

  const submitEditText = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' || e.key === 'Escape')
      if (e.currentTarget.value.trim().length > 0) {
        setEditState({ onEdit: false })
      }
  }

  const handleTodoTextEdit = (
    e: React.ChangeEvent<HTMLInputElement>,
    onEdit: Todo['id']
  ): void => {
    const edited = appState.todos.map(
      (t: Todo): Todo => {
        if (t.id === onEdit) {
          return { ...t, text: e.target.value }
        } else {
          return t
        }
      }
    )
  }

  return <span>Todo Item</span>
}

export default TodoItem
