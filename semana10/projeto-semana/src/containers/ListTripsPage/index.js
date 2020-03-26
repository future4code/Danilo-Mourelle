import React from 'react'
import styled from 'styled-components'
import { connect } from "react-redux";
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
    this.props.getTripsList();
  }

  render() {
    const { tripList } = this.props
    console.log(tripList)
    return (
      <Wrapper>
        <ButtonAppBar btnText='LOGOUT' />
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
  getTripsList: () => dispatch(getTripsList())
})

export default connect(mapStateToProps, mapDispatchToProps)(ListTripPages)