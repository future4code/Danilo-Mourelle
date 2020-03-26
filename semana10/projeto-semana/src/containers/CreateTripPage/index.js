import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { routes } from "../Router"

import { createTrip } from '../../Actions'

import Button from "@material-ui/core/Button";
import ButtonAppBar from '../../Components/AppBar'
import Title from '../../Components/Title'
import CTextField from '../../Components/TextField'
import CSelect from '../../Components/Select'

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items:flex-start;
  form{
    width:20%;
    text-align:center
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
    pattern: '.{30,}',
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

  componentDidMount(){
    const token = localStorage.getItem('token')
    if(token === null){
      this.props.goToLoginScreen()
    }
  }

  handleFieldChange = event => {
    const { name, value } = event.target
    this.setState({
      form: {
        ...this.state.form,
        [name]: value
      }
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.sendTripForm(this.state.form)
  }

  render() {
    const {goToLoginScreen} = this.props
    return (
      <Wrapper>
        <ButtonAppBar btnText='LOGOUT' click={goToLoginScreen} />
        <Title> Preencha abaixo para cadastrar uma nova viagem</Title>
        <form onSubmit={this.handleSubmit}>
          {createTripForm.map(field => {
            if (field.type !== 'select') {
              return (
                <CTextField
                  key={field.name}
                  field={field}
                  value={this.state.form[field.name]}
                  change={this.handleFieldChange}
                />

              )
            } else {
              return (
                <CSelect
                  key={field.name}
                  field={field} v
                  alue={this.state.form[field.name]}
                  change={this.handleFieldChange}
                  options={field.options}
                />
              )
            }
          })}
          <Button
            color='primary'
            variant="contained"
            type='submit'>Cadastrar</Button>
        </form>
      </Wrapper>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  sendTripForm: (form) => dispatch(createTrip(form)),
  goToLoginScreen: () => dispatch(push(routes.root))
})
export default connect(null, mapDispatchToProps)(CreateTripPage)