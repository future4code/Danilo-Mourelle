import React from 'react';
import styled from 'styled-components'

const Wrapper = styled.div`
  display:flex;
  flex-direction:column;
  width: 45%;
  border: 1px solid #000;
  background-color: #fff;
  border-radius: 5px;
  padding:10px;
  margin-bottom:20px;
  span span{
    font-weight:bold;
  }
`

function MusicDetails(props) {
  return (
    <Wrapper>
      <span><span>Nome: </span>{props.name} </span>
      <span><span>Artist: </span>{props.artist} </span>
      <span><span>Endereço: </span>{props.url} </span>
    </Wrapper>
  )
}

export default MusicDetails