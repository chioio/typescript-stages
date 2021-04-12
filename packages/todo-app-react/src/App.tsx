import { useEffect, useReducer, useContext } from 'react'
import { LocalStorageKey } from './TodoData'
import NewTodoTextInput from './components/NewTodoTextInput'
import TodoAppContext from './context/TodoAppContext'
import AppReducer from './store/AppStore'
import styles from './App.module.css'

const App = () => {
  const { appData } = useContext(TodoAppContext)
  const [ appState, dispatch ] = useReducer<typeof AppReducer>(AppReducer, appData)
  useEffect((): void => {
    window.localStorage.setItem(
      LocalStorageKey.APP_TODOS,
      JSON.stringify(appState)
    )
  }, [appState])

  return (
    <TodoAppContext.Provider value={{ appData: appState, dispatch }}>
      <div className={styles.Container}>
        <header className={styles.Header}>
          <h1 className={styles.Title}>Todos</h1>
          <NewTodoTextInput />
        </header>
      </div>
    </TodoAppContext.Provider>
  )
}

export default App
