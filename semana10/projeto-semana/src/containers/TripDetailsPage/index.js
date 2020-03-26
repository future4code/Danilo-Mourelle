import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import { routes } from "../Router"

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

function TripDetailsPage(props) {
  const { goToLoginScreen } = props
  return (
    <Wrapper>
      <ButtonAppBar btnText='LOGOUT' click={goToLoginScreen} />
      <Title> Abaixo os detalhes da viagem e seus inscritos</Title>
      <p>Página de detalhes da viagem</p>
    </Wrapper>
  )
}
const mapDispatchToProps = dispatch => ({
  goToLoginScreen: () => dispatch(push(routes.root))
})

export default connect(null, mapDispatchToProps)(TripDetailsPage)