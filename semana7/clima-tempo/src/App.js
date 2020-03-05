import React from 'react';
import styled from 'styled-components'
import Cidades from './Components/Cidades';
import axios from 'axios'

const baseURL = 'https://www.metaweather.com'

const Odin = styled.div`
  *{
    margin:0;
    font-family: Candara, Calibri, Cambria, serif, sans-serif;
  }
  box-sizing:border-box;
  width:100%;
  height:100%;
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
const Nav = styled.div`
  width:17%;
  min-height:calc(100vh - 12vh - 16px);
  background-color: #eeaa7b;
  display:flex;
  flex-direction:column;
  align-items:flex-start;
`
const NavHead = styled.div`
  width:100%;
  height: 120px;
  background-color: #e37222;
  color: #ffffff;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:space-evenly;
`


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchValue: '',
      citiesListAPI: []
    }
  }

  onSearchInputChange = (event) => {
    this.setState({
      searchValue: event.target.value
    })
  }

  onClickBuscar = () => {
    const valueSearched = this.state.searchValue.toLowerCase()
    const request = axios.get(`${baseURL}/api/location/search/?query=${valueSearched}`)
    request.then(response => {
      console.log(response.status)
      console.log(response.statusText)
      console.log(response.data)
      this.setState({
        citiesListAPI:response.data
      })
    }).catch(error => {
      console.log(error)
    })
  }

  onCitySelect = (woeid) =>{

  }

  render() {
    let citiesList = this.state.citiesListAPI.map((city, index) => {
      return <Cidades key={index} local={city.title} onClick={() => this.onCitySelect(city.woeid)} />
    })

    return (
      <Odin>
        <Header> <h1>Sua Previsão do Tempo</h1></Header>
        <Nav>
          <NavHead>
            <h3>Localize um lugar especifico</h3>
            <input
              type='text'
              placeholder="Busque pela sua cidade"
              value={this.state.searchValue}
              onChange={this.onSearchInputChange}
            />
            <button onClick={this.onClickBuscar}>Buscar</button>
          </NavHead>
          {citiesList.length === 0 || citiesList}

        </Nav>

      </Odin>
    );
  }
}
export default App;
