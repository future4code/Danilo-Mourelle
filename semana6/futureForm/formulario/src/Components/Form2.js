import React from 'react'
import styled from 'styled-components'
import Perguntas from './Pergunta'

const Container = styled.div`
width:100%;
display: flex;
flex-direction: column;
align-items: center;
`
const SubContainer = styled.div`
  width:30%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: rgb(230,230,230);
  padding: 3%;
  border-radius:10px;
`
const Titulo = styled.h1`
`

class Form2 extends React.Component {
  constructor(props) {
    super(props)

  }

  render() {
    return (
      <Container>
        <Titulo>ETAPA 2 - Informações educacionais para quem está cursando (ou já terminou) o ensino superior</Titulo>
        <SubContainer>
          <Perguntas pergunta="1. Qual o curso?" />
          <Perguntas pergunta="2. Qual unidade de ensino?" />
        </SubContainer>
      </Container>
    )
  }

}

export default Form2