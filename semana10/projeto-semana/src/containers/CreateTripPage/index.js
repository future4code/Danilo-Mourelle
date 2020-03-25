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
const InputField = styled.input`
  width: 40%;
  border-radius:3px;
  /* Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
  }
  /* Firefox */
  &[type=number] {
    -moz-appearance: textfield;
  }
`

const getMinDate = () => {
  const today = new Date()
  const stringIsoToday = today.toISOString()
  const splitDateFromTime = stringIsoToday.split("T")
  return splitDateFromTime[0]
}

const createTripForm = [
  {
    name: 'name',
    label: 'Nome do Evento',
    type: 'text',
    required: true,
    pattern: '.{5,}',
    title: 'Nome com pelo menos 5 letras'
  },
  {
    name: 'planet',
    label: 'Planeta do Evento',
    type: 'select',
    options: ['Selecione', 'Mercúrio', 'Venus', 'Terra', 'Marte', 'Jupiter', 'Saturno', 'Urano', 'Netuno'],
    required: true,
    title: 'Selecione o planeta'
  },
  {
    name: 'date',
    label: 'Data do evento',
    type: 'date',
    min: getMinDate(),
    required: true,
    title: 'Selecione a data do evento'
  },
  {
    name: 'description',
    label: 'Descrição do Evento',
    type: 'text',
    minlength: '.{30,}',
    required: true,
    title: 'Sua descrição deve ter pelo menos 30 caracteres'
  },
  {
    name: 'durationInDays',
    label: 'Duração da viagem em dias',
    type: 'number',
    min: 50,
    required: true,
    title: 'Sua viagem deve ser de pelo menos 50 dias'
  }
]

class CreateTripPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {}
    };
  }

  handleFieldChange = event => {
    const { name, value } = event.target
    this.setState({
      form: {
        ...this.state.form,
        [name]: value
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault()
    console.log(this.state.form)
  }

  render() {

    return (
      <Wrapper>
        <form onSubmit={this.handleSubmit}>
          {createTripForm.map(field => {
            if (field.type !== 'select') {
              return (
                <div key={field.name}>
                  <label htmlFor={field.name}>{field.label}: </label>
                  <InputField
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    onChange={this.handleFieldChange}
                    pattern={field.pattern}
                    min={field.min}
                    minlength={field.minlength}
                    required={field.required}
                    title={field.title}
                    value={this.state.form[field.name]}
                  />
                </div>
              )
            } else {
              return (
                <div key={field.name}>
                  <label htmlFor={field.name}>{field.label}: </label>
                  <select
                    id={field.name}
                    name={field.name}
                    onChange={this.handleFieldChange}
                    required={field.required}
                    title= 'Selecione o planeta'
                    value={this.state.form[field.name]}
                    pattern={field.pattern}
                  >
                    {field.options.map((option, index) => {
                      return (
                        index === 0 ?
                        <option key={index} hidden value=''>{option}</option> :
                        <option key={index} value={option}>{option}</option>
                      )
                    })}
                  </select>
                </div>
              )
            }
          })}
          <Button type='submit'>Cadastrar</Button>
        </form>
      </Wrapper>
    );
  }
}

export default CreateTripPage;