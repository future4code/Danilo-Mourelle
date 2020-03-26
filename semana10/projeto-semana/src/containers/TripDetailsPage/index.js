import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux';
import { push, goBack } from "connected-react-router";
import { routes } from "../Router"

import { getTripDetails } from '../../Actions'

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

class TripDetailsPage extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const token = localStorage.getItem('token')
    if (token === null) {
      this.props.goToLoginScreen()
    }
    else{
      this.props.getTripDetails(this.props.tripId)
    }
  }
  render() {
    const btnAppBar = [
      {
        text: 'VOLTAR',
        click: this.props.goBack
      }
    ]
    return (
      <Wrapper>
        <ButtonAppBar btns={btnAppBar} />
        <Title> Abaixo os detalhes da viagem e seus inscritos</Title>
        <p>Página de detalhes da viagem</p>
        {this.props.tripId}
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  tripId: state.details.detaieldTripId
})

const mapDispatchToProps = dispatch => ({
  getTripDetails: (id) => dispatch(getTripDetails(id)),
  goBack: () => dispatch(goBack())
})

export default connect(mapStateToProps, mapDispatchToProps)(TripDetailsPage)