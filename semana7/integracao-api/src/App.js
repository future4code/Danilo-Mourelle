import React from 'react';
import Inputs from './Components/Inputs';
import Lista from './Components/Lista';
import Detalhes from './Components/Detalhes';



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      idBuscado:'',
      paginaAtual: 'cadastro',
    }
  }

  onPageChange = (paginaRequerida) => {
    this.setState({
      paginaAtual: paginaRequerida
    })
  }

  onValueUpdate = (input, newValue) => {
    this.setState({
      [input]: newValue
    })
  }

  onReceiveIdToSearch = (id) =>{
    this.setState({
      idBuscado:id
    })
  }

  render() {
    let paginaMostrada
    switch (this.state.paginaAtual) {
      case 'cadastro':
        paginaMostrada = <Inputs changePage={this.onPageChange} />
        break;
      case 'lista':
        paginaMostrada = <Lista changePage={this.onPageChange} getId={this.onReceiveIdToSearch}  />
        break;
      case 'detalhe':
        paginaMostrada = <Detalhes changePage={this.onPageChange} id={this.state.idBuscado} />
        break;
    }

    return (
      <div>
        {paginaMostrada}
      </div >
    );
  }
}


export default App;
