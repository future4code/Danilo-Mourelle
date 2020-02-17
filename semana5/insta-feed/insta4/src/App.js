import React from 'react';
import styled from 'styled-components'
import PostSection from './Components/PostSection/PostSection';

const Container = styled.div`
  width:30%;
  background-color: gray;
  margin: auto;
`
function App() {
  return (
    <div className="App">
      <Container>
        <PostSection></PostSection>
      </Container>
    </div>
  );
}

export default App;
