import React from 'react';
import './pageSection.css';

function PageSection(props){
  return (
    <div className="section-container">
        <h2>{props.titulo}</h2>
        {props.children}
    </div>
  )
}

export default PageSection