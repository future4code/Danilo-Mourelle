import React from 'react'
import TextField from "@material-ui/core/TextField";
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  menu: {
    width: 200,
  },
});

function TripSelect(props) {
  const { classes } = props;
  return (
    <TextField
    name='trip'
    select
    required
    label='Selecione uma viagem:'
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
      {props.tripList.length > 0 ?
        <option hidden value=''>Selecione sua Trip</option> :
        <option value=''>Carregando Viagens</option>
      }
      {props.tripList.length > 0 &&
        props.tripList.map((trip, index) => {
          return (
            <option key={trip.id} value={trip.id}>
              {`${trip.name} - ${trip.planet}`}
            </option>
          )
        })
      }
    </TextField>
  )
}

export default withStyles(styles)(TripSelect)