import React from 'react'
import styled from 'styled-components'
import axios from 'axios'

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

const baseUrl = "https://us-central1-future4-users.cloudfunctions.net/api"
const token = "danilo-sagan"

class Lista extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listaDePessoas: []
    }

  }

  componentDidMount(){
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
      console.log(response.data.result)
      this.setState({
        listaDePessoas:response.data.result
      })
    }).catch((error) => {
      console.log("deu ruim")
    })
  }

  render() {

    const novaListaDePessoas = this.state.listaDePessoas.map((cadaPessoa, index, array) => {
      return (
      <Elemento key={cadaPessoa.id}>
        <p>{cadaPessoa.name}</p>
        <p>X</p>
      </Elemento>
      )
    })

    return (
      <Container>
        <h2>Lista de Usuários</h2>
        <Wrapper>
          {this.state.listaDePessoas ? novaListaDePessoas : <p>Carregando...</p>}
        </Wrapper>
        <button onClick={this.props.changePage}>Ir para página de cadastro</button>
      </Container>
    )
  }
}



export default Lista