import React from 'react'
import TextField from "@material-ui/core/TextField";
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  menu: {
    width: 200,
  },
});

function CSelect(props) {
  const { classes } = props;
  return (
    <TextField
      name={props.field.name}
      select
      required={props.field.required}
      label={props.field.label}
      value={props.value}
      onChange={props.change}
      margin="normal"
      variant="outlined"
      fullWidth
      SelectProps={{
        native: true,
        MenuProps: {
          className: classes.menu,
        },
      }}
      InputLabelProps={{
        shrink: true,
      }}
    >
      {props.options.map((option, index) => {
      return (
        index === 0 ?
          <option key={index} hidden value=''>{option}</option> :
          <option key={index} value={option}>{option}</option>
      )
    })}
    </TextField>
  )
}

export default withStyles(styles)(CSelect)