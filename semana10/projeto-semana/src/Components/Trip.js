import React from 'react'
import styled from 'styled-components'
import Button from "@material-ui/core/Button";

const Wrapper = styled.div`
  width: 40%;
  height:250px;
  border: solid 2px orange;
  border-radius: 5px;
  padding: 20px;
  margin:25px;
  display:flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items:center;
`
const DetailField = styled.p`
  margin:0;
  margin-bottom:10px;
  width: 40%;
`
const DetailsWrapper = styled.span`
  width:100%;
  height:70%;
  display:flex;
  flex-wrap:wrap;
  flex-direction:column;
`
const ButtonWrapper = styled.span`
  width: 100%;
  text-align:center;
`

function Trip(props) {
  return (
    <Wrapper>
      <DetailsWrapper>
        <DetailField><strong>Nome do Evento: </strong>{props.trip.name}</DetailField>
        <DetailField><strong>Planeta: </strong>{props.trip.planet}</DetailField>
        <DetailField><strong>Data: </strong>{props.trip.date}</DetailField>
        <DetailField><strong>Descrição: </strong>{props.trip.description}</DetailField>
        <DetailField><strong>Duração do Evento: </strong>{props.trip.durationInDays} dias</DetailField>

      </DetailsWrapper>
      <ButtonWrapper>
        <Button
          color='primary'
          variant="contained"
          type='submit' >Detalhes</Button>
      </ButtonWrapper>

    </Wrapper>
  )
}

export default Trip