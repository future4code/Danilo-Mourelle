import React from 'react';
import styled from 'styled-components'
import axios from 'axios'
import ListItem from './ListItem';

const baseURL = 'https://us-central1-spotif4.cloudfunctions.net/api'
const token = 'danilo-sagan'

const Wrapper = styled.div`
  width:60%;
  min-height:50vh;
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
  & > div{
    width:60%;
    p{
      width:100%;
      text-align:center;
    }
  }
 `

class PlayLists extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      AllPlayLists: [],
      qtdPlayLists: ''
    }
  }

  componentDidMount() {
    this.getAllPL()
  }

  getAllPL = () => {
    const request = axios.get(`${baseURL}/playlists/getAllPlaylists`, {
      headers: {
        auth: token
      }
    })
    request.then(response => {
      console.log(response.status)
      console.log(response.statusText)
      this.setState({
        AllPlayLists: response.data.result.list,
        qtdPlayLists: response.data.result.quantity,
      })
    }).catch(error => {
      console.log(error.response.status)
      console.log(error.response.data.message)
      window.alert('Opss, parece que algo deu errado. Tente novamente ou entre com contato com nosso suporte')
    })
  }

  onDeletePL = (id) => {
    if (window.confirm("Deseja realmente deletar esta Playlist?")) {
      const request = axios.delete(`${baseURL}/playlists/deletePlaylist?playlistId=${id}`, {
        headers: {
          auth: token
        }
      })
      request.then((response) => {
        console.log(response.status)
        console.log(response.statusText)
        window.alert("Deletado com Sucesso.... Atualizando")
        this.getAllPL()
      }).catch((error) => {
        console.log(error.response.status)
        console.log(error.response.data.message)
        window.alert("Erro inesperado ao deletar, tente novamente mais tarde")
      })
    }
  }

  onClickPLName = (id) => {
    this.props.changePage("detail")
    this.props.getId(id)
  }

  render() {
    const buscando = <p>Buscando Listas</p>
    return (
      <Wrapper>
        <h2>Minhas Playlists</h2>
        <div>
          {this.state.qtdPlayLists ?
            this.state.AllPlayLists.map(playlist => (
              <ListItem >
                <span onClick={() => this.onClickPLName(playlist.id)} > {playlist.name} </span>
                <span onClick={() => this.onDeletePL(playlist.id)} > <i class="fa fa-trash-o" ></i> </span>
              </ListItem>)) :
            buscando}
        </div>
      </Wrapper>

    )
  }
}

export default PlayLists
