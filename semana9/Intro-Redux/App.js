//Não criei o react app, então é só o template criado no CodeSandbox

import React from "react";

import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";

const GlobalStyle = createGlobalStyle`
  body{
    margin:auto;
    width:700px;
    min-height:100vh;
    background-color: #f5f5f5;
    font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
    
  }
  *{
    box-sizing: border-box;
  }
`;
const styles = theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
});

const Header = styled.header`
  width: 100%;
  height: 12vh;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
`;
const Title = styled.h1`
  font-size: 80px;
  color: #b83f45;
  text-align: center;
  width: 100%;
  font-weight: 200;
  margin-top: 20px;
`;
const Main = styled.div`
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
`;
const Input = styled.input`
  width: 100%;
  border: none;
  background-color: #ffffff;
  line-height: 1.4em;
  font-size: 24px;
  padding: 16px 16px 16px 60px;
  box-shadow: inset 0 -2px 2px rgba(0, 0, 0, 0.03);
  &::placeholder {
    font-style: italic;
    font-weight: 300;
    color: rgba(0, 0, 0, 0.4);
  }
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        {
          task: "Use Redux",
          statusDone: false,
          id: 1
        }
      ]
    };
  }

  handleToggle = taskRecebida => {
    const { tasks } = this.state;
    let copyTasks = [...tasks];
    copyTasks.forEach(task => {
      if (task.id === taskRecebida.id) {
        task.statusDone = !taskRecebida.statusDone;
      } else {
        return task;
      }
    });

    this.setState({
      tasks: copyTasks
    });
  };

  render() {
    console.log(this.state.tasks);
    const { classes } = this.props;
    return (
      <div className="App">
        <GlobalStyle />
        <Header>
          <Title>4Task</Title>
        </Header>
        <Main>
          <Input placeholder="O que tem que ser feito?" />
          <List className={classes.root}>
            {this.state.tasks.map((element, index) => (
              <ListItem
                key={index}
                role={undefined}
                dense
                button
                onClick={() => this.handleToggle(element)}
              >
                <Checkbox
                  checked={element.statusDone}
                  tabIndex={-1}
                  disableRipple
                />
                <ListItemText primary={element.task} />
              </ListItem>
            ))}
          </List>
        </Main>
      </div>
    );
  }
}

export default withStyles(styles)(App);
