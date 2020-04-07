import React, { Component } from "react";
import styled from "styled-components";
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import { login } from "../../actions";

import { routes } from '../Router'
import ButtonAppBar from "../../components/AppBar";
import ButtonStyle from '../../components/button'
import MyTextField from '../../components/input'

import {PageWrapper, ContentWrapper, FormStyle} from '../style/styles'


class LoginPage extends Component {
    constructor(props){
      super(props)
      this.state = {
        form: {
          password: '',
          email: '',
        }
    }
 }

 componentDidMount(){
   localStorage.removeItem('token')
 }

 handleInputValue = (e) => {
  this.setState({
    form: {
      ...this.state.form,
      [e.target.name]: e.target.value
    }
  })
}
 
 handleSubmit= (e) => {
    e.preventDefault()
    this.props.login(this.state.form)
    this.setState({
      form: {
        password: '',
        email: '',
      }
    })
  }
 
  render() {
    return (
      <PageWrapper>
        <ButtonAppBar pageName='LOGIN' btnText='CADASTAR' onClick={this.props.goToRegisterPage} />
        <ContentWrapper>
        <FormStyle onSubmit={this.handleSubmit}>
          <MyTextField
            name="email"
            type="email"
            label="Email"
            required={true}
            onChange={this.handleInputValue}
            value={this.state.form.email} />
          <MyTextField
            name="password"
            type="password"
            label="senha"
            required={true}
            onChange={this.handleInputValue}
            value={this.state.form.password}
          />
          <ButtonStyle type="submit" btnText="Entrar"/>
        </FormStyle>
        </ContentWrapper>
      </PageWrapper>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    goToRegisterPage: () => dispatch(push(routes.register)), 
    login: (form) => dispatch(login(form))
  }
}

export default connect(null, mapDispatchToProps)(LoginPage);
