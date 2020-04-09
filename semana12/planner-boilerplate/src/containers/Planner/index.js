import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { getTasksList, createTask } from '../../actions/tasks'

export function Planner(props) {
  const [state, setState] = useState({})

  return <div />;

}

const mapStateToProps = (state) => ({
  tasksList: state.tasks.tasksList
})

const masDispatchToProps = (dispatch) => ({
  getTasksList: () => dispatch(getTasksList()),
  createTask: (form) => dispatch(createTask(form))
})

export default connect(mapStateToProps,masDispatchToProps)(Planner);
