import styled from 'styled-components'

export const Layout = styled.div`
  min-height: 100vh;
  background-color: #282c34;
  padding: 0 25%;
  .todo-app {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    position: relative;
  }

  .todo-app .todos-list {
    width: 100%;
    border-radius: 0.5rem;
    background-color: #efefef;
  }
`
