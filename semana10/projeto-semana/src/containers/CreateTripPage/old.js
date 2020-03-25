import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  gap: 10px;
  place-content: center;
  justify-items: center;
  display: grid;
`

const getMinDate = () => {
  const today = new Date()
  const stringIsoToday = today.toISOString()
  const splitDateFromTime = stringIsoToday.split("T")
  console.log(splitDateFromTime[0])
  return splitDateFromTime[0]
}

const createTripForm = [
  {
    name: 'name',
    label: 'Nome do planeta',
    type: 'text',
    required: true,
    pattern: '[a-zA-Z]{5,}',
    title: 'Nome completo com pelo menos 5 letras'
  },
  {
    name: 'planet',
    label: 'Planeta do Evento',
    required: true,
    title: 'Selecione o planeta'
  },
  {
    name: 'date',
    label: 'Data do evento',
    type: 'date',
    required: true,
    min: getMinDate(),
    title: 'Selecione a data do evento'
  },
  {
    name: 'description',
    label: 'Descrição do Evento',
    type: 'text',
    required: true,
    pattern: '\w{30,}',
    title: 'Sua descrição deve ter pelo menos 30 caracteres'
  },
  {
    name: 'durationInDays',
    label: 'Duração da viagem em dias',
    type: 'number',
    required: true,
    min: 50,
    title: 'Sua viagem deve ser de pelo menos 50 dias'
  }
]

class CreateTripPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      planet: "",
      date: "",
      description: "",
      duration: ""
    };
  }

  handleFieldChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const {
      name,
      planet,
      date,
      description,
      duration } = this.state;

    return (
      <Wrapper>
        <TextField
          onChange={this.handleFieldChange}
          name="name"
          type="text"
          label="Nome do Evento"
          value={name}
        />
        <TextField
          onChange={this.handleFieldChange}
          name="planet"
          type="text"
          label="Planeta"
          value={planet}
        />
        <TextField
          onChange={this.handleFieldChange}
          InputLabelProps={{ shrink: true }}
          name="date"
          type="date"
          label="Data do Evento"
          value={date}
        />
        <TextField
          onChange={this.handleFieldChange}
          name="duration"
          type="text"
          label="Duração do Evento em dias"
          value={duration}
        />
        <TextField
          multiline
          rows="5"
          onChange={this.handleFieldChange}
          name="description"
          type="text"
          label="Descrição do Evento"
          value={description}
        />
        <Button>Cadastrar</Button>
      </Wrapper>
    );
  }
}

export default CreateTripPage;