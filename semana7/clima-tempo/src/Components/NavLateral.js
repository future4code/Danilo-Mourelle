import React from 'react';
import styled from 'styled-components'
import Cidades from './Cidades';
import axios from 'axios'

const baseURL = 'https://www.metaweather.com'

const Wrapper = styled.div`
  width:15%;
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


class NavLateral extends React.Component {
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
        citiesListAPI: response.data
      })
    }).catch(error => {
      console.log(error)
    })
  }

  transferWoeid = (woeid) => {
    this.props.citySelect(woeid)
  }


  render() {
    let citiesList = this.state.citiesListAPI.map((city, index) => {
      return <Cidades key={index} local={city.title} woeid={city.woeid} getWoeid={this.transferWoeid} />
    })

    return (
      <Wrapper>
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
      </Wrapper>
    );
  }
}
export default NavLateral;