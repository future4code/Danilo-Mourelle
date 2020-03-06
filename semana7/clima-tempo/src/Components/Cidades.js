import React from 'react';
import styled from 'styled-components'

const Wrapper = styled.div`
  display:flex;
  border-bottom:solid 1px  #e37222;
  width:100%;
  padding:15px;
  font-size:1.1em;
  box-sizing:border-box;
  & :hover{
    font-style:italic;
    cursor: pointer;
  }
`

function Cidades (props) {
  
  return(
    <Wrapper onClick= {() => props.getWoeid(props.woeid)}>
      <p>{props.local} </p>
    </Wrapper>
  )

}

export default Cidades
