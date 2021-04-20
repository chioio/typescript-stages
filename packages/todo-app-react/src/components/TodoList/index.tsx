import { useState, useContext, ReactElement } from 'react'
import { Todo } from 'src/typings'
import AppContext from 'src/context/TodoAppContext'
import styled from 'styled-components'
import TodoItem from './TodoItem'

enum Filters {
  ALL = 'ALL',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
}
interface IFilterState {
  filter: string
}

const TodoList: React.FC = () => {
  const { appContext } = useContext(AppContext)
  const [filterState, setFilterState] = useState<IFilterState>({
    filter: Filters.ALL,
  })

  const FiltersButton: React.FC = () => {
    return (
      <div className="filters">
        <button
          className={filterState.filter === Filters.ALL ? 'active' : ''}
          onClick={() => setFilterState({ filter: Filters.ALL })}
        >
          All
        </button>
        <button
          className={filterState.filter === Filters.ACTIVE ? 'active' : ''}
          onClick={() => setFilterState({ filter: Filters.ACTIVE })}
        >
          Active
        </button>
        <button
          className={filterState.filter === Filters.COMPLETED ? 'active' : ''}
          onClick={() => setFilterState({ filter: Filters.COMPLETED })}
        >
          Completed
        </button>
      </div>
    )
  }

  return (
    <Layout>
      {/* Top Features  */}
      <div className="top-features">
        <span className={appContext.todos.length === 0 ? 'un-clickable' : ''}>
          Complete All
        </span>
        <div className="center">
          {appContext.todos.length > 0 ? <FiltersButton /> : null}
        </div>
        <span className={appContext.todos.length === 0 ? 'un-clickable' : ''}>
          Clear All
        </span>
      </div>
      {/* Todo Item List */}
      <ul className="todo-list">
        {appContext.todos
          .filter((todo: Todo): boolean => {
            switch (filterState.filter) {
              case Filters.ALL:
                return true
              case Filters.ACTIVE:
                return todo.completed === false
              case Filters.COMPLETED:
                return todo.completed === true
              default:
                return true
            }
          })
          .map(
            (todo: Todo): ReactElement => {
              return <TodoItem key={todo.id} todo={todo} />
            }
          )}
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
    --webkit-backdrop-filter: blur(5px);
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
      height: 2rem;
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
      .filters {
        display: flex;
        justify-content: space-around;
        button {
          width: 5rem;
          background: none;
          outline: none;
          border: none;
          color: #dfdfdf;
        }

        .active {
          border-bottom: #ff8945 solid 0.2rem;
        }
      }
    }
  }

  .todo-list {
    list-style: none;
    padding: 0 1rem;
  }
`

export default TodoList
