class Despesa {
  constructor(valor, descricao, tipo) {
    this.valor = valor
    this.descricao = descricao
    this.tipo = tipo
  }
}

let todasDespesas = []
let acumuladoTodas = ""
let despesaTotal=0
//************************************************************** */
//******************************************************************************* */
function cadastraDespesa() {
  
  let novoValor = Number(document.getElementById("valor").value)
  let novaDescricao = document.getElementById("descricao").value
  let novoTipo = document.getElementById("tipo-cadastro").value
  
  if (novoValor === 0 || isNaN(novoValor)) {
    alert("Insira um valor")
  }
  else if (novaDescricao === "") {
    alert("Insira uma descrição")
  }
  else {
    document.getElementById("valor").value = ""
    document.getElementById("descricao").value = ""
    document.getElementById("tipo-cadastro").value = "Lazer"
    
    let novaDespesa = new Despesa(novoValor, novaDescricao, novoTipo)
    todasDespesas.push(novaDespesa)
    
    imprimeNovaDespesa(novoTipo, novaDescricao, novoValor)
    imprimeExtrato(novoTipo, novaDescricao, novoValor)
    
    console.log(todasDespesas)
  }
}

function imprimeNovaDespesa(tipo, descricao, valor) {
  let ultimaDespesa = ""
  ultimaDespesa += "<h5>Tipo da Despesa: " + tipo + "</h5>"
  ultimaDespesa += "<h5>Descrição: " + descricao + "</h5>"
  ultimaDespesa += "<h5>Valor: R$: " + valor + "</h5>"
  document.getElementById("ultima-despesa").innerHTML = ultimaDespesa
}
//********************************************************************* */
function imprimeExtrato(tipo, descricao, valor) {
  despesaTotal = somaTotal(todasDespesas)
  document.getElementById("soma-total").innerHTML = "Total de despesas: " + despesaTotal

  acumuladoTodas += "-----------------------------------------<br>"
  acumuladoTodas += "<h5>Tipo da Despesa: " + tipo + "</h5>"
  acumuladoTodas += "<h5>Descrição: " + descricao + "</h5>"
  acumuladoTodas += "<h5>Valor: R$: " + valor + "</h5>"
  document.getElementById("todas-as-despesas").innerHTML = acumuladoTodas
}
//*************************************************************************** */
function somaTotal(array){
  let somaTotal=0
  array.forEach((despesa,index,array) => {
    somaTotal += despesa.valor
  })
  return somaTotal
}

//********************************************************************************** */
function filtrarDespesas() {

  let tipoFiltrado = document.getElementById("tipo-filtro").value
  let valorMax = Number(document.getElementById("valorMax").value)
  let valorMin = Number(document.getElementById("valorMin").value)

  if (isNaN(valorMax) || isNaN(valorMin)) {
    alert("Coloque valores válidos para máximo e/ou mínimo")
  }
  else {
    const arrayFiltrado = todasDespesas.filter((despesa, index, array) => {
      return despesa.tipo === tipoFiltrado && despesa.valor >= valorMin && despesa.valor <= valorMax
    })
    
    imprimeFiltro(arrayFiltrado)
    console.log(arrayFiltrado)
  }
}
//************************************************************************************** */
function imprimeFiltro(array) {
  document.getElementById("despesas-filtradas").innerHTML =""
  array.forEach((despesa, index, array) => {
      let filtradoTipo = despesa.tipo
      let filtradoValor = despesa.valor
      let filtradoDescricao = despesa.descricao
      document.getElementById("despesas-filtradas").innerHTML +=
          "<p>Valor: " + filtradoTipo + "</p>" +
          "<p>Tipo de despesa:" + filtradoValor + "</p>" +
          "<p>Descrição: " + filtradoDescricao + "</p>" +
          "<p>-----------------------------</p>"
  })
}
//************************************************************************************* */
function limparFiltros() {
  document.getElementById("tipo-filtro").value = "Lazer"
  document.getElementById("valorMax").value = ""
  document.getElementById("valorMin").value = ""
  document.getElementById("despesas-filtradas").innerHTML =""
}

