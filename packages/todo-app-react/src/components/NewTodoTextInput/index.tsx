import React, { createRef, useContext } from 'react'
import { Todo } from '../../typings'
import TodoAppContext from '../../context/TodoAppContext'
import styled from 'styled-components'

const NewTodoTextInput = () => {
  const { appContext, dispatch } = useContext(TodoAppContext)

  const textInput: React.RefObject<HTMLInputElement> = createRef<HTMLInputElement>()

  const generateId = (): number =>
    appContext.todos.length > 0
      ? Math.max(...appContext.todos.map((item) => item.id + 1))
      : 1

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
        type: 'NEW_TODO',
        todo: todo,
      })

      // reset text input UI value
      textInput.current.value = ''
    }
  }

  return (
    <Layout>
      <input
        type="text"
        placeholder="What needs to be done?"
        ref={textInput}
        onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => addTodo(e)}
        autoFocus
      />
    </Layout>
  )
}

const Layout = styled.div`
  position: relative;
  width: 100%;
  input {
    width: inherit;
    padding: 0.35rem 1rem;
    background-color: #ffffff30;
    color: #fff;
    font-size: 1.25rem;
    font-family: inherit;
    font-weight: inherit;
    line-height: 1.4em;
    border: none;
    border-radius: 0.5rem;
    box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    :focus {
      outline: none;
      padding: 0.15rem 0.8rem;
      border: #ff8945 dashed 0.2rem;
      background-color: #ffffff10;
    }
  }
`

export default NewTodoTextInput
