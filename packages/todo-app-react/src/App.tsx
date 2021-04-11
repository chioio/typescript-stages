import { useState, useEffect } from 'react'
import NewTodoTextInput from './components/NewTodoTextInput'
import { AppState, LocalStorageKey } from './TodoData'
import styles from './App.module.css'

const App = () => {
  const [appState = { todoList: [] }, setAppState] = useState<AppState>()
  useEffect((): void => {
    window.localStorage.setItem(
      LocalStorageKey.APP_TODOS,
      JSON.stringify(appState)
    )
  }, [appState])

  return (
    <div className={styles.Container}>
      <header className={styles.Header}>
        <h1 className={styles.Title}>Todos</h1>
        <NewTodoTextInput todos={appState.todoList} />
      </header>
    </div>
  )
}

export default App
