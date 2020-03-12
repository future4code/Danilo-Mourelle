import React from 'react';
import styled from 'styled-components'
import Cidades from './Cidades';
import Infos from './Infos';


const Wrapper = styled.div`
  width:85%;
  min-height:calc(100vh - 12vh - 16px);
  display:flex;
  flex-direction:column;
  align-items:flex-start;
`
const Panel = styled.div`
  background-color: ${props => props.bgcolor || 'inherit'};
  color: ${props => props.color};
  margin: 20px;
  width:calc(100% - 40px);
  height: 800px;
  padding-top:5%;
  padding-left:10%;
`


function CorpoCentral(props) {

  const defineDayOrNight = () => {
    const charDecimalHour = props.cityData.time.charCodeAt(11)
    const charUnitHour = props.cityData.time.charCodeAt(12)
    if ((charDecimalHour === 48 && charUnitHour < 54) || (charDecimalHour === 49 && charUnitHour > 56) || (charDecimalHour === 50)) {
      return '#191970'
    }
    else {
      return '#87ceeb'
    }
  }

  let dayTime = defineDayOrNight()
  let fontColor = (dayTime === '#87ceeb' ? '#000' : '#fff')
  let sunRise = props.cityData.sun_rise.substring(11,19)
  let sunSet = props.cityData.sun_set.substring(11,19)

  return (
    <Wrapper>
      <Panel 
        bgcolor={dayTime}
        color={fontColor} 
      >
        <Infos titulo='Cidade:' valor={props.cityData.title} color={fontColor} />
        <Infos titulo='País:' valor={props.cityData.parent.title} color={fontColor} />
        <Infos titulo='Fuso Horário:' valor={props.cityData.timezone_name} color={fontColor} />
        <Infos titulo='Nascer do Sol:' valor={sunRise} color={fontColor} />
        <Infos titulo='Por do Sol:' valor={sunSet} color={fontColor} />
      </Panel>
    </Wrapper >

  )
}

export default CorpoCentral