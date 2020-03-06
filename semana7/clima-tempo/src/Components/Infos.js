import React from 'react';
import styled from 'styled-components'

const Wrapper = styled.div`
  display:flex;
  justify-content:space-between;
  border-bottom:solid 1px ${props => props.color};
  width:40%;
  padding:15px;
  font-size:1.1em;
  box-sizing:border-box;
  font-size:x-large;
`
const Titulo = styled.p`
  font-weight:bold;
`

function Infos(props) {

  return (
    <Wrapper>
      <Titulo>{props.titulo}</Titulo>
      <p> {props.valor}</p>
    </Wrapper>
  )

}

export default Infos