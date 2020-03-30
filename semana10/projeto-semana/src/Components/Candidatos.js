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

function Candidates(props) {
  const { candidate } = props
  return (
    <Wrapper>
      <DetailsWrapper>
        <DetailField><strong>Nome: </strong>{candidate.name}</DetailField>
        <DetailField><strong>Idade: </strong>{candidate.age}</DetailField>
        <DetailField><strong>Profissão: </strong>{candidate.profession}</DetailField>
        <DetailField><strong>País: </strong>{candidate.country}</DetailField>
        <DetailField><strong>Porque escolher: </strong>{candidate.applicationText} dias</DetailField>
      </DetailsWrapper>
      {props.btnAproveClick && <ButtonWrapper>
        <Button
          color='primary'
          variant="contained"
          onClick={() => props.btnAproveClick(candidate.id)}
          type='submit' >Aprovar Candidato</Button>
      </ButtonWrapper>}

    </Wrapper>
  )
}

export default Candidates