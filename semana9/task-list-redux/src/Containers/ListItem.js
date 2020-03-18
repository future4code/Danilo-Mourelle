import React from "react";
import styled from 'styled-components'

import { connect } from "react-redux";
import { toogleTaskDone, fetchTasksList } from "../Actions";
import { deleteTask } from "../Actions"

import { ListItem, ListItemText, Checkbox, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded'



const TrashIcon = styled(DeleteForeverRoundedIcon)`
  color: #b80713;
`
const NewListText = styled(ListItemText)`
  color: ${props => props.done ? '#555' : '#000'};
  font-style: ${props => props.done ? 'italic' : 'normal'};
  text-decoration:${props => props.done ? 'line-through' : 'none'};
  font-size:60px;
`

class ItemList extends React.Component {
  constructor(props) {
    super(props)
  }

  handleChecked = id => {
    this.props.handleCheckedStatus(id)
  }

  componentDidMount() {
    this.props.fetchTasksList()
  }

  render() {

    let newList = this.props.taskList.filter(task => {
      switch (this.props.filter) {
        case 'all':
          return true
        case 'pending':
          return !task.done
        case 'complete':
          return task.done
        default:
          return true
      }
    })

    return (

      newList.map(task => (
        <ListItem
          key={task.id}
          role={undefined}
          dense
          button
          onClick={() => this.handleChecked(task.id)}
        >
          <Checkbox
            checked={task.done}
            tabIndex={-1}
            disableRipple
          />
          <NewListText done={task.done} primary={task.text} />
          <ListItemSecondaryAction onClick={() => this.props.deleteTask(task.id)}>
            <IconButton aria-label="Delete">
              <TrashIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))
    )
  }
}

const mapStateToProps = state => {
  return {
    taskList: state.allTasks.taskList,
    filter: state.filterCriterion.filterCriterion
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleCheckedStatus: id => dispatch(toogleTaskDone(id)),
    deleteTask: id => dispatch(deleteTask(id)),
    fetchTasksList: () => dispatch(fetchTasksList())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);