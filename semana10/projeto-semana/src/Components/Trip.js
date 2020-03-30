import React from 'react'
import styled from 'styled-components'

function Trip(props) {
  return (
    <div>
      <p><strong>Trip Id:</strong></p>
      <p>{props.trip.id}</p>
      <p><strong>Trip Name:</strong></p>
      <p>{props.trip.name}</p>
      <p><strong>Trip Planet:</strong></p>
      <p>{props.trip.planet}</p>
      <p><strong>Trip Date:</strong></p>
      <p>{props.trip.date}</p>
      <p><strong>Trip Description:</strong></p>
      <p>{props.trip.description}</p>
      <p><strong>Trip Duration:</strong></p>
      <p>{props.trip.durationInDays}</p>
      <hr />
    </div>
  )
}

export default Trip