import React from 'react';
import './smallCard.css';

function SmallCard(props) {
  return (
    <div className="smallcard-container">
      <img className="imagemSmC" src={props.endereco} />
      <label className="labelSmC">{props.label}</label>
      <p className="textoSmC">{props.texto}</p>
    </div>
  )
}

export default SmallCard
