import React from 'react';
import styled from 'styled-components'
import Inputs from './Components/Inputs';
import axios from 'axios'
import Lista from './Components/Lista';

const baseUrl = "https://us-central1-future4-users.cloudfunctions.net/api"
const token = "danilo-sagan"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nome: '',
      email: '',
      paginaAtual: 'cadastro',

    }
  }

  onPageChange = () => {
    let actualPage = this.state.paginaAtual
    
    if (actualPage === 'cadastro') {
      this.setState({
        paginaAtual: 'lista'
      })
    }
    else {
      this.setState({
        paginaAtual: 'cadastro'
      })
    }
  }

  onValueUpdate = (input, newValue) => {
    this.setState({
      [input]: newValue
    })
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
    }).catch((error) => {
      window.alert('Erro inesperado')
    })
  }

  render() {

    return (
      <div>
        {/*  <Inputs
          nome={this.state.nome}
          email={this.state.email}
          refreshValue={this.onValueUpdate}
          sendData={this.onDataSend}
          changePage={this.onPageChange}
        /> */}
        <Lista
          changePage={this.onPageChange}
        />
      </div>
    );
  }
}


export default App;
