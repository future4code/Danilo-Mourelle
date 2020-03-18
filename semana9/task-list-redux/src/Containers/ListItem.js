import React from "react";
import styled from 'styled-components'

import { connect } from "react-redux";
import { completeTask } from "../Actions";
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

function ItemList(props) {

  const handleChecked = id => {
    props.handleCheckedStatus(id)
  }

  console.log(props.taskList)


  let newList = props.taskList.filter(task => {
    switch (props.filter) {
      case 'all':
        return true
      case 'pending':
        return !task.completed
      case 'complete':
        return task.completed
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
        onClick={() => handleChecked(task.id)}
      >
        <Checkbox
          checked={task.completed}
          tabIndex={-1}
          disableRipple
        />
        <NewListText done={task.completed} primary={task.text} />
        <ListItemSecondaryAction onClick={() => props.deleteTask(task.id)}>
          <IconButton aria-label="Delete">
            <TrashIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ))
  )
}

const mapStateToProps = state => {
  return {
    taskList: state.allTasks.taskList,
    filter: state.filterCriterion.filterCriterion
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleCheckedStatus: id => dispatch(completeTask(id)),
    deleteTask: id => dispatch(deleteTask(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);