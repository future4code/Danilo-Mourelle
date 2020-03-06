import React from 'react';
import styled from 'styled-components'
import axios from 'axios'
import MusicDetails from './MusicDetails';

const baseURL = 'https://us-central1-spotif4.cloudfunctions.net/api'
const token = 'danilo-sagan'

const Wrapper = styled.div`
  width:60%;
  min-height:50vh;
  border: solid 3px #f05555;
  border-radius: 15px;
  padding: 80px;
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
  h4{
    width:100%;
  }
  `
  const SubDiv = styled.div`
    display:flex;
    flex-flow: row wrap;
    justify-content:space-between;
 `

class PLDetailed extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      musics: [],
      quantity: 0
    }
  }

  componentDidMount() {
    this.getPlDetails(this.props.pLid)
  }

  getPlDetails = (id) => {
    const request = axios.get(`${baseURL}/playlists/getPlaylistMusics/${id}`, {
      headers: {
        auth: token
      }
    })
    request.then(response => {
      console.log(response.status)
      console.log(response.statusText)
      this.setState({
        quantity: response.data.result.quantity,
        musics: response.data.result.musics,
      })
    }).catch(error => {
      console.log(error.response.status)
      console.log(error.response.data.message)
      window.alert('Opss, não encontramos essa playlist. Tente novamente ou entre com contato com nosso suporte')
    })
  }

  render() {
    const buscando = <p>Buscando Detalhes da sua Playlist</p>
    const listaDetalhes = this.state.musics.map(music => {
      return (
        <MusicDetails name={music.name} artist={music.artist} url={music.url} />
      )

    })

    return (
      <Wrapper>

        <h2>{this.props.pLname}</h2>
        <SubDiv>
          {this.state.quantity > 0 && <h4>Quantidade de músicas encontradas: {this.state.quantity}</h4>}
          {this.state.quantity ? listaDetalhes : buscando}
        </SubDiv>
      </Wrapper>

    )
  }
}

export default PLDetailed