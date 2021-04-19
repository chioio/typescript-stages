import { useEffect, useReducer, useContext } from 'react'
import { LocalStorageKey, AppRoutes } from './typings'
import NewTodoTextInput from './components/NewTodoTextInput'
import Copyright from './components/Footer'
import TodoAppContext from './context/TodoAppContext'
import AppReducer from './store/AppStore'
import Header from './components/Header'
import TodoList from './components/TodoList'
import styled from 'styled-components'

interface Props {
  path: AppRoutes
}

const App: React.FC<Props> = ({ path }) => {
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
          <TodoList path={path} />
        </TodoAppContext.Provider>
      </TodoApp>
      <Copyright />
    </Layout>
  )
}

const Layout = styled.div`
  min-height: 100vh;
  background-color: #282c34;
  padding: 0 15%;
`

const TodoApp = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 35rem;
  margin: 0 auto;
  position: relative;
  box-sizing: border-box;
`

export default App
