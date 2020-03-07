import React from 'react';
import styled from 'styled-components'
import axios from 'axios'
import MusicDetails from './MusicDetails';

const baseURL = 'https://us-central1-spotif4.cloudfunctions.net/api'
const token = 'danilo-sagan'

const Wrapper = styled.div`
  width:70%;
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
    font-size:1.1em;
    width:100%;
  }
  audio{
    background-color:blue;
    width:50%;
    height:40px;
    border-radius:20px;
  }
`
const SubDiv = styled.div`
  width:90%;
  display:flex;
  flex-flow: row wrap;
  justify-content:space-between;
  p{
    text-align:center;
    width:100%;
  }
 `

class PLDetailed extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      alreadySearch: false,
      musics: [],
      musicPlayingId: '',
      musicUrl: '',
      quantity: 0,
      play: false
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
        alreadySearch: true
      })
    }).catch(error => {
      console.log(error.response.status)
      console.log(error.response.data.message)
      window.alert('Opss, não encontramos essa playlist. Tente novamente ou entre com contato com nosso suporte')
    })
  }

  playMusic = (musicUrl, musicId) => {
    if (musicId === this.state.musicPlayingId) {
      this.setState({
        play: !this.state.play,
      })
    } else {
      this.setState({
        play: true,
        musicUrl: musicUrl,
        musicPlayingId: musicId
      })
    }
  }

  render() {
    const buscando = this.state.alreadySearch ? <p>Parece que não há músicas na sua Playlist</p> : <p>Buscando Detalhes da sua Playlist</p>
    const listaDetalhes = this.state.musics.map(music => {
      return (
        <MusicDetails
          key={music.id}
          name={music.name}
          artist={music.artist}
          url={music.url}
          musicId={music.id}
          plId={this.props.pLid}
          update={this.getPlDetails}
          playIt={this.playMusic}
          isPlaying={this.state.play}
          musicPlaying={this.state.musicPlayingId}
        />
      )
    })

    return (
      <Wrapper>
        <h2>{this.props.pLname}</h2>
        <SubDiv>
          {this.state.quantity > 0 && <h4>Quantidade de músicas encontradas: {this.state.quantity}</h4>}
          {this.state.quantity ? listaDetalhes : buscando}
        </SubDiv>
        {this.state.play && <audio src={this.state.musicUrl} controls ></audio>}
      </Wrapper>
    )
  }
}

export default PLDetailed