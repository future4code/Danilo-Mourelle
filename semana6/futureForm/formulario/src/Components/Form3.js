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

class Form3 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectValue: 'nenhum'
    }

  }

  selecionaComplementar = (event) => {
    this.setState({
      selectValue: event.target.value
    })
    
  }

  render() {
    console.log(this.state.selectValue)
    return (
      <Container>
        <Titulo>ETAPA 3 - Informações sobre quem não se formou no ensino superior nem está cursando</Titulo>
        <SubContainer>
          <Perguntas pergunta="1. Por que você não terminou um curso de graduação?" />
          <p>2. Você fez algum curso complementar?</p>
          <select value={this.state.selectValue} onChange={this.selecionaComplementar}>
            <option value="ingles"> Curso de Inglês </option>
            <option value="tecnico"> Curso Técnico </option>
            <option value="nenhum"> Não fiz curso complementar </option>
          </select>
        </SubContainer>
      </Container>
    )
  }

}

export default Form3