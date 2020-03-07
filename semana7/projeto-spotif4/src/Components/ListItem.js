import styled from 'styled-components'

const ListItem = styled.div`
  display: flex;
  width:100%;
  border-bottom: 1px solid #000;
  border-bottom-right-radius: 5px;
  justify-content: space-between;
  align-items: center;
  margin-bottom:10px;
  .fa-trash-o{
    font-size:25px;
    color:#000;
  }
  span:nth-child(2){
    width:35px;
    height:35px;
    background-color:#f05555;
    border-radius:5px;
    display:flex;
    justify-content:center;
    align-items:center;
    :hover{
      background-color:#000;
      cursor: pointer;
      .fa-trash-o{
        color:#f05555
      }
    }
  }
  span:first-child{
    :hover {
      cursor: pointer;
      font-style:italic;
    }
  }
  
`

export default ListItem