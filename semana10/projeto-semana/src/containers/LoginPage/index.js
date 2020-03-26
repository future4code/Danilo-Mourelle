import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { routes } from "../Router"

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import ButtonAppBar from '../../Components/AppBar'


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
`

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleFieldChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { goToApplyScreen } = this.props
    const { email, password } = this.state;

    return (
      <LoginWrapper>
        <ButtonAppBar btnText='Candidatar' click={goToApplyScreen} />
        <FormWrapper>
          <TextField
            onChange={this.handleFieldChange}
            name="email"
            type="email"
            label="E-mail"
            value={email}
            variant="outlined"
            margin="normal"
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
    goToApplyScreen: () => dispatch(push(routes.application))
  }
}


export default connect(null, mapDispatchToProps)(LoginPage);
