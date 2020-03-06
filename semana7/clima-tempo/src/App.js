import React from 'react';
import styled from 'styled-components'
import NavLateral from './Components/NavLateral';
import CorpoCentral from './Components/CorpoCentral';
import { createGlobalStyle } from "styled-components";
import axios from 'axios'

const baseURL = 'https://www.metaweather.com'

const GlobalStyle = createGlobalStyle`
/* SUAS REGRAS DE CSS AQUI */
body *{
    margin:0;
    font-family: Candara, Calibri, Cambria, serif, sans-serif;
    box-sizing:border-box;
  }
`

const Odin = styled.div`
  box-sizing:border-box;
  width:100%;
  height:100%;
  margin:1px;
  min-height:calc(100vh - 16px);
  background-color:#e0e1dc;
  display:flex;
  flex-wrap:wrap;
  
`
const Header = styled.div`
  width:100%;
  min-height:12vh;
  background-color:#07889b;
  color:#ffffff;
  display: flex;
  justify-content:center;
  align-items:center;
`

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchValue: '',
      woeid: '',
      citiesListAPI: [],
      cityData: []
    }
  }

  onCitySelect = (newWoeid) => {
    const request = axios.get(`${baseURL}/api/location/${newWoeid}/`)
    request.then(response => {
      console.log(response.status)
      console.log(response.statusText)
      this.setState({
        cityData: response.data,
        woeid: newWoeid
      })
    }).catch(error => {
      console.log(error)
    })
  }

  render() {
    console.log(this.state.cityData)
    return (
      <Odin>
        <GlobalStyle />
        <Header> <h1>Sua Previsão do Tempo</h1></Header>
        <NavLateral citySelect={this.onCitySelect} />
        {this.state.cityData.length === 0 || <CorpoCentral cityData={this.state.cityData} />}
      </Odin>
    );
  }
}
export default App;
