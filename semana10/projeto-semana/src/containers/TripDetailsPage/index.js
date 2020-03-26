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

class TripDetailsPage extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const token = localStorage.getItem('token')
    if (token === null) {
      this.props.goToLoginScreen()
    }
  }

  render() {
    const { goToLoginScreen } = this.props
    return (
      <Wrapper>
        <ButtonAppBar btnText='LOGOUT' click={goToLoginScreen} />
        <Title> Abaixo os detalhes da viagem e seus inscritos</Title>
        <p>Página de detalhes da viagem</p>
      </Wrapper>
    )
  }
}
const mapDispatchToProps = dispatch => ({
  goToLoginScreen: () => dispatch(push(routes.root))
})

export default connect(null, mapDispatchToProps)(TripDetailsPage)