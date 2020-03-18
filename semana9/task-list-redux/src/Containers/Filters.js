import React from 'react';
import styled from 'styled-components'

import { connect } from 'react-redux';
import { setVisibility } from '../Actions'

const FiltersWrapper = styled.div`
  width:100%;
  background-color: #fff;
  height:50px;
  display:flex;
  align-items:center;
  padding: 0 3%;
  justify-content:space-between;
`
const Button = styled.button`
  width: 100px;
  height:25px;
  background-color: ${props => props.selected ? '#b80713' : '#fff'} ;
  border: solid 2px #b80713;
  border-radius:5px;
  cursor: pointer;
  color: ${props => props.selected ? '#fff' : '#000'};
`

function Filters(props) {
  console.log(`filtro: ${props.filter}`)
  return (
    <FiltersWrapper>
      <Button onClick={() => props.filter('all')} selected={props.actualFilter === "all"} >Todas</Button>
      <Button onClick={() => props.filter('pending')} selected={props.actualFilter === "pending"} >Pendentes</Button>
      <Button onClick={() => props.filter('complete')} selected={props.actualFilter === "complete"} >Completas</Button>
    </FiltersWrapper>
  )
}

const mapStateToProps = state => {
  return {
    actualFilter: state.filterCriterion.filterCriterion
  }
}

const mapDispatchToProps = dispatch => {
  return {
    filter: filtro => dispatch(setVisibility(filtro))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters)