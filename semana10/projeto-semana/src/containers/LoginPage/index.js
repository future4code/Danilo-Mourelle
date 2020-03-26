import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { routes } from "../Router"

import {logIn} from "../../Actions"

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import ButtonAppBar from '../../Components/AppBar'
import Title from '../../Components/Title'


const LoginWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items:flex-start;
`
const FormWrapper = styled.form`
  width:20%;
  text-align:center;
  margin-bottom:220px;
`

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  componentDidMount(){
    localStorage.removeItem('token')
  }

  handleFieldChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault()
    this.props.login(this.state.email, this.state.password)
  }

  render() {
    const { goToApplyScreen } = this.props
    const { email, password } = this.state;
    const btnAppBar = [
      {
        text: 'CANDIDATAR',
        click: goToApplyScreen
      },
    ]
    return (
      <LoginWrapper>
        <ButtonAppBar btns={btnAppBar} />
        <Title> Insira os dados do administrador ou aplique-se a uma viagem no botão acima </Title>
        <FormWrapper onSubmit={this.handleSubmit}>
          <TextField
            onChange={this.handleFieldChange}
            name="email"
            type="email"
            label="E-mail"
            value={email}
            variant="outlined"
            margin="normal"
            required
            fullWidth
          />
          <TextField
            onChange={this.handleFieldChange}
            name="password"
            type="password"
            label="Password"
            value={password}
            variant="outlined"
            margin="normal"
            required
            fullWidth
          />
          <Button
            color='primary'
            variant="contained"
            type='submit'>Login</Button>
        </FormWrapper>
      </LoginWrapper>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login:(email, password) => dispatch(logIn(email,password)),
    goToApplyScreen: () => dispatch(push(routes.application))
  }
}


export default connect(null, mapDispatchToProps)(LoginPage);
