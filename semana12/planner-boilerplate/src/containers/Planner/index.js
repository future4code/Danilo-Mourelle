import React from "react";
import styled from 'styled-components'
import { connect } from "react-redux";
import { Fab } from '@material-ui/core'

import AddIcon from '@material-ui/icons/Add'

import { getTasksList, createTask } from '../../actions/tasks'
import MyExpansionPanel from "../../components/ExpansionPanel";
import MyDialog from '../../components/Dialog'

const PageWrapper = styled.div`
  width:100%;
  min-height: 100vh;
  header{
    background-color: #712f26;
    height:30px;
    width:100%;
  }
`
const Title = styled.h1`
  background-color: none;
  color:#712f26;
  font-family: 'Sofia', cursive;
  font-size: 60px;
  width:100%;
  height:7vh;
  margin: 3% 0;
  display:flex;
  justify-content:center;
  align-items:center;
`
const MyFab = styled(Fab)`
  position: absolute;
  bottom:50px;
  right:50px;
  @media (max-width: 500px) {
    bottom:20px;
    right:20px;
  }
`
const weekDays = ['Segunda-feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado', 'Domingo']

export class Planner extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dialogOpen: false,
      form: {}
    }
  }

  componentDidMount() {
    this.props.getTasksList()
  }

  handleDialog = (status) => {
    this.setState({
      dialogOpen: status
    })
  }

  handleInputValueChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.createTask(this.state.form)
    this.setState({
      form: {},
      dialogOpen: false
    })
  }


  render() {
    const { tasksList } = this.props
    const { dialogOpen, form } = this.state
    console.log(form)
    return (
      <PageWrapper>
        <MyDialog
          handleDialog={this.handleDialog}
          dialogOpen={dialogOpen}
          handleSubmit={this.handleSubmit}
          handleInputValueChange={this.handleInputValueChange}
          text={form.text}
          day={form.day}
          weekDays={weekDays}
        />
        <MyFab size="medium" color="secondary" aria-label="add" title="Add Nova Tarefa" onClick={() => this.setState({ dialogOpen: true })}>
          <AddIcon />
        </MyFab>
        <header></header>
        <Title>Planner Semanal</Title>
        <MyExpansionPanel
          weekDays={weekDays}
          tasksList={tasksList}
        />
      </PageWrapper >
    );
  }
}

const mapStateToProps = (state) => ({
  tasksList: state.tasks.tasksList
})

const masDispatchToProps = (dispatch) => ({
  getTasksList: () => dispatch(getTasksList()),
  createTask: (form) => dispatch(createTask(form))
})

export default connect(mapStateToProps, masDispatchToProps)(Planner);
