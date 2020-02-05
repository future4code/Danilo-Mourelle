class Post {
  constructor(autor, titulo, tema, conteudo) {
    this.autor = autor
    this.titulo = titulo
    this.tema = tema
    this.conteudo = conteudo
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
  let novoPost = new Post(novoAutor, novoTitulo, novoTema, novoConteudo)

  
  publicaPost(novoAutor, novoTitulo, novoTema, novoConteudo)
  todosOsPosts.push(novoPost)
  console.log(todosOsPosts) 
}

function publicaPost(autor, titulo, tema, conteudo){
  document.getElementById("post").innerHTML += "<div><h4>" + tema + "</h4><h2>" + titulo + "</h2><p>" + conteudo + "</p><h4>" + autor + "</h4></div>"
}


