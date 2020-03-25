import React from 'react'
import TextField from "@material-ui/core/TextField";

function CTextField(props) {
  return (
    <TextField
      name={props.field.name}
      type={props.field.type}
      required={props.field.required}
      label={props.field.label}
      value={props.value}
      onChange={props.change}
      margin="normal"
      variant="outlined"
      fullWidth
      inputProps={{
        pattern: props.field.pattern,
        title: props.field.title,
        min: props.field.min
      }}
    />
  )
}

export default CTextField