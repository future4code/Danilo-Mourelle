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
class Lista extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      temDadosNaLista: true,
      listaDePessoas: []
    }

  }

  componentDidMount() {
    this.onListUpdate()
  }

  onListUpdate = () => {
    const request = axios.get(`${baseUrl}/users/getAllUsers`, {
      headers: {
        "Content-Type": "application/json",
        "api-token": token
      }
    })
    request.then((response) => {
      console.log(response.status)
      console.log(response.statusText)
      console.log(response.data.result)
      this.setState({
        temDadosNaLista: true,
        listaDePessoas: response.data.result
      })
    }).catch((error) => {
      console.log(error.response.status)
      console.log(error.response.data.message)
      this.setState({
        temDadosNaLista: false,
        listaDePessoas: []
      })
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
        this.onListUpdate()
      }).catch((error) => {
        console.log(error.response.status)
        console.log(error.response.data.message)
        window.alert("Erro inesperado ao deletar, tente novamente mais tarde")
      })
    }
  }

  onClickNome = (id) =>{
    this.props.changePage("detalhe")
    this.props.getId(id)
  }

  render() {

    const novaListaDePessoas = this.state.listaDePessoas.map((cadaPessoa, index, array) => {
      return (
        <Elemento key={cadaPessoa.id}>
          <p onClick={() => this.onClickNome(cadaPessoa.id)}>{cadaPessoa.name}</p>
          <DeleteP onClick={() => this.onDeletePerson(cadaPessoa.id)}>X </DeleteP>
        </Elemento>
      )
    })

    return (
      <Container>
        <h2>Lista de Usuários</h2>
        <Wrapper>
          {this.state.listaDePessoas.length === 0 ? this.state.temDadosNaLista ? <p>Carregando...</p> : <p>Sem dados para mostrar</p> : novaListaDePessoas}
        </Wrapper>
        <button onClick={() => this.props.changePage("cadastro")}>Ir para página de cadastro</button>
      </Container>
    )
  }
}



export default Lista