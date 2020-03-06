import React from 'react';
import styled from 'styled-components'

const ListItem = styled.div`
  display: flex;
  width:100%;
  border-bottom: 1px solid #000;
  border-bottom-right-radius: 5px;
  justify-content: space-between;
  align-items: center;
  margin-bottom:10px;
  .fa-trash-o{
    font-size:25px;
    color:#f05555;
  }
  span:nth-child(2){
    width:35px;
    height:35px;
    background-color:#000;
    border-radius:5px;
    display:flex;
    justify-content:center;
    align-items:center;
    :hover{
      background-color:#f05555;
      cursor: pointer;
      .fa-trash-o{
        color:#000
      }
    }
  }
  span:first-child{
    :hover {
      cursor: pointer;
      font-style:italic;
    }
  }
  
`

export default ListItem