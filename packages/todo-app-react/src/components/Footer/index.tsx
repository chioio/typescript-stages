import styled from 'styled-components'

const Footer = styled.footer`
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: center;
  height: 2rem;
  margin-top: 5rem;
  color: #ffffff;
  line-height: 1.25rem;

  span:first-child {
    color: #bfbfbf90;
    font-size: 0.8rem;
  }
`

export default () => {
  return (
    <Footer>
      <span>Created by&nbsp;</span>
      <span>Tenn Chio</span>
    </Footer>
  )
}
