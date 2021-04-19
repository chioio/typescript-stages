import React, {
  useEffect,
  useReducer,
  useContext,
  useState,
  createRef,
} from 'react'
import { Todo, TodoList } from 'src/typings'
import AppReducer from 'src/store/AppStore'
import TodoAppContext from 'src/context/TodoAppContext'
import styled from 'styled-components'

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

  const handleTodoTextEdit = (
    e: React.ChangeEvent<HTMLInputElement>,
    onEditID: Todo['id']
  ): void => {
    const editedTodos: TodoList = appState.todos.map((todo) => {
      if (todo.id === onEditID) {
        return { ...todo, content: e.target.value }
      } else {
        return todo
      }
    })

    dispatch({ type: 'EDITED_TODO', todos: editedTodos })
  }

  const reverseCompleted = (id: Todo['id']): void => {
    const toggledTodos: TodoList = appState.todos.map((todo) => {
      if (todo.id === id) {
        // change completed status only clicked item
        return { ...todo, completed: !todo.completed }
      } else {
        return todo
      }
    })

    dispatch({
      type: 'COMPLETED_TODOS',
      todos: toggledTodos,
    })
  }

  const removeItem = (terminate: Todo['id']): void => {
    const removed: TodoList = appState.todos.filter(
      (t: Todo): boolean => t.id !== terminate
    )

    dispatch({
      type: 'REMOVED_TODO',
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
            onChange={() => reverseCompleted(todo.id)}
          />
          <label onDoubleClick={onDoubleClick}>{todo.content}</label>
          <button className="destroy" onClick={() => removeItem(todo.id)} />
        </div>
        <input
          ref={editInput}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => onBlurEdit(e)}
          className="edit"
          value={todo.content}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleTodoTextEdit(e, todo.id)
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

  .toggle {
    text-align: center;
    width: 40px;
    height: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 0;
    border: none;
    --webkit-appearance: none;
    appearance: none;
    opacity: 0;
  }

  .toggle + label {
    /*
    Firefox requires \`#\` to be escaped - https://bugzilla.mozilla.org/show_bug.cgi?id=922433
    IE and Edge requires *everything* to be escaped to render, so we do that instead of just the \`#\` - https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/7157459/
    */
    background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E');
    background-repeat: no-repeat;
    background-position: center left;
  }

  .toggle:checked + label {
    background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E');
  }

  label {
    word-break: break-all;
    padding: 15px 15px 15px 60px;
    display: block;
    line-height: 1.2;
    transition: color 0.4s;
  }

  .completed label {
    color: #d9d9d9;
    text-decoration: line-through;
  }

  .destroy {
    display: none;
    position: absolute;
    top: 0;
    right: 10px;
    bottom: 0;
    width: 40px;
    height: 40px;
    margin: auto 0;
    font-size: 30px;
    color: #cc9a9a;
    margin-bottom: 11px;
    transition: color 0.2s ease-out;
  }

  .destroy:hover {
    color: #af5b5e;
  }

  .destroy:after {
    content: '×';
  }

  &:hover .destroy {
    display: block;
  }

  .editing:last-child {
    margin-bottom: -1px;
  }
`

export default TodoItem
