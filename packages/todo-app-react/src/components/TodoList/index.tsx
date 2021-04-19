import { useContext, useReducer } from 'react'
import { Todo, AppRoutes } from 'src/typings'
import AppContext from 'src/context/TodoAppContext'
import AppReducer from 'src/store/AppStore'
import styled from 'styled-components'
import TodoItem from './TodoItem'

interface Props {
  path: AppRoutes
}

const Filter = () => {
  return (
    <div className="filter">
      <span>
        {/* <Link className={path.all ? 'selected' : ''} to={path.all}> */}
        All
        {/* </Link> */}
      </span>
      <span>
        {/* <Link className={path.active ? 'selected': ''} to={path.active}> */}
        Active
        {/* </Link> */}
      </span>
      <span>
        {/* <Link className={path.completed ? 'selected': ''} to={path.completed}> */}
        Completed
        {/* </Link> */}
      </span>
    </div>
  )
}

const TodoList: React.FC<Props> = ({ path }) => {
  const { appContext } = useContext(AppContext)
  const [appState, dispatch] = useReducer(AppReducer, appContext)

  return (
    <Layout>
      {/* Top Features  */}
      <div className="top-features">
        <span className={appContext.todos.length === 0 ? 'un-clickable' : ''}>
          Complete All
        </span>
        <div className="center">
          {appContext.todos.length > 0 ? <Filter /> : null}
        </div>
        <span className={appContext.todos.length === 0 ? 'un-clickable' : ''}>
          Clear All
        </span>
      </div>
      {/* Todo Item List */}
      <ul className="todo-list">
        {appState.todos
          .filter((todo: Todo): boolean => {
            switch (path) {
              case AppRoutes.ALL:
                return true
              case AppRoutes.ACTIVE:
                return todo.completed === false
              case AppRoutes.COMPLETED:
                return todo.completed === true
              default:
                return true
            }
          })
          .map((todo: Todo) => {
            return <TodoItem key={todo.id} todo={todo} />
          })}
      </ul>
      {/* Bottom Features */}
      <div className="bottom-features">
        <span>{appContext.todos.length} items left</span>
        <span>Clear completed</span>
      </div>
    </Layout>
  )
}

const Layout = styled.div`
  position: relative;
  width: 100%;
  max-height: 50vh;
  overflow: scroll;
  min-height: 1rem;
  border-radius: 0.5rem;
  background-color: #353941;
  color: #dfdfdf;
  margin: 1rem 0;
  box-sizing: border-box;
  .top-features,
  .bottom-features {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0.4rem 1rem;
    background-color: #3d414a90;
    backdrop-filter: blur(5px);
    font-size: 0.8rem;
  }
  .top-features {
    margin: 0;
    span {
      margin: 0 0.5rem;
      user-select: none;
    }

    .un-clickable {
      color: #5f5f5f;
    }

    .center {
      height: 1.75rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      &::before {
        content: '';
        width: 3.5rem;
        height: 0.4rem;
        background-color: #696c72;
        box-shadow: 0 1px 1px #333740;
        border-radius: 0.2rem;
      }
      .filter {
        display: flex;
        justify-content: space-around;
      }
    }
  }

  h2 {
    margin: 0;
    padding: 1rem;
    border-bottom: 1px solid #80808030;
    &:last-child {
      border: none;
    }
  }
`

export default TodoList
