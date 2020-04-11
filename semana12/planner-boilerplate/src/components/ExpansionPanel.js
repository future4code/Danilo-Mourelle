import React from 'react'
import styled from 'styled-components'
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography, Divider } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const ListWrapper = styled.div`
  width:70%;
  margin: 0 auto;
`
const MyExpansionPanelSummary = styled(ExpansionPanelSummary)`
  background-color:#ffb240;
`
const MyExpansionPanelDetails = styled(ExpansionPanelDetails)`
  background-color: #fffdb9;
  padding:16px;
`

export function MyExpansionPanel(props) {
  const { weekDays, tasksList } = props
  return (
    <ListWrapper>
      {
        weekDays.map((dia, index) => (
          < ExpansionPanel key={index} >
            <MyExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography >{dia}</Typography>
            </MyExpansionPanelSummary>
            {tasksList && tasksList
            .filter(task => (
              task.day === dia
            ))
              .map(task => (
                <span key={task.id}>
                  <MyExpansionPanelDetails >
                    <Typography>{task.text}</Typography>
                  </MyExpansionPanelDetails>
                  <Divider />
                </span>
              ))}
          </ExpansionPanel>
        ))
      }
    </ListWrapper>
  )
}

export default MyExpansionPanel