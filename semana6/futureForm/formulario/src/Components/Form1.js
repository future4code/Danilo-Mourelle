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

class Form1 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      valor1: "",
      valor2: "",
      valor3: "",
    }
  }

  atualizaValor = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    console.log(this.state.valor1)
    console.log(this.state.valor2)
    console.log(this.state.valor3)
    return (
      <Container>
        <Titulo>ETAPA 1 - DADOS GERAIS</Titulo>
        <SubContainer>
          <p>1. Qual seu nome?</p>
          <input type="text" name="valor1" onChange={this.atualizaValor} value={this.state.valor1} />
          <p>2. Qual sua idade?</p>
          <input type="text" name="valor2" onChange={this.atualizaValor} value={this.state.valor2} />
          <p>3. Qual seu e-mail?</p>
          <input type="text" name="valor3" onChange={this.atualizaValor} value={this.state.valor3} />
          <p>4. Qual o grau de escolaridade?</p>
          <select onChange={this.props.selecao}>
            <option value="medioIncompleto"> Ensino Médio Incompleto </option>
            <option value="medioCompleto"> Ensino Médio Completo </option>
            <option value="superiorIncompleto"> Ensino Superior Incompleto </option>
            <option value="superiorCompleto"> Ensino Superior Completo </option>
          </select>
        </SubContainer>
      </Container>
    )
  }

}

export default Form1

