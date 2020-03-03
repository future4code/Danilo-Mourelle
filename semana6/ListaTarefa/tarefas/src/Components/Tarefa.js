import React from 'react';
import styled from 'styled-components'

const Container = styled.div`
  display:flex;
  width:200px;
  justify-content:space-around;
  `

const Item = styled.li`
text-decoration: ${props => props.riscado ? "line-through" : "inherit"};
`


function Tarefas (props) {
  let funcaoDeleta = () =>{
    props.deletar(props.id)
  }

  let funcaoAltera = () =>{
    props.alterar(props.id)
  }

  let mudaCompleta =()=>{
    props.completa(props.id)
  }

  return(
    <Container>
      <Item riscado={props.riscado} onClick={mudaCompleta}>{props.texto}</Item>
      <button onClick={funcaoDeleta}>Deletar</button>
      <button onClick={funcaoAltera}>Alterar</button>
      
    </Container>
  )
}

export default Tarefas