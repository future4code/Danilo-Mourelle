import React from 'react';
import styled from 'styled-components'
import axios from 'axios'

const baseURL = 'https://us-central1-spotif4.cloudfunctions.net/api'
const token = 'danilo-sagan'

const Wrapper = styled.div`
  width:60%;
  height:50vh;
  border: solid 3px #f05555;
  border-radius: 15px;
  padding: 20px 0;
  background-color:#999;
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content:space-evenly;
  font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  h2{
    font-size:2.5em;
    margin:0;
  }
  label{
    font-size:1.5em;
  }
  input{
    width: 300px;
    height:30px;
    border-radius:5px;
    border:none;
    margin-top:5px;
  }
  button{
    height: 50px;
    width: 200px;
    background-color: #f05555;
    border-radius: 5px;
    border: 1px solid black;
    font-size:1.3em
  }
`

class CriaPL extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nameNewPL: ''
    }
  }

  onInputNameChange = (event) => {
    this.setState({
      nameNewPL: event.target.value
    })
  }

  createPL = () => {
    const dataToSend = {
      name: this.state.nameNewPL
    }
    const request = axios.post(`${baseURL}/playlists/createPlaylist`, dataToSend, {
      headers: {
        auth: token
      }
    })
    request.then(response => {
      console.log(response.status)
      console.log(response.statusText)
      window.alert('Playlist criada com sucesso!')
      this.setState({
        nameNewPL: ''
      })
    }).catch(error => {
      console.log(error.response.status)
      console.log(error.response.data.message)
      if (error.response.data.message === 'There already is a playlist with a similiar name.'){
        window.alert('Este nome já existe, por favor escolha outro')
      } else{
        window.alert('Opss, parece que algo deu errado. Tente novamente ou entre com contato com nosso suporte')
      }
    })
  }


  render() {
    return (
      <Wrapper>
        <h2>Cria a sua Nova Playlist</h2>
        <span>
          <label for='newPL'>Nome da Playlist</label><br />
          <input type='text' id='newPL' placeholder='Sua nova playlist' value={this.state.nameNewPL} onChange={this.onInputNameChange} />
        </span>
        <button onClick={this.createPL}> Criar Playlist</button>
      </Wrapper>

    )
  }
}

export default CriaPL