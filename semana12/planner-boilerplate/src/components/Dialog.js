import React from "react";
import {
  Button, InputLabel, NativeSelect, TextField, InputAdornment,
  Dialog, DialogTitle, DialogActions, DialogContent,
} from '@material-ui/core'

import SendIcon from '@material-ui/icons/Send';
import BeenhereIcon from '@material-ui/icons/Beenhere';

export function MyDialog(props) {
  const { handleDialog, dialogOpen, handleSubmit, handleInputValueChange, text, day, weekDays } = props

  return (
    <Dialog onClose={() => handleDialog(false)} aria-labelledby="add-task-dialog" open={dialogOpen}>
      <DialogTitle id="add-task-dialog">Nova Tarefa</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            id="input-with-icon-textfield"
            label="Nova Tarefa"
            name='text'
            value={text || ''}
            onChange={handleInputValueChange}
            autoFocus
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BeenhereIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
          <br /><br />
          <InputLabel shrink htmlFor="day-label">Dia da Semana</InputLabel>
          <NativeSelect
            value={day || ''}
            onChange={handleInputValueChange}
            required
            inputProps={{
              name: 'day',
              id: 'day-label',
            }}
          >
            <option value='' hidden >Selecione</option>
            {weekDays.map((day, index) => (
              <option value={day} key={index} >{day}</option>
            ))}
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
  )

}

export default MyDialog