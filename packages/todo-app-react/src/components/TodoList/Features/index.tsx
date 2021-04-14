import { useContext } from 'react'
import TodoAppContext from '../../../context/TodoAppContext'
// import { Link } from '@reach/router'
import styled from 'styled-components'

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

const Features = () => {
  const { appContext } = useContext(TodoAppContext)

  return (
    <Layout>
      <span className={appContext.todos.length === 0 ? 'un-clickable' : ''}>
        Complete All
      </span>
      <div className="center">
        <span></span>
        {appContext.todos.length > 0 ? <Filter /> : null}
      </div>
      <span className={appContext.todos.length === 0 ? 'un-clickable' : ''}>
        Clear All
      </span>
    </Layout>
  )
}

const Layout = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.4rem 0;

  span {
    font-size: 0.8rem;
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
    &>span {
      &:first-child {
        display: block;
        width: 3.5rem;
        height: 0.4rem;
        border-radius: 0.2rem;
        background-color: #303030;
      }
    }
    .filter {
      display: flex;
      justify-content: space-around;
    }
  }
}
`

export default Features
