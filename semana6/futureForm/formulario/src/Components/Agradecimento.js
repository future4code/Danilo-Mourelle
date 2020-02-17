import React from 'react'
import styled from 'styled-components'


const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`
const Titulo = styled.h1`
`

function Agradecimento(){
  return(
    <Container>
      <h1> Obrigado por responder nossas questões </h1>
      <p> Aguarde contato para mais informações </p>
    </Container>
  )
}

export default Agradecimento