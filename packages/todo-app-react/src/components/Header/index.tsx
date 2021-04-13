import styled from 'styled-components'

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 10rem;

  h1 {
    margin: 0;
    color: #fff;
    font-size: 5rem;
    font-weight: 100;
  }
`

export default () => {
  return (
    <Header>
      <h1>Todos</h1>
    </Header>
  )
}
