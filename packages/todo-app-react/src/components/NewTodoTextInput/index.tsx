import React, { createRef, useContext } from 'react'
import { Todo } from '../../TodoData'
import TodoAppContext from '../../context/TodoAppContext'
import { NewTodoTextInput } from './style'

export default () => {
  const { appData, dispatch } = useContext(TodoAppContext)

  const textInput: React.RefObject<HTMLInputElement> = createRef<HTMLInputElement>()

  const generateId = (): number => 
    appData.todos.length > 0 ? Math.max(...appData.todos.map((item) => item.id + 1)) : 1

  const addTodo = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (textInput.current === null) return
    if (e.key === 'Enter' && textInput.current.value.trim().length > 0) {
      // make new TODO object
      const todo: Todo = {
        id: generateId(),
        text: textInput.current.value,
        done: false,
      }

      // add new TODO to entire Todo list
      dispatch({
        type: 'newTodo',
        todo: todo
      })

      // reset text input UI value
      textInput.current.value = ''
    }
  }

  return (
    <NewTodoTextInput
      type="text"
      placeholder="What needs to be done?"
      ref={textInput}
      onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => addTodo(e)}
      autoFocus
    />
  )
}
