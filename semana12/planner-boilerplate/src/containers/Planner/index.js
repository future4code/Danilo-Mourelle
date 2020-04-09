import React from "react";
import { connect } from "react-redux";

import { getTasksList, createTask } from '../../actions/tasks'

export class Planner extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      form: {
      }
    }
  }

  componentDidMount() {
    //this.props.getTasksList()
  }

  componentDidUpdate() {
    //this.props.getTasksList()
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
    //this.props.createTask(this.state.form)
    this.setState({
      form: {}
    })
  }

  render() {
    console.log(this.state.form)
    const { tasksList } = this.props
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input name='text' placeholder='Nova Tarefa' value={this.state.form.text || ''} onChange={this.handleInputValueChange}></input>
          <select name='day' value={this.state.form.day || ''} onChange={this.handleInputValueChange}>
            <option value='' hidden >Selecione</option>
            <option value={1} >Segunda</option>
            <option value={2} >Terça</option>
            <option value={3} >Quarta</option>
            <option value={4} >Quinta</option>
            <option value={5} >Sexta</option>
            <option value={6} >Sábado</option>
            <option value={7} >Domingo</option>
          </select>
          <button type='submit'>Enviar</button>
        </form>
        {tasksList && tasksList.map(task => (
          <>
            <p>task.text</p>
            <p>task.day</p>
          </>
        ))}
      </div>
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
