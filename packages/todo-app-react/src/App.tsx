import { useEffect, useReducer, useContext } from 'react'
import { LocalStorageKey } from './typings'
import NewTodoTextInput from './components/NewTodoTextInput'
import Copyright from './components/Footer'
import TodoAppContext from './context/TodoAppContext'
import AppReducer from './store/AppStore'
import Header from './components/Header'
import styled from 'styled-components'
import TodoList from './components/TodoList'

const App = () => {
  const { appContext } = useContext(TodoAppContext)
  const [appState, dispatch] = useReducer<typeof AppReducer>(
    AppReducer,
    appContext
  )

  useEffect((): void => {
    window.localStorage.setItem(
      LocalStorageKey.APP_TODOS,
      JSON.stringify(appState)
    )
  }, [appState])

  return (
    <Layout>
      <Header />
      <TodoApp>
        <TodoAppContext.Provider value={{ appContext: appState, dispatch }}>
          <NewTodoTextInput />
          <TodoList />
        </TodoAppContext.Provider>
      </TodoApp>
      <Copyright />
    </Layout>
  )
}

const Layout = styled.div`
  min-height: 100vh;
  background-color: #282c34;
  padding: 0 25%;
`

const TodoApp = styled.section`
  .todo-app {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    position: relative;
  }
`

export default App
