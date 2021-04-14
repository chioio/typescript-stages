import { useContext } from 'react'
import TodoAppContext from '../../context/TodoAppContext'
import Features from './Features'
import styled from 'styled-components'

const TodoList = () => {
  const { appContext } = useContext(TodoAppContext)

  return (
    <Layout>
      <Features />
      {appContext.todos.map((todo, index) => (
        <h2 key={index}>{todo.text}</h2>
      ))}
    </Layout>
  )
}

const Layout = styled.div`
  width: 100%;
  min-height: 1rem;
  border-radius: 0.5rem;
  background-color: #ffffff10;
  color: #dfdfdf;
  margin: 1rem 0;
  padding: 0 1rem;
  box-sizing: border-box;
  h2 {
    margin: 0;
    padding: 1rem;
    border-bottom: 1px solid #80808030;
  }
  h2:last-child {
    border: none;
  }
`

export default TodoList
