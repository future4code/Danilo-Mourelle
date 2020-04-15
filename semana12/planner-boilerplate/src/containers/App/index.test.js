import React from "react";
import { shallow } from 'enzyme'
import { App, GlobalStayle } from ".";
import { Provider } from "react-redux";
import { StylesProvider, MuiThemeProvider, CssBaseline } from "@material-ui/core";
import  Planner  from "../Planner";

describe('Teste dos componentes interno App', () => {
  test('Provider', () => {
    const component = shallow(
      <App  />)

    const provider = component.find(Provider)
    expect(provider).toHaveLength(1)
  })
  test('StylesProvider', () => {
    const component = shallow(
      <App  />)

    const stylesProvider = component.find(StylesProvider)
    expect(stylesProvider).toHaveLength(1)
  })
  test('MuiThemeProvider', () => {
    const component = shallow(
      <App  />)

    const muiThemeProvider = component.find(MuiThemeProvider)
    expect(muiThemeProvider).toHaveLength(1)
  })
  test('CssBaseline', () => {
    const component = shallow(
      <App  />)

    const cssBaseline = component.find(CssBaseline)
    expect(cssBaseline).toHaveLength(1)
  })
  test('Planner', () => {
    const component = shallow(
      <App  />)

    const planner = component.find(Planner)
    expect(planner).toHaveLength(1)
  })
})