import React from "react";
import styled from 'styled-components'
import { StylesProvider } from '@material-ui/core/styles'
import { connect } from "react-redux";
import { Fab, Button, InputLabel, NativeSelect, TextField, InputAdornment, Dialog, DialogTitle, DialogActions, DialogContent } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send';
import BeenhereIcon from '@material-ui/icons/Beenhere';
import AddIcon from '@material-ui/icons/Add'

import { getTasksList, createTask } from '../../actions/tasks'

const MyFab = styled(Fab)`
  position: absolute;
  bottom:50px;
  right:50px;
  @media (max-width: 500px) {
    bottom:20px;
    right:20px;
  }
`


export class Planner extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dialogOpen: false,
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
      form: {},
      dialogOpen: false
    })
  }


  render() {
    console.log(this.state.form)
    const { tasksList } = this.props
    return (
      <div>
        <StylesProvider injectFirst>
          <Dialog onClose={() => this.setState({ dialogOpen: false })} aria-labelledby="simple-dialog-title" open={this.state.dialogOpen}>
            <DialogTitle id="simple-dialog-title">Nova Tarefa</DialogTitle>
            <form onSubmit={this.handleSubmit}>
              <DialogContent>
                <TextField
                  id="input-with-icon-textfield"
                  label="Nova Tarefa"
                  name='text'
                  value={this.state.form.text || ''}
                  onChange={this.handleInputValueChange}
                  autoFocus
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BeenhereIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
                <br />
                <br />
                <InputLabel shrink htmlFor="age-native-label-placeholder">
                  Dia da Semana
                </InputLabel>
                <NativeSelect
                  value={this.state.form.day || ''}
                  onChange={this.handleInputValueChange}
                  inputProps={{
                    name: 'day',
                    id: 'day-native-label-placeholder',
                  }}
                >
                  <option value='' hidden >Selecione</option>
                  <option value={1} >Segunda</option>
                  <option value={2} >Terça</option>
                  <option value={3} >Quarta</option>
                  <option value={4} >Quinta</option>
                  <option value={5} >Sexta</option>
                  <option value={6} >Sábado</option>
                  <option value={7} >Domingo</option>
                </NativeSelect>
              </DialogContent>
              <DialogActions>
                <Button
                  type='submit'
                  color='primary'
                  variant="contained"
                  endIcon={<SendIcon />}
                >
                  Enviar
                </Button>
              </DialogActions>
            </form>
          </Dialog>


          <MyFab size="medium" color="secondary" aria-label="add" title="Add Nova Tarefa" onClick={() => this.setState({ dialogOpen: true })}>
            <AddIcon />
          </MyFab>

          {
            tasksList && tasksList.map(task => (
              <>
                <p>task.text</p>
                <p>task.day</p>
              </>
            ))
          }
        </StylesProvider >
      </div >
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
