import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import List from "@material-ui/core/List";
import ItemList from './Containers/ListItem'


/* const styles = theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
}); */

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

function App(props) {

  return (
    <div>
      <Header>
        <Title>4Task</Title>
      </Header>
      <Main>
        <Input placeholder="O que tem que ser feito?" />
        <List>
          <ItemList />
        </List>
      </Main>
    </div>
  );
}


export default App;