import React from 'react';
import './bigCard.css';

function BigCard(props) {
  return (
    <div className="bigcard-container">
      <img className="imagemBgC" src={props.endereco} />
      <h3 className="tituloBgC">{props.titulo}</h3>
      <p className="textoBgC">{props.texto}</p>
    </div>
  )
}

export default BigCard