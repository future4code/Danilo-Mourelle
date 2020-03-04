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
  height: 80%;
  background: #aaa;
  justify-content: flex-start;
  font-size:1.2em;
  margin: 5% auto;
`
const Elemento = styled.div`
  width:90%;
  display: flex;
  justify-content:space-between;
  margin:0 5%;
`
const DeleteP = styled.p`
  :hover{
    color: red;
    cursor: pointer;
  }
`
//--------------------------------------------------------------------------

//* **VARIAVEIS GLOBAIS JS** */
const baseUrl = "https://us-central1-future4-users.cloudfunctions.net/api"
const token = "danilo-sagan"
//--------------------------------------------------------------------------

//* **COMPONENTE DE CLASSE** */
class Detalhes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nome: '',
      email: '',
      id: '',
      textoBotao: 'Editar',
      novoNome: '',
      novoEmail: ''
    }
  }

  onChangeInputValue = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  componentDidMount() {
    this.onSearchPerson(this.props.id)
  }

  onSearchPerson = (id) => {
    const request = axios.get(`${baseUrl}/users/getUser/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "api-token": token
      }
    })
    request.then((response) => {
      console.log(response.status)
      console.log(response.statusText)
      this.setState({
        nome: response.data.result.name,
        email: response.data.result.email,
        id: response.data.result.id,
      })
    }).catch((error) => {
      console.log(error.response.status)
      console.log(error.response.data.message)
      window.alert("Erro inesperado ao buscar esta pessoa, tente novamente mais tarde")
    })
  }

  onDeletePerson = (id) => {
    if (window.confirm("Deseja realmente deletar este usuário?")) {
      const request = axios.delete(`${baseUrl}/users/deleteUser?id=${id}`, {
        headers: {
          "Content-Type": "application/json",
          "api-token": token
        }
      })
      request.then((response) => {
        console.log(response.status)
        console.log(response.statusText)
        window.alert("Deletado com Sucesso.... Atualizando")
      }).catch((error) => {
        console.log(error.response.status)
        console.log(error.response.data.message)
        window.alert("Erro inesperado ao deletar, tente novamente mais tarde")
      })
    }
  }

  onEditPerson = () => {
    this.state.textoBotao === "Salvar" && this.onDataUpdateSend()
    this.state.textoBotao === "Editar" ? this.setState({ textoBotao: "Salvar" }) : this.setState({ textoBotao: "Editar" })
  }

  onDataUpdateSend = () => {
    const dataToSend = {
      user: {
        id: this.state.id,
        name: this.state.novoNome || this.state.nome,
        email: this.state.novoEmail || this.state.email
      }
    }

    const request = axios.put(`${baseUrl}/users/editUser`, dataToSend, {
      headers: {
        "Content-Type": "application/json",
        "api-token": token
      }
    })

    request.then((response) => {
      console.log(response.status)
      console.log(response.statusText)
      window.alert('Dados editados com sucesso!')
      this.onSearchPerson(this.state.id)

    }).catch((error) => {
      console.log(error.response.status)
      console.log(error.response.data.message)
      window.alert('Erro inesperado na Edição')
    })
  }

  render() {
    let conteudoComum = <span>
      <p>Nome: {this.state.nome}</p>
      <p>E-mail: {this.state.email}</p>
      <p>Id: {this.state.id}</p> </span>

    let conteudoMostrado
    if (this.state.nome) {
      if (this.state.textoBotao === "Editar") {
        conteudoMostrado =
          <span>
            <button onClick={() => this.onDeletePerson(this.state.id)}>Deletar essa Pessoa</button>
            <button onClick={this.onEditPerson}>{this.state.textoBotao}</button>
          </span>
      }
      else {
        conteudoMostrado =
          <span>
            <input
              name="novoNome"
              placeholder="Novo Nome"
              value={this.state.novoNome}
              onChange={this.onChangeInputValue} />
            <input
              name="novoEmail"
              placeholder="Novo E-mail"
              type="email"
              value={this.state.novoEmail}
              onChange={this.onChangeInputValue} />
            <button onClick={() => this.onDeletePerson(this.state.id)}>Deletar essa Pessoa</button>
            <button onClick={this.onEditPerson}>{this.state.textoBotao}</button>
          </span>
      }
    }
    else {
      conteudoComum = ''
      conteudoMostrado = <p>Carregando...</p>
    }

    return (
      <Container>
        <h2>Detalhe do Usuário</h2>
        <Wrapper>
          {conteudoComum}
          {conteudoMostrado}
        </Wrapper>
        <button onClick={() => this.props.changePage("lista")}>Ir para página de lista</button>
      </Container>
    )
  }
}



export default Detalhes