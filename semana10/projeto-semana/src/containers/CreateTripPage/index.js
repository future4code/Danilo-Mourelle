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