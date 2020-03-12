import React from 'react';
import styled from 'styled-components'
import axios from 'axios'

const baseURL = 'https://us-central1-spotif4.cloudfunctions.net/api'
const token = 'danilo-sagan'

const Wrapper = styled.div`
  display:flex;
  flex-direction:row;
  width: 45%;
  font-size:1.1em;
  border: 1px solid #000;
  background-color: #fff;
  border-radius: 5px;
  padding:10px;
  justify-content:space-between;
  margin-bottom:20px;
  span span{
    font-weight:bold;
  }
  div{
    display:flex;
    flex-direction:column;
  }
  & > div:nth-child(2){
    display:flex;
    flex-direction:column;
    justify-content:space-between;
  } 
  & div div { 
    width:25px;
    height:25px;
    background-color:#f05555;
    border-radius:5px;
    display:flex;
    justify-content:center;
    align-items:center;
    :hover{
      background-color:#000;
      cursor: pointer;
      .fa-trash-o, .fa-play, .fa-pause {
        color:#f05555
      }
    }
  }
  .fa-trash-o, .fa-play, .fa-pause{
    font-size:18px;
    color:#000;
  }
`

class MusicDetails extends React.Component {

  onDeleteMusic = (plId, musicId) => {
    const request = axios.delete(`${baseURL}/playlists/removeMusicFromPlaylist?playlistId=${plId}&musicId=${musicId}`, {
      headers: {
        auth: token
      }
    })
    request.then(response => {
      console.log(response.status)
      console.log(response.statusText)
      window.alert('Música apagada com sucesso')
      this.props.update(plId)
    }).catch(error => {
      console.log(error.response.status)
      console.log(error.response.data.message)
      window.alert('Não foi possível apagar sua música, tente novamente')
    })
  }

  render() {
    let btnPlayer
    if(this.props.isPlaying === true && this.props.musicPlaying === this.props.musicId){
      btnPlayer = <div onClick={() => this.props.playIt(this.props.url,this.props.musicId)}><i className="fa fa-pause" /></div>
    } else {
      btnPlayer = <div onClick={() => this.props.playIt(this.props.url,this.props.musicId)}><i className="fa fa-play" /></div>
    }
    return (
      <Wrapper>
        <div>
          <span><span>Nome: </span>{this.props.name} </span>
          <span><span>Artist: </span>{this.props.artist} </span>
          <span><span>Endereço: </span>{this.props.url} </span>
        </div>
        <div>
          <div onClick={() => this.onDeleteMusic(this.props.plId, this.props.musicId)}><i className="fa fa-trash-o" /></div>
          {btnPlayer}
        </div>
        
      </Wrapper>
    )
  }
}

export default MusicDetails