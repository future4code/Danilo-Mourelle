import React from 'react'
import styled from 'styled-components'
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { routes } from "../Router"

import { getTripsList } from "../../Actions"

import Trip from '../../Components/Trip';
import ButtonAppBar from '../../Components/AppBar'
import Title from '../../Components/Title'

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items:flex-start;
`
const List = styled.div`
  width:80%;
  display: flex;
  flex-wrap:wrap;
  justify-content:space-between;
`



class ListTripPages extends React.Component {
  componentDidMount() {
    const token = localStorage.getItem('token')
    if(token === null){
      this.props.goToLoginScreen()
    } else {
      this.props.getTripsList();
    }
  }
 

  render() {
    const { tripList, goToLoginScreen } = this.props
    console.log(tripList)
    return (
      <Wrapper>
        <ButtonAppBar btnText='LOGOUT' click={goToLoginScreen} />
        <Title> Lista com as viagens cadastradas </Title>
        <List>
          {tripList.map((trip, index, tripList) => (
            <Trip key={index} trip={trip} />
          ))}
        </List>
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  tripList: state.trips.tripList
})
const mapDispatchToProps = dispatch => ({
  getTripsList: () => dispatch(getTripsList()),
  goToLoginScreen: () => dispatch(push(routes.root))
})

export default connect(mapStateToProps, mapDispatchToProps)(ListTripPages)