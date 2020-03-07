import React from 'react';
import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components'
import CriaPL from './Components/CriaPL';
import PlayLists from './Components/PlayLists';
import PLDetailed from './Components/PLDetailed';
import AddMusic from './Components/AddMusic';

const GlobalStyle = createGlobalStyle`
  body{
    margin:0;
    width:100%;
  }
  *{
    box-sizing:border-box;
  }
  #root{
    height:100vh;
  }
`
const Wrapper = styled.div`
  width:100%;
  background-color:#555;
  min-height:100%;
  padding-bottom:50px;
`
const Header = styled.header` 
    background-color: #f05555;
    width:100%;
    height:100px;
    display:flex;
    align-items:center;
    justify-content:center;
    font-weight:bold;
  h1 {
    font-family: Candara;
  }
`
const Nav = styled.nav`
  width: 100%;
  height: 40px;
  background-color:#000;
  color:#f05555;
  display:flex;

  div{
    width:25%;
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:1.2em;
    :hover{
      cursor: pointer;
      font-style:italic;
      font-weight:bold;
    }
  }
  
  div + div {
    border-left: solid 1px #f05555;
  }
`
const Main = styled.main`
  width:100%;
  height: auto;
  display:flex;
  justify-content:center;
  padding-top:150px;
`


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchedPlId: '',
      searchedPlName: '',
      pageShown: 'addMusic'
    }
  }

  onReceivePlData = (id, name) => {
    this.setState({
      searchedPlId: id,
      searchedPlName: name
    })
  }

  onPageChange = (pageRequested) => {
    this.setState({
      pageShown: pageRequested
    })
  }

  render() {
    let selectedPage
    switch (this.state.pageShown) {
      case 'addPlaylist':
        selectedPage = <CriaPL />
        break;
      case 'playlists':
        selectedPage = <PlayLists changePage={this.onPageChange} getPlData={this.onReceivePlData} />
        break;
      case 'detail':
        selectedPage = <PLDetailed pLid={this.state.searchedPlId} pLname={this.state.searchedPlName} />
        break;
      case 'addMusic':
        selectedPage = <AddMusic />
        break;
      default:
        break;
    }
    return (
      <Wrapper>
        <GlobalStyle />
        <Header><h1>spotiF4</h1></Header>
        <Nav>
          <div onClick={() => this.onPageChange('addPlaylist')}>Criar nova Playlist</div>
          <div onClick={() => this.onPageChange('playlists')}>Minhas Playlists</div>
          <div onClick={() => this.onPageChange('addMusic')}>Adicionar Música</div>
          <div>Ouvidas Recentemente</div>
        </Nav>
        <Main>
          {selectedPage}
        </Main>
      </Wrapper>

    );
  }
}

export default App;
