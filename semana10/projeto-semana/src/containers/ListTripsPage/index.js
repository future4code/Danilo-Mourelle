import React from 'react'
import styled from 'styled-components'

import { connect } from "react-redux";
import Trip from '../../Components/Trip';
import { getTripsList } from "../../Actions"


class ListTripPages extends React.Component {
  componentDidMount() {
    this.props.getTripsList();
  }

  render() {
    const { tripList } = this.props
    console.log(tripList)
    return (
      <div>
        {tripList.map((trip, index, tripList) => (
          <Trip key={index} trip={trip} />
        ))}
      </div>
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