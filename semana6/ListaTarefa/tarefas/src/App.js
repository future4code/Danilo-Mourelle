import React from 'react';
import styled from 'styled-components'
import Tarefas from './Components/Tarefa';


const Odin = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Header = styled.h1`
  width:100%;
  background-color:#50c878;
  margin:0;
  padding: 1%;
  text-align:center;
`
const Subcont = styled.div`
  display:flex;
  width:100%;
  justify-content:space-evenly;`

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      valorInput: "",
      valorFiltro: "nenhum",
      valorInputFiltro: "",
      listaTarefas: [],
    }
  }

  atualizaValorInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  atualizaValorFiltro = (event) => {
    this.setState({
      valorFiltro: event.target.value
    })
  }

  adicionaTarefa = () => {
    if (this.state.valorInput) {
      let cpListaTarefas = this.state.valorInput && [...this.state.listaTarefas, { id: Date.now(), texto: this.state.valorInput, completa: false }]
      this.setState({
        listaTarefas: cpListaTarefas,
        valorInput: ""
      })
    }
  }

  mudaCompleta = (id) => {
    let cpListaTarefas = this.state.listaTarefas.map((elemento, index, array) => {
      if (elemento.id === id) {
        return { id: elemento.id, texto: elemento.texto, completa: !elemento.completa }
      }
      else {
        return elemento
      }
    })
    this.setState({
      listaTarefas: cpListaTarefas
    })
  }

  deleta = (msgId) => {
    let cpListaTarefas = this.state.listaTarefas.filter((elemento, index, array) => {
      return elemento.id !== msgId
    })
    this.setState({
      listaTarefas: cpListaTarefas
    })
  }


  altera = (msgId) => {
    let cpListaTarefas = this.state.listaTarefas.map((elemento, index, array) => {
      if (elemento.id === msgId) {
        let novoTexto = window.prompt('Faça suas alterações')
        return { ...elemento, texto: novoTexto }
      }
      else {
        return elemento
      }
    })
    this.setState({
      listaTarefas: cpListaTarefas
    })
  }

  apagaTudo = () => {
    this.setState({
      listaTarefas: []
    })
  }

  ordenaTarefas = () => {
    let cpListaTarefas = this.state.listaTarefas.sort(function (a, b) {
      if (a.texto > b.texto) {
        return 1;
      }
      else if (a.texto < b.texto) {
        return -1;
      }
      else {
        return 0
      }
    })
    this.setState({
      listaTarefas: cpListaTarefas
    })
  }

  render() {

    let listaPendente = this.state.listaTarefas.filter((elemento, index, array) => {
      if (this.state.valorInputFiltro === "") {
        return !elemento.completa
      }
      else {
        return (!elemento.completa && elemento.texto === this.state.valorInputFiltro)
      }
    })

    let listaRealizada = this.state.listaTarefas.filter((elemento, index, array) => {
      if (this.state.valorInputFiltro === "") {
        return elemento.completa
      }
      else {
        return (elemento.completa && elemento.texto === this.state.valorInputFiltro)
      }
    })


    let listaTextoRealiza = listaRealizada.map((elemento, index, array) => {
      return (
        <Tarefas key={index} texto={elemento.texto} id={elemento.id} riscado={elemento.completa} completa={this.mudaCompleta} deletar={this.deleta} alterar={this.altera}></Tarefas>
      )
    })
    let listaTextoPendente = listaPendente.map((elemento, index, array) => {
      return (
        <Tarefas key={index} texto={elemento.texto} id={elemento.id} riscado={elemento.completa} completa={this.mudaCompleta} deletar={this.deleta} alterar={this.altera}></Tarefas>
      )
    })

    if (this.state.valorFiltro === "pendente") {
      listaTextoRealiza=""
    } else if (this.state.valorFiltro === "realizadas") {
      listaTextoPendente=""
    }

    return (
      <Odin>
        <Header>Lista de Tarefas</Header>
        <label>Tarefa:</label>
        <input
          name="valorInput"
          type="text"
          value={this.state.valorInput}
          onChange={this.atualizaValorInput}>
        </input>
        <button onClick={this.adicionaTarefa}>Adicionar</button>
        <label>Filtro </label>
        <select value={this.setState.valorFiltro} onChange={this.atualizaValorFiltro} >
          <option value="nenhum">Escolha...</option>
          <option value="pendente">Pendentes</option>
          <option value="realizadas">Realizadas</option>
        </select>
        <input
          name="valorInputFiltro"
          type="text"
          placeholder="FiltroValor"
          value={this.state.valorInputFiltro}
          onChange={this.atualizaValorInput}>
        </input>
        <button onClick={this.apagaTudo}>Apagar tudo</button>
        <button onClick={this.ordenaTarefas}>Ordena</button>
        <hr style={{ width: "100%" }}></hr>
        <Subcont>
          <div>
            <p>Pendente</p>
            <ul>
              {listaTextoPendente}
            </ul>
          </div>
          <div>
            <p>Realizadas</p>
            <ul>
              {listaTextoRealiza}
            </ul>
          </div>
        </Subcont>
      </Odin >
    );
  }
}

export default App;
