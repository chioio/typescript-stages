import React, { useEffect, useContext, useState, createRef } from 'react'
import { TodoType } from 'src/typings'
import TodoAppContext from 'src/context/TodoAppContext'
import styled from 'styled-components'

interface EditState {
  onEdit: boolean
}

export const TodoItem = ({ todo }: { todo: TodoType }) => {
  const { dispatch } = useContext(TodoAppContext)

  const editInput = createRef<HTMLInputElement>()
  const [editState, setEditState] = useState<EditState>({ onEdit: false })

  const handleTodoTextEdit = (
    e: React.ChangeEvent<HTMLInputElement>,
    onEditTodo: TodoType
  ): void => {

    dispatch({
      type: 'EDIT_TODO',
      todo: { ...onEditTodo, content: e.target.value },
    })
  }

  const reverseItemState = (onReverseTodo: TodoType): void => {
    dispatch({
      type: 'REVERSE_TODO_STATE',
      todo: { ...onReverseTodo },
    })
  }

  const removeItem = (onRemoveTodo: TodoType): void => {
    dispatch({
      type: 'REMOVE_TODO',
      todo: { ...onRemoveTodo },
    })
  }

  const onDoubleClick = (): void => {
    setEditState({ onEdit: true })
  }

  const onBlurEdit = (e: React.FocusEvent<HTMLInputElement>): void => {
    if (e.currentTarget.value.trim().length > 0) {
      setEditState({ onEdit: false })
    } else {
      removeItem(todo)
    }
  }

  const submitEditText = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' || e.key === 'Escape')
      if (e.currentTarget.value.trim().length > 0) {
        setEditState({ onEdit: false })
      }
  }

  useEffect(() => {
    // For focus input element when double clicks text label
    if (editState.onEdit === true && editInput.current !== null) {
      editInput.current.focus()
    }
  }, [editInput, editState.onEdit])

  return (
    <Layout>
      <li>
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            checked={todo.completed}
            onChange={() => reverseItemState(todo)}
          />
          <label onDoubleClick={onDoubleClick}>{todo.content}</label>
          <button className="destroy" onClick={() => removeItem(todo)} />
        </div>
        <input
          ref={editInput}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => onBlurEdit(e)}
          className="edit"
          value={todo.content}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleTodoTextEdit(e, todo)
          }
          onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) =>
            submitEditText(e)
          }
        />
      </li>
    </Layout>
  )
}

const Layout = styled.div`
  position: relative;
  font-size: 1.5rem;
  border-bottom: 1px solid #80808030;

  .view {
    display: flex;
    justify-content: space-between;
    padding: 0.6rem 0.4rem;
    .toggle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1.5rem;
      height: 1.5rem;
      appearance: none;
      background: var(--primary-white-color);
      border-radius: 0.2rem;
      &:checked {
        background: var(--primary-foreground-color);
        &::after {
          content: '✔︎';
          color: var(--primary-white-color);
        }
      }
    }
    label {
      flex: 1;
      margin: 0 2rem;
    }
  }

  .edit {
    width: inherit;
    padding: 0.35rem 1rem;
    background-color: #50545a;
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
  }

  .edit {
    display: none;
  }

  &:last-child {
    border-bottom: none;
  }

  .editing {
    border-bottom: none;
    padding: 0;
  }

  .editing .edit {
    display: block !important;
    width: calc(100% - 43px);
    padding: 12px 16px;
    margin: 0 0 0 43 px;
  }

  .editing .view {
    display: none;
  }
`

export default TodoItem
