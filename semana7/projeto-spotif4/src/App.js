import React from 'react';
import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components'
import CriaPL from './Components/CriaPL';
import PlayLists from './Components/PlayLists';

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
      searchedPLId: '',
      pageShown: 'lista'
    }
  }

  onReceiveIdToSearch = (id) => {
    this.setState({
      searchedPLId: id
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
      case 'cadastro':
        selectedPage = <CriaPL />
        break;
      case 'lista':
        selectedPage = <PlayLists changePage={this.onPageChange} getId={this.onReceiveIdToSearch} />
        break;
      default:
        break;
    }
    return (
      <Wrapper>
        <GlobalStyle />
        <Header><h1>spotiF4</h1></Header>
        <Nav>
          <div onClick={() => this.onPageChange('cadastro')}>Criar nova Playlist</div>
          <div onClick={() => this.onPageChange('lista')}>Minhas Playlists</div>
          <div>Ouvidas Recentemente</div>
          <div>Sugestões para você</div>
        </Nav>
        <Main>
          {selectedPage}
        </Main>
      </Wrapper>

    );
  }
}

export default App;
