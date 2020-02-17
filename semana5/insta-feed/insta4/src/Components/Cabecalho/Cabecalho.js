import React from 'react';
import styled from 'styled-components'

const Container = styled.div`
  width:100%;
  height:20%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: start;
`
const Thumbnail = styled.div`
  position: relative;
  width:4vw;
  height:4vw;
  margin-left: 5%;
  border: solid black 1px;
  overflow: hidden;
  border-radius:50%;
`
const ImagemAutor = styled.img`
  position: absolute;
  left: 50%;
  top: 50%;
  height: 100%;
  width: auto;
  -webkit-transform: translate(-50%,-50%);
      -ms-transform: translate(-50%,-50%);
          transform: translate(-50%,-50%);
`
const NomeAutor = styled.h3`
  margin-left: 5%;
  font-size: 25px;
`

class Cabecalho extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Container>
        <Thumbnail>
          <ImagemAutor src={require("../../Imgs/perfil.jpg")} />
        </Thumbnail>
        <NomeAutor>{this.props.nomeAutor}</NomeAutor>
      </Container>
    )
  }
}

export default Cabecalho