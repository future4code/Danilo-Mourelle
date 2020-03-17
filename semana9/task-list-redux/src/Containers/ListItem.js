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
  return (
    props.taksList.map(task => (
    <ListItem
      key={task.id}
      role={undefined}
      dense
      button
      onClick={()=>handleChecked(task.id)}
    >
      <Checkbox
        checked={task.complete}
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
    taksList: state.taksList.taksList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleCheckedStatus: id => dispatch(completeTask(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (ItemList);