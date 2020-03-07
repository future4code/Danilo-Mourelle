import React from 'react'
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
    font-size:1.4em;
  }
  select{
    width: 300px;
    height:30px;
    border-radius:5px;
    border:none;
    margin-top:5px;
    font-size:1.1em;;
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
    font-size:1.3em;
    :hover{
      background-color:#000;
      color: #f05555;
    }
  }
`

class AddMusic extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      playlistId: '',
      musicName: 'alo1',
      artist: 'Red Hot Chilli Peppers',
      url: 'http://spoti4.future4.com.br/1.mp3',
      playlist: [],

    }
  }

  onInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  componentDidMount() {
    this.getPlData()
  }

  getPlData = () => {
    const request = axios.get(`${baseURL}/playlists/getAllPlaylists`, {
      headers: {
        auth: token
      }
    })
    request.then(response => {
      console.log(response.status)
      console.log(response.statusText)
      this.setState({
        playlist: response.data.result.list
      })

    }).catch(error => {
      console.log(error.response.status)
      console.log(error.response.data.message)
      window.alert('Opss, parece que algo deu errado. Tente novamente ou entre com contato com nosso suporte')
    })
  }

  addNewMusic = () => {
    if (this.state.musicName && this.state.artist && this.state.url) {
      const newMusic = {
        playlistId: this.state.playlistId,
        music: {
          name: this.state.musicName,
          artist: this.state.artist,
          url: this.state.url
        }
      }
      const request = axios.put(`${baseURL}/playlists/addMusicToPlaylist`, newMusic, {
        headers: {
          auth: token,
          'Content-Type': "application/json"
        }
      })
      request.then(response => {
        console.log(response.status)
        console.log(response.statusText)
        window.alert('Música adcionada com sucesso a playlist')
      }).catch(error => {
        console.log(error.response.status)
        console.log(error.response.data.message)
        window.alert('Opss, parece que algo deu errado ao adicionar sua música. Tente novamente ou entre com contato com nosso suporte')
      })
    } else {
      window.alert('Preencha todos os campos')
    }
  }

  render() {
    let optionsSelect
    if (this.state.playlist.length < 1) {
      optionsSelect = <option>Carregando</option>
    } else {
       
       optionsSelect = this.state.playlist.map(playlist => { return (<option key={playlist.id} value={playlist.id}>{playlist.name}</option>)})
       optionsSelect = [<option hidden>Selecione</option>, ...optionsSelect]
    }
  
    return (
      <Wrapper>
        <h2>Adicione uma musica a sua PlayList</h2>
        <span>
          <label htmlFor='musicName'>Música: </label><br />
          <input type='text' id='musicName' name='musicName' value={this.state.musicName} onChange={this.onInputChange} /><br />
          <label htmlFor='artist'>Artista: </label><br />
          <input type='text' id='artist' name='artist' value={this.state.artist} onChange={this.onInputChange} /><br />
          <label htmlFor='url'>Endereço: </label><br />
          <input type='text' id='url' name='url' value={this.state.url} onChange={this.onInputChange} /><br />
          <label htmlFor='plSelection'>Selecione sua Playlist: </label><br />
          <select name='playlistId' value={this.state.playlistId} onChange={this.onInputChange}>
            {optionsSelect}
          </select>
        </span>
        <button onClick={this.addNewMusic}> Adicionar Musica</button>
      </Wrapper>
    )
  }
}

export default AddMusic