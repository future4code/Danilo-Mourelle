class Post {
  constructor(autor, titulo, tema, conteudo) {
    this.autor = autor
    this.titulo = titulo
    this.tema = tema
    this.conteudo = conteudo
  }
}


function criarPost(){
  let novoAutor = document.getElementById("autor").value
  document.getElementById("autor").value = ""
  let novoTitulo = document.getElementById("titulo").value
  document.getElementById("titulo").value = ""
  let novoTema = document.getElementById("tema").value
  document.getElementById("tema").value = ""
  let novoConteudo = document.getElementById("conteudo").value
  document.getElementById("conteudo").value = ""
  let novoPost = new Post(novoAutor, novoTitulo, novoTema, novoConteudo)
  console.log(novoPost)
}



