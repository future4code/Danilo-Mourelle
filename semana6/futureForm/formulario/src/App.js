import React from 'react';
import styled from 'styled-components';
import Form1 from './Components/Form1';
import Form2 from './Components/Form2';
import Form3 from './Components/Form3';
import Agradecimento from './Components/Agradecimento';


const Container = styled.div`
  display: flex;
  flex-direction:column;
  align-items: center;
  `

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      formulario: 1,
      escolaridade:'medioIncompleto'
    }
  }

  selecionaEscolaridade = (event) =>{
    this.setState ({
      escolaridade:event.target.value
    })
  }

  onClickEnviar = () => {
/*     switch (this.state.formulario) {
      case 1:
        this.setState({
          formulario: 2
        })
        break;

      case 2:
        this.setState({
          formulario: 3
        })
        break;
      case 3:
        this.setState({
          formulario: "agradecimento"
        })
        break;
    } */

    switch (this.state.escolaridade) {
      case 'superiorIncompleto':
        this.setState({
          formulario: 2
        })
        break;

      case 'superiorCompleto':
        this.setState({
          formulario: 2
        })
        break;
      case 'medioCompleto':
        this.setState({
          formulario: 3
        })
        break; 
      case 'medioIncompleto':
        this.setState({
          formulario: 3
        })
        break; 
    }
  }

  render() {
    console.log(this.state.escolaridade)
    return (
      <Container>
        {this.state.formulario === 1 ? <Form1 selecao={this.selecionaEscolaridade} /> : this.state.formulario === 2 ? <Form2 /> : this.state.formulario === 3 ? <Form3 /> : <Agradecimento />}
        {this.state.formulario !== "agradecimento" && <button onClick={this.onClickEnviar}> Enviar </button>}
      </Container>
    );
  }
}

export default App;
