import React from 'react'
import styled from 'styled-components'
import axios from 'axios'

//* **STYLED COMPONENTS** */
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
//--------------------------------------------------------------------------

//* **VARIAVEIS GLOBAIS JS** */
const baseUrl = "https://us-central1-future4-users.cloudfunctions.net/api"
const token = "danilo-sagan"
//--------------------------------------------------------------------------

//* **COMPONENTE DE CLASSE** */
class Inputs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nome: '',
      email: ''
    }
  }

  onChangeInputValue = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  onDataSend = () => {
    const dataToSend = {
      name: this.state.nome,
      email: this.state.email
    }
    
    const request = axios.post(`${baseUrl}/users/createUser`, dataToSend, {
      headers: {
        "Content-Type": "application/json",
        "api-token": token
      }
    })

    request.then((response) => {
      window.alert('Dados enviados com sucesso!')
      this.setState({
        nome: '',
        email: ''
      })
    }).catch((error) => {
      window.alert('Erro inesperado')
    })
  }

  render() {
    return (
      <Container>
        <Wrapper>
          <label for="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={this.state.nome}
            onChange={this.onChangeInputValue}
          />
          <label for="email">E-mail:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={this.state.email}
            onChange={this.onChangeInputValue}
          />
          <button onClick={this.onDataSend}>Enviar</button>
        </Wrapper>
        <button onClick={this.props.changePage}>Ir para página de lista</button>
      </Container>
    )
  }
}
//----------------------------------------------------------------------------------


export default Inputs