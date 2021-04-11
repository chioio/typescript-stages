import React, { createRef, useState } from 'react'
import { Todo } from '../../TodoData'
import styles from './index.module.css'

const NewTodoTextInput = ({ todos }: { todos: Todo[] }) => {
  const [todosState, setTodosState] = useState<Todo[]>(todos)
  const textInput: React.RefObject<HTMLInputElement> = createRef<HTMLInputElement>()

  const generateId = (): number =>
    todos.length > 0 ? Math.max(...todos.map((item) => item.id + 1)) : 1

  const addTodo = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (textInput.current === null) return
    if (e.key === 'Enter' && textInput.current.value.trim().length > 0) {
      // make new TODO object
      const todo: Todo = {
        id: generateId(),
        text: textInput.current.value,
        done: false,
      }

      // add new TODO to entire TodoList
      setTodosState([todo, ...todosState])

      // reset text input UI value
      textInput.current.value = ''
    }
  }

  return (
    <input
      type="text"
      className={styles.newTodo}
      placeholder="What needs to be done?"
      ref={textInput}
      onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => addTodo(e)}
      autoFocus
    />
  )
}

export default NewTodoTextInput
