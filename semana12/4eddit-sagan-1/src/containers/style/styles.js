import styled from 'styled-components'

export const PageWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 16px);
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color:#EDF1F9;
`
export const LongPageWrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 16px);
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color:#EDF1F9;
  .fa-spinner{
    color:#4472C4;
    margin-top: 50%
  }
`
export const ContentWrapper = styled.div`
  width: 100%;
  max-width: 900px;
  height: 100%;
  border-right: 2px solid #4472C4;
  border-left: 2px solid #4472C4;
  background-color: white;
  display:flex;
  justify-content:center;
  align-items:center;
`
export const LongContentWrapper = styled(ContentWrapper)`
  min-height: calc(100vh - 80px); /* 80px é a soma da altura do AppBar com as margens top e bottom (64+8+8) */
  justify-content:flex-start;
  flex-direction:column;
`
export const FormStyle = styled.form`
  width: 35%;
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  align-items:center;
  @media (max-width: 904px) {
    width:80%;
  }
  @media (max-width: 500px) {
    width:90%;
  }
`
export const LongFormStyle = styled(FormStyle)`
  width: 70%;
  margin: 15px 0;
`
export const PostList = styled.div`
  width: 70%;
  height:100%;
  display:flex;
  justify-content:center;
  flex-wrap:wrap;
  @media (max-width: 904px) {
    width:80%;
  }
  @media (max-width: 500px) {
    width:90%;
  }

`
