import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
`
const Foto = styled.img`
width:100%;
height: auto;
`

class ImagemPost extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Container>
        <Foto src={this.props.postFoto}></Foto>
      </Container>
    )
  }
}

export default ImagemPost