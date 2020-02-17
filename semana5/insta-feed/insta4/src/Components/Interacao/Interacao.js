import React from 'react'
import styled from 'styled-components'



const Container = styled.div`
  display: flex;
  height: 20%;
  justify-content: space-between;
  flex-wrap: wrap;
`
const SubContainer = styled.div`
  display: flex;
  margin-right: 5px;
`
const CoracaoCurtida = styled.img`
 margin: 0 5px;
`
const BtnComentario = styled.img`
  margin: 0 5px;
`
const Comentarios = styled.div`
  width:100%;
  display: flex;
  justify-content:center;
`
const Input = styled.input`
  width:70%;
`
const Btn = styled.button`
`

let sessaocomentario


class Interacao extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      curtido: false,
      iconeCurtido: require("../../Imgs/favorite-white.svg"),
      qtdCurtida: 0,
      mostrandoComentario: false,
      qtdComentario: 0
    }
  }

  clickCurtida = () => {
    //*******DETALHE 1****************************** */
   /*  this.setState({
      curtido: !this.state.curtido
    }) **********************************************/
    //**********DETALHE 2***************************
    let novoIconeCurtido, novaQtdCurtidas
    if(this.state.curtido){
      novoIconeCurtido = require("../../Imgs/favorite-white.svg")
      novaQtdCurtidas = 0
    } else{
      novoIconeCurtido = require("../../Imgs/favorite.svg")
      novaQtdCurtidas = 1
    }
    this.setState({ 
      curtido: !this.state.curtido,
      iconeCurtido: novoIconeCurtido,
      qtdCurtida: novaQtdCurtidas
    })
    //*****************DETALHE 2 ************************* */
    /* if (this.state.curtido === false) {
      this.setState({
        curtido: true,
        iconeCurtido: require("../../Imgs/favorite.svg"),
        qtdCurtida: 1
      })
    } else {
      this.setState({
        curtido: false,
        iconeCurtido: require("../../Imgs/favorite-white.svg"),
        qtdCurtida: 0
      })
    } */

  }

  clickComents = () => {
    if (this.state.mostrandoComentario === false) {
      sessaocomentario = <Comentarios>
        <Input type="text"></Input>
        <Btn onClick={this.publicaComentario}>Comentar</Btn>
      </Comentarios>
      this.setState({
        mostraComentario: true
      })
    }
    //****************DETALHE 3********************* */
     /* sessaocomentario = <Comentarios>
      <Input type="text" placeholder="Comentar..."></Input>
      <Btn onClick={this.publicaComentario}>Comentar</Btn>
    </Comentarios> */
    //*********************************************** */

  }

  publicaComentario = () => {
    this.setState({
      qtdComentario: this.state.qtdComentario + 1
    })
    sessaocomentario = ''
  }

  render() {
    //*************DETALHE 1*****************************************
   /*  let iconeCurtido, qtdCurtida  

    if(this.state.curtido){
      iconeCurtido = require("../../Imgs/favorite.svg") 
      qtdCurtida = 1
    }
    else{
      iconeCurtido=require("../../Imgs/favorite-white.svg")
      qtdCurtida = 0
    } */
    //*************************************************************** */
    return (
      <Container>
        <SubContainer>
          {/* <CoracaoCurtida src={iconeCurtido} onClick={this.clickCurtida}></CoracaoCurtida><p>{qtdCurtida} </p> {/* ****************DETALHE 1************** */}
          <CoracaoCurtida src={this.state.iconeCurtido} onClick={this.clickCurtida}></CoracaoCurtida><p>{this.state.qtdCurtida} </p>
        </SubContainer>
        <SubContainer>
          <BtnComentario src={require("../../Imgs/comment_icon.svg")} onClick={this.clickComents}></BtnComentario><p>{this.state.qtdComentario}</p>
        </SubContainer>
        {sessaocomentario}
      </Container >
    )

  }
}

export default Interacao

//DETALHE 1 => forma de fazer com decisões dentro do render(){}
//DETALHE 2 => forma de fazer a logica com variáveis e apenas no final fazer um unico setState utilizando as variáveis para passar o novo valor
//DETALHE 3 => Não pode ser dessa forma, pois se não tem o this.setState, não há nova renderização.

/* Podemos fazer a logica condicional toda entre o render e o return. O ponto está em ter um state que se modifique (nem que seja uma flag booleana), para fazermos o setState e assim
 termos a renderização do JSX */
