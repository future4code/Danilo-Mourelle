import { createMuiTheme } from "@material-ui/core";
import orange from "@material-ui/core/colors/orange";

export default createMuiTheme({
  palette: {
    primary: {
      main: orange[500],
      contrastText: '#fff'
    },
    secondary: {
      main: '#712f26'
    }
  }
});
