import React from 'react';
import styled from 'styled-components'

import { connect } from 'react-redux';
import { setVisibility, toogleTaskDone, deleteTasksDone } from '../Actions'

const FiltersWrapper = styled.div`
  width:100%;
  background-color: #fff;
  height:80px;
  display:flex;
  align-items:center;
  padding: 0 3%;
  justify-content:space-between;
`
const Button = styled.button`
  width: 100px;
  height:50px;
  background-color: ${props => props.selected ? '#b80713' : '#fff'} ;
  border: solid 2px #b80713;
  border-radius:5px;
  cursor: pointer;
  color: ${props => props.selected ? '#fff' : '#000'};
`

function Filters(props) {
  const completeAllTasks = () => {
    let tasksIncomplete = props.taskList.filter(task => {
      return !task.done
    })
    tasksIncomplete.forEach(task => {
      props.handleCheckedStatus(task.id)
    });
  }
  return (
    <FiltersWrapper>
      <Button onClick={completeAllTasks} >Marcar todas completas</Button>
      <Button onClick={() => props.filter('all')} selected={props.actualFilter === "all"} >Todas</Button>
      <Button onClick={() => props.filter('pending')} selected={props.actualFilter === "pending"} >Pendentes</Button>
      <Button onClick={() => props.filter('complete')} selected={props.actualFilter === "complete"} >Completas</Button>
      <Button onClick={props.removeCompleted} >Remover Completas</Button>
    </FiltersWrapper>
  )
}

const mapStateToProps = state => {
  return {
    taskList: state.allTasks.taskList,
    actualFilter: state.filterCriterion.filterCriterion
  }
}

const mapDispatchToProps = dispatch => {
  return {
    filter: filtro => dispatch(setVisibility(filtro)),
    removeCompleted: () => dispatch(deleteTasksDone()),
    handleCheckedStatus: id => dispatch(toogleTaskDone(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters)