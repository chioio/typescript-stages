import { useEffect, useReducer, useContext } from 'react'
import { LocalStorageKey } from './TodoData'
import NewTodoTextInput from './components/NewTodoTextInput'
import Copyright from './components/Footer'
import TodoAppContext from './context/TodoAppContext'
import AppReducer from './store/AppStore'
import Header from './components/Header'
import { Layout } from './App.style'

const App = () => {
  const { appData } = useContext(TodoAppContext)
  const [appState, dispatch] = useReducer<typeof AppReducer>(
    AppReducer,
    appData
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
      <section className="todo-app">
        <TodoAppContext.Provider value={{ appData: appState, dispatch }}>
          <NewTodoTextInput />
          <div className="todos-list">
            {appState.todos.map((todo, index) => (
              <h2 key={index}>{todo.text}</h2>
            ))}
          </div>
        </TodoAppContext.Provider>
      </section>
      <Copyright />
    </Layout>
  )
}

export default App
