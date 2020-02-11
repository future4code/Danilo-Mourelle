import React from 'react';
import './App.css';
import BigCard from './Componentes/BigCard/bigCard';
import SmallCard from './Componentes/SmallCard/smallCard';
import ImageButton from './Componentes/ImageButton/imageButton';
import PageSection from './Componentes/PageSection/pageSection';

function App() {
  return (
    <div className="App">
      <PageSection titulo="Dados Pessoais">
        <BigCard titulo="Danilo Mourelle" texto="Olá, sou Danilo. Aluno da F4" endereco={require("./imgs/profile-user.png")} />
        <SmallCard endereco={require("./imgs/email-icon.png")} label="Email: " texto="danilomourelle@outlook.com" />
        <SmallCard endereco="https://img1.gratispng.com/20180625/kzl/kisspng-computer-icons-address-address-icon-5b315ed54235c5.7661875215299621972712.jpg" 
          label="Endereço: " texto="Jabaquara São Paulo/SP" />
        <ImageButton texto="Ver mais" endereco="https://st2.depositphotos.com/7107694/10540/v/450/depositphotos_105402232-stock-illustration-arrowhead-down-contour-vector-icon.jpg" />
      </PageSection>

      <PageSection titulo="Experiências Profissionais">
        <BigCard titulo="Senai" texto="Monitoria de Calculo, Física Aplicada e Logica de Programação" endereco="https://s3.amazonaws.com/bucket-gw-cni-static-cms-si/portaldaindustria/noticias/media/16_9/logosenai_E7TWIa3.jpg" />
        <BigCard titulo="Stäubli" texto="Olá, sou Danilo. Aluno da F4" endereco="https://dunyaotomotivkonferansi.com/wp-content/uploads/2019/05/staubli.jpg" />
      </PageSection>

      <PageSection titulo="Minhas Redes Sociais">
        <ImageButton texto="LinkedIn" endereco="https://imagens.canaltech.com.br/empresas/4142.400.jpg" />
      </PageSection>
    </div>
  );
}

export default App;
