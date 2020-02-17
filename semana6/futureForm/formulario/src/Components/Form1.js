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
const Seletor = styled.select`
`

class Form1 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectValue: "medioIncompleto"
    }
  }
  
  /* selecionaFormacao = (event) => {
    
    let grau = this.state.selectValue
    this.props.selecao(grau)

    this.setState({
      selectValue: event.target.value
    })
    
  } */

  render() {
    return (
      <Container>
        <Titulo>ETAPA 1 - DADOS GERAIS</Titulo>
        <SubContainer>
          <Perguntas pergunta="1. Qual seu nome?" />
          <Perguntas pergunta="2. Qual sua idade?" />
          <Perguntas pergunta="3. Qual seu e-mail?" />
          <p>4. Qual o grau de escolaridade?</p>
          <Seletor  onChange={this.props.selecao}>
            <option value="medioIncompleto"> Ensino Médio Incompleto </option>
            <option value="medioCompleto"> Ensino Médio Completo </option>
            <option value="superiorIncompleto"> Ensino Superior Incompleto </option>
            <option value="superiorCompleto"> Ensino Superior Completo </option>
          </Seletor>
        </SubContainer>
      </Container>
    )
  }

}

export default Form1

