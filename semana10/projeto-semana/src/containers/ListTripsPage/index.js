import React from 'react'
import styled from 'styled-components'

import { connect } from "react-redux";
import { push } from "connected-react-router";
import { routes } from "../Router"

import { getTripsList, setTripIdToDetail } from "../../Actions"

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
  align-content: flex-start;
`
const List = styled.div`
  width:80%;
  display: flex;
  flex-wrap:wrap;
  justify-content:space-between;
`



class ListTripPages extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const token = localStorage.getItem('token')
    if (token === null) {
      this.props.goToLoginScreen()
    } else {
      this.props.getTripsList();
    }
  }

  handleDetailClick = (tripId) => {
    this.props.setTripIdToDetail(tripId)
    this.props.goToTripDetailsPage()
  }


  render() {
    const { tripList, goToCreatTripScreen, goToLoginScreen } = this.props

    const btnAppBar = [
      {
        text: 'CRIAR TRIP',
        click: goToCreatTripScreen
      },
      {
        text: 'LOGOUT',
        click: goToLoginScreen
      }
    ]
    return (
      <Wrapper>
        <ButtonAppBar btns={btnAppBar} />
        {tripList.length > 0 ? <>
          <Title> Lista com as viagens cadastradas </Title>
          <List>
            {tripList.map((trip, index) => (
              <Trip
                key={index}
                trip={trip}
                btnDetailClick={this.handleDetailClick}
              />
            ))}
          </List> </> :
          <h3>Carregando Eventos...</h3>
        }
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  tripList: state.trips.tripList
})

const mapDispatchToProps = dispatch => ({
  setTripIdToDetail: (id) => dispatch(setTripIdToDetail(id)),
  getTripsList: () => dispatch(getTripsList()),
  goToLoginScreen: () => dispatch(push(routes.root)),
  goToCreatTripScreen: () => dispatch(push(routes.tripCreation)),
  goToTripDetailsPage: () => dispatch(push(routes.tripsDetails))
})

export default connect(mapStateToProps, mapDispatchToProps)(ListTripPages)