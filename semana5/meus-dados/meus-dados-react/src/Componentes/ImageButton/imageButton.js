import React from 'react';
import './imageButton.css';

function ImageButton(props) {
  return (
    <div className="img-conatainer">
      <img className="imgImgBtn" src={props.endereco} />
      <p className="txtImgBtn">{props.texto}</p>
    </div>
  )
}

export default ImageButton