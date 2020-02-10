import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="odin">
      <header>
        <div className="header-lado-esquerdo">
          <img src={require("./imagens/logo_ftube.jpg")} alt="logo_FutureTube" height="50px" />
          <h1>FutureTube</h1>
        </div>
        <div className="header-centro">
          <input type="text" placeholder="Busca..." />
          <button>Pesquisar</button>
        </div>
        <div className="header-lado-direito">
        <img src={require("./imagens/profile-user.png")} alt="perfil" height="50px" />
        </div>
      </header>
      
      <main>
        <nav>
          <div className="container-nav">
            <a href="index.html">Início</a>
            <a href="#">Em alta</a>
            <a href="#">Incrições</a>
            <a href="#">Originais</a>
            <a href="#">Biblioteca</a>
            <a href="#">Histórico</a>
          </div>
        </nav>

        <section>
          <div className="centro">
            {/* <!-- As quatro primeiras imagens --> */}
            <div className="quadro">
              <img src={require("./imagens/video1.PNG")} alt="belezas da Irlanda" />
              <a className="texto" id="item2" href="video1.html">
                <p>Belezas da Irlanda</p>
              </a>
            </div>

            <div className="quadro">
              <img src={require("./imagens/video2.png")} alt="Hemácias" />
              <a className="texto" id="item4" href="video2.html">
                <p>Hemácias</p>
              </a>
            </div>

            <div className="quadro" id="item5">
              <img src={require("./imagens/video3.PNG")} alt="praia" />
              <a className="texto" id="item6" href="#">
                <p>Verão</p>
              </a>
            </div>

            <div className="quadro">
              <img src={require("./imagens/video4.PNG")} alt="Planetas" />
              <a className="texto" id="item8" href="#">
                <p>Planetas de cores</p>
              </a>
            </div>

            {/* <!-- As quatro ultimas imagens --> */}
            <div className="quadro">
              <img src={require("./imagens/video5.PNG")} alt="Florestas" />
              <a className="texto" id="item2" href="#">
                <p>Florestas</p>
              </a>
            </div>

            <div className="quadro">
              <img src={require("./imagens/video6.PNG")} alt="Coelho" />
              <a className="texto" id="item4" href="#">
                <p>Animais fofinhos</p>
              </a>
            </div>

            <div className="quadro">
              <img src={require("./imagens/video7.PNG")} alt="Foguete" />
              <a className="texto" id="item6" href="#">
                <p>Foguete da NASA</p>
              </a>
            </div>

            <div className="quadro">
              <img src={require("./imagens/video8.PNG")} alt="Universo" />
              <a className="texto" id="item8" href="#">
                <p>Universo</p>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <p>Essa é uma mensagem de rodapé </p>
      </footer>
    </div>
  );
}

export default App;
