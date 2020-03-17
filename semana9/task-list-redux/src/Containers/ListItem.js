import React from "react";
import { connect } from "react-redux";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import { completeTask } from "../Actions";

function ItemList(props) {

  const handleChecked = id =>{
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
      onClick={()=>handleChecked(task.id)}
    >
      <Checkbox
        checked={task.completed}
        tabIndex={-1}
        disableRipple
      />
      <ListItemText primary={task.text} />
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
    handleCheckedStatus: id => dispatch(completeTask(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (ItemList);