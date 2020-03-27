import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux';
import { push, goBack } from "connected-react-router";
import { routes } from "../Router"

import { getTripDetails, setTripDetails, decideCandidate } from '../../Actions'

import ButtonAppBar from '../../Components/AppBar'
import Title from '../../Components/Title'
import Candidates from '../../Components/Candidatos';


const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items:center;
  align-content: flex-start;
  h3{
    width:100%;
    text-align:center;
  }
`
const List = styled.div`
  width:80%;
  display: flex;
  flex-wrap:wrap;
  justify-content:space-between;
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
    else {
      this.props.getTripDetails(this.props.tripId)
    }
  }

  componentWillUnmount() {
    this.props.setTripDetails(undefined)
  }

  handleAproveClick = (candidateId) => {
    this.props.decideCandidate(this.props.tripId, candidateId)
  }

  render() {
    const btnAppBar = [{
      text: 'VOLTAR',
      click: this.props.goBack
    }]
    const { tripId, tripDetails } = this.props

    return (
      <Wrapper>
        <ButtonAppBar btns={btnAppBar} />
        {tripDetails ? <>
          <Title> Abaixo os detalhes da viagem e seus inscritos</Title>
          <h3>{`${tripDetails.name} - ${tripDetails.planet} - ${tripDetails.date} - ${tripDetails.durationInDays} dias`}</h3>
          { tripDetails.candidates.length >0 &&
            <List>
              {tripDetails.candidates.map((candidate, index) => (
                <Candidates
                  key={index}
                  candidate={candidate}
                  btnAproveClick={this.handleAproveClick}
                />
              ))}
            </List>
          }
          <h3>{tripDetails.approved.length > 0 && 'Lista de Aprovados'}</h3>
          <List>
            {tripDetails.approved.map((candidate, index) => (
              <Candidates
                key={index}
                candidate={candidate}
              />
            ))}
          </List></> :
          <h3>Carregando Eventos...</h3>
        }
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  tripId: state.details.detaieldTripId,
  tripDetails: state.details.tripDetails

})

const mapDispatchToProps = dispatch => ({
  setTripDetails: (details) => dispatch(setTripDetails(details)),
  getTripDetails: (id) => dispatch(getTripDetails(id)),
  decideCandidate: (tripId, candidateId) => dispatch(decideCandidate(tripId, candidateId)),
  goToLoginScreen: () => dispatch(push(routes.root)),
  goBack: () => dispatch(goBack())
})

export default connect(mapStateToProps, mapDispatchToProps)(TripDetailsPage)