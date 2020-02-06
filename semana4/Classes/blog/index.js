class Post {
  constructor(autor, titulo, tema, conteudo, link) {
    this.autor = autor
    this.titulo = titulo
    this.tema = tema
    this.conteudo = conteudo
    this.imagem = link
  }
}

let todosOsPosts = []
function criarPost() {
  let novoAutor = document.getElementById("autor").value
  document.getElementById("autor").value = ""
  let novoTitulo = document.getElementById("titulo").value
  document.getElementById("titulo").value = ""
  let novoTema = document.getElementById("tema").value
  document.getElementById("tema").value = ""
  let novoConteudo = document.getElementById("conteudo").value
  document.getElementById("conteudo").value = ""
  let novaImagem = document.getElementById("imagem").value
  if (novaImagem === ""){
    novaImagem = null
  }
  document.getElementById("imagem").value = ""
  let novoPost = new Post(novoAutor, novoTitulo, novoTema, novoConteudo, novaImagem)

  publicaPost(novoAutor, novoTitulo, novoTema, novoConteudo, novaImagem)
  todosOsPosts.push(novoPost)
  console.log(todosOsPosts) 
}

function publicaPost(autor, titulo, tema, conteudo, imagem){
  let postagem = "<div><h4>" + tema + "</h4><h2>" + titulo + "</h2><p>" + conteudo + "</p><h4>" + autor + "</h4>"
  if (imagem!==null) {
    postagem+= "<img src=" + imagem + "></div>"
  }
  else{
    postagem+= "</div>"
  }
  document.getElementById("post").innerHTML += postagem
}


