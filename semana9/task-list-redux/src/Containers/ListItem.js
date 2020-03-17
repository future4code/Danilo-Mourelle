import React from "react";
import styled from 'styled-components'

import { connect } from "react-redux";
import { completeTask } from "../Actions";
import { deleteTask } from "../Actions"

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded'


const TrashIcon = styled(DeleteForeverRoundedIcon)`
  color: #b80713;
`

function ItemList(props) {

  const handleChecked = id => {
    props.handleCheckedStatus(id)
  }
  console.log(props.taskList)

  return (
    props.taskList.map(task => (
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
        <ListItemText primary={task.text} />
        <ListItemSecondaryAction>
          <IconButton aria-label="Delete">
            <TrashIcon onClick={() => props.deleteTask(task.id)} />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ))
  )
}

const mapStateToProps = state => {
  return {
    taskList: state.allTasks.taskList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleCheckedStatus: id => dispatch(completeTask(id)),
    deleteTask: id => dispatch(deleteTask(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);