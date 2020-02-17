import React from 'react';
import styled from 'styled-components'
import Cabecalho from '../Cabecalho/Cabecalho';
import ImagemPost from '../ImagemPost/ImagemPost';
import Interacao from '../Interacao/Interacao';


const Container = styled.div`
  border: solid 1px black;
  margin: 2% 0;
  height: auto;
`

class PostSection extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <Container>
        <Cabecalho nomeAutor="Danilo Mourelle"></Cabecalho>
        <ImagemPost postFoto="https://picsum.photos/200/200"></ImagemPost>
        <Interacao></Interacao>
      </Container>
    )
  }
}

export default PostSection