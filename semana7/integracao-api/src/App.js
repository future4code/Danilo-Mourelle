import React from 'react';
import Inputs from './Components/Inputs';
import Lista from './Components/Lista';



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      paginaAtual: 'cadastro',
    }
  }

  onPageChange = () => {
    let actualPage = this.state.paginaAtual

    if (actualPage === 'cadastro') {
      this.setState({
        paginaAtual: 'lista'
      })
    }
    else {
      this.setState({
        paginaAtual: 'cadastro'
      })
    }
  }

  onValueUpdate = (input, newValue) => {
    this.setState({
      [input]: newValue
    })
  }

  

  render() {

    return (
      <div>
        {this.state.paginaAtual==='cadastro' ?
        <Inputs
          changePage={this.onPageChange} />
        :
        <Lista
          changePage={this.onPageChange}
        />}
      </div>
    );
  }
}


export default App;
