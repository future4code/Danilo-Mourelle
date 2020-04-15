import React from "react";
import { shallow } from 'enzyme'
import { Planner } from './index'
import { Header, Title, MyFab } from './index'
import MyExpansionPanel from "../../components/ExpansionPanel";
import MyDialog from "../../components/Dialog";

const mockTasksList = [{
  "id": "9PbzRyU20bZguuFhnILq",
  "day": "Segunda-feira",
  "text": "Passar a Roupa"
},
{
  "id": "l5ZNZnfYBrcJth0kOsow",
  "day": "Terça-feira",
  "text": "Lavar a louça"
},
{
  "id": "iiyvoiuyvOUIYVOuyvouiVY",
  "day": "Quarta-feira",
  "text": "Lavar o carro"
},
{
  "id": "jobgupgbq-pufwljfbwpb",
  "day": "Quinta-feira",
  "text": "Fazer a cama"
}
]

const mockWeekDay = ['Segunda-feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado', 'Domingo']


describe('Teste dos componentes interno Planner', () => {
  test('Header', () => {
    const mockGetList = jest.fn()
    const component = shallow(<Planner getTasksList={mockGetList} />)

    const header = component.find(Header)
    expect(header).toHaveLength(1)
  })
  test('Title', () => {
    const mockGetList = jest.fn()
    const component = shallow(<Planner getTasksList={mockGetList} />)

    const title = component.find(Title)
    expect(title).toHaveLength(1)
  })
  test('ExpasionPanel', () => {
    const mockGetList = jest.fn()
    const component = shallow(<Planner tasksList={mockTasksList} getTasksList={mockGetList} />)

    const expasionPanel = component.find(MyExpansionPanel)
    expect(expasionPanel).toHaveLength(1)
    expect(expasionPanel.props().weekDays).toEqual(mockWeekDay)
    expect(expasionPanel.props().tasksList).toEqual(mockTasksList)
  })
  test('Dialog', () => {
    const mockGetList = jest.fn()
    const component = shallow(<Planner getTasksList={mockGetList} />)

    const dialog = component.find(MyDialog)
    expect(dialog).toHaveLength(1)
    expect(dialog.props().day).toEqual(component.state().form.day)
    expect(dialog.props().text).toEqual(component.state().form.text)
    expect(dialog.props().dialogOpen).toEqual(component.state().dialogOpen)
    expect(dialog.props().weekDays).toEqual(mockWeekDay)
  })
  test('Fab', () => {
    const mockGetList = jest.fn()
    /* setState = jest.fn() */
    const component = shallow(<Planner getTasksList={mockGetList} />)
    /* const spy = jest.spyOn(component.instance().handleDialog()) */ 
    const fab = component.find(MyFab)
    expect(fab).toHaveLength(1)
    /* fab.simulate('click')
    expect(setState).toHaveBeenCalled() */
  })
})

describe('Teste dos métodos', () => {
  test('componentDidMount', () => {
    const mockGetList = jest.fn()
    const component = shallow(
      <Planner tasksList={mockTasksList} getTasksList={mockGetList} />)

    expect(mockGetList).toHaveBeenCalledTimes(1)
  })
})