import React from 'react'
import styled from 'styled-components'


const Container = styled.div`
  width:50%;
  height: 98vh;
  margin: 1vh auto;
  border: solid 1px black;
  display: flex;
  flex-direction:column;
  align-items:center;
  justify-content:flex-start;
  background-color: #eee;
`
const Wrapper = styled(Container)`
  width: 80%;
  height: 50%;
  background: #aaa;
  justify-content: center;
  font-size:1.5em;
  margin: 5% auto;
`

function Inputs(props) {

  const onChangeInputValue = (event) => {
    let newValue = event.target.value
    let input = event.target.name
    props.refreshValue(input, newValue)
  }
  return (
    <Container>
      <Wrapper>
        <label for="nome">Nome:</label>
        <input 
          type="text" 
          id="nome" 
          name="nome"
          value={props.nome}
          onChange={onChangeInputValue} 
        />
        <label for="email">E-mail:</label>
        <input 
          type="email" 
          id="email" 
          name="email"
          value={props.email}
          onChange={onChangeInputValue}
        />
        <button onClick={props.sendData}>Enviar</button>
      </Wrapper>
      <button onClick={props.changePage}>Ir para página de lista</button>
    </Container>
  )
}


export default Inputs