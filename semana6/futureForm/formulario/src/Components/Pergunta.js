import React from 'react'
import styled from 'styled-components'

const Container = styled.div `
  display:flex;
  flex-direction: column;
  align-items: flex-start;
`

function Perguntas (props){
  return(
    <Container>
      <p>{props.pergunta}</p>
      <input type="text" onChange={props.valor}/>
    </Container>
  )
}

export default Perguntas