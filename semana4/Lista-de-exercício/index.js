//INTERPRETAÇÃO DE CÓDIGO
/*
EXERCICIO 1
A função executa a conversão de dolar para real após solicitar o valor da cotação. meuDinheiro acumula o retorno da conversão de 100 dolares em real, e o console vai imprimir o valor em real.
Porém, antes de imprimir, vai solicitar que a taxa de conversão seja informada.
*/

/*
EXERCICIO 2
A função vai retornar o resultado de um determinado investimento a partir de dois inputs (valor investido e tipo do investimento).
novoMontande aplica 150 em "Ações" e portanto vai acumular um valor de 165 (que sera impresso no console)
segundoMontante gerará um alerta, pois "Tesouro Direto" não é um tipo de investimento válido (console vai imprimir undefined)
*/

/*
EXERCICIO 3
O laço forof vai correr todo o array numeros, separando os pares para array1 e impares para array2.
No console teremos a impressão do tamanaho do array numeros (Quantidade total de numeros 14), o tamanho do array1, ou seja, dos pares (6), o tamanho do array2, ou seja, dos impares(8)
*/

/*
EXERCICIO 4
o laço do forof percorre todo o array numeros e coloca o menor número em numero1 e o maior número em numero2.
A impressão no console será de -10 / 1590 (detalhe, o maior número funciona pois o maior número é positivo, caso o array numeros fosse apenas com elementos negativos,
  essa estratégia não seria adequada)
*/

/*
EXERCICIO 4
o laço do forof percorre todo o array numeros e coloca o menor número em numero1 e o maior número em numero2.
A impressão no console será de -10 / 1590 (detalhe, o maior número funciona pois o maior número é positivo, caso o array numeros fosse apenas com elementos negativos,
  essa estratégia não seria adequada)
*/

//LÓGICA DE PROGRAMAÇÃO
/*
EXERCICIO 1
Cor forof / for array.length / while array.length index++
 */
const arrayExemplo = [10, 20, 30, 40, 50, 60, 70, 90, 80]

for (const elemento of arrayExemplo) {
  console.log(elemento)
}

for (let index = 0; index < arrayExemplo.length; index++) {
  const element = arrayExemplo[index];
  console.log(element)
}

let i = 0
while (i < arrayExemplo.length) {
  console.log(arrayExemplo[i])
  i++
}

/*
EXERCICIO 2
a. FALSE
b. FALSE
c. TRUE
d. TRUE
e. TRUE
 */

/*
EXERCICIO 3
Não funciona, como esqueceu de incrementar o valor de i, o loop while se tornou infinito, outro detalhe é que como 0 é o primeiro para, a expressão deve ser apenas (i < quanridade)
 */
const quantidadeDeNumerosPares = Number(prompt("Digite o valor para N"))
let i = 0
while (i < quantidadeDeNumerosPares) {
  console.log(i * 2)
  i++
}

/*
EXERCICIO 4
*/
let a = Number(prompt("Digite o valor para A"))
let b = Number(prompt("Digite o valor para B"))
let c = Number(prompt("Digite o valor para C"))

function defineTipoTraingulo(ladoA, ladoB, ladoC) {
  if (ladoA === ladoB && ladoB === ladoC) {
    return "Equilátero"
  }
  else if (ladoA !== ladoB && ladoA !== ladoC && ladoB !== ladoC) {
    return "Escaleno"
  }
  else {
    return "Isóceles"
  }
}

console.log(defineTipoTraingulo(a, b, c))

/*
EXERCICIO 5
*/
let a = Number(prompt("Digite o valor para A"))
let b = Number(prompt("Digite o valor para B"))

function defineMaior(numero1, numero2) {
  if (numero1 > numero2) {
    return numero1
  }
  else {
    return numero2
  }
}

function verificaDivisao(numero1, numero2) {
  if (numero1 % numero2 === 0) {
    return numero1, "é divisível por", numero2
  }
  else {
    return numero1, "NÃO é divisível por", numero2
  }
}

function encontraDiferença(primeiroNumero, segundoNumero) {
  let maior = defineMaior(primeiroNumero, segundoNumero)
  if (maior === primeiroNumero) {
    return primeiroNumero - segundoNumero
  }
  else {
    return segundoNumero - primeiroNumero
  }
}

console.log("O maior é: " + defineMaior(a, b))
console.log(verificaDivisao(a, b))
console.log(verificaDivisao(b, a))
console.log("A diferença entre ele é " + encontraDiferença(a, b))

//EXERCÍCIO DE FUNÇÕES
/* 
EXERCICIO 1
*/
function segundoMaiorEMenor(array) {
  let maior = array[0]
  let menor = array[0]

  for (const elemento of array) {
    if (elemento > maior) {
      maior = elemento
    }
    if (elemento < menor) {
      menor = elemento
    }
  }

  let segundoMenor = maior
  let segundoMaior = menor

  for (const elemento of array) {
    if (elemento > segundoMaior && elemento < maior) {
      segundoMaior = elemento
    }
    if (elemento < segundoMenor && elemento > menor) {
      segundoMenor = elemento
    }
  }
  console.log("O segundo maior elemento é: " + segundoMaior)
  console.log("O segundo menor elemento é: " + segundoMenor)
}

segundoMaiorEMenor(arrayExemplo)

/* 
EXERCICIO 2
*/
let invocacaoDoMal = () => {
  alert("Hello Future4")
}

invocacaoDoMal()

//EXERCÍCIOS DE OBJETOS
/* 
EXERCICIO 1
Objeto é quando você precisa arquitetar um elementos que tem várias informações pertinentes (exemplo: Sapato pode ter cor, tamanho, marca, estilo) um array serviria para você guardar 
  vários desses objetos em comum (objetos de mesma classe), em um mesmo container.
*/

/* 
EXERCÍCIO 2
*/
function criaRetangulo(lado1, lado2) {
  let retangulo = {
    largura: lado1,
    altura: lado2,
    perimetro: 2 * (lado2 + lado1),
    area: lado1 * lado2
  }
  return retangulo
}

/* 
EXERCÍCIO 3
*/
const filmeFavorito = {
  nome: "About Time",
  diretor: "Richard Curtis",
  lancamento: 2013,
  elenco: ["Domhnall Gleeson", "Rachel McAdams", "Bill Nighy", "Lindsay Duncan", "Lydia Wilson"]
}

let listaDeAtores = ""
for (let index = 0; index < filmeFavorito.elenco.length; index++) {
  if (index === (filmeFavorito.elenco.length - 1)) {
    listaDeAtores += filmeFavorito.elenco[index] + "."
  }
  else {
    listaDeAtores += filmeFavorito.elenco[index] + ", "
  }
}

console.log("Venha assistir ao filme " + filmeFavorito.nome + ", de " + filmeFavorito.lancamento + ", dirigido por " + filmeFavorito.diretor + " e estrelado por " + listaDeAtores)

/* 
EXERCÍCIO 4
*/
const pessoaQualquer = {
  nome: "João da Silva",
  idade: 33,
  email: "joaodasilva@email.com",
  endereco: "Rua dos bobos, 0"
}

function anonimizarPessoa(objeto) {
  const anonimo = {
    ...objeto,
    nome: "ANÔNIMO",
  }
  return anonimo
}

console.log(pessoaQualquer)
console.log(anonimizarPessoa(pessoaQualquer))

//FUNÇÃO DE ARRAYS
/* 
EXERCICIO 1
*/
const pessoas = [{ nome: "Pedro", idade: 20 }, { nome: "João", idade: 10 }, { nome: "Paula", idade: 12 }, { nome: "Artur", idade: 89 }]

const adultos = pessoas.filter((elemento, index, array) => {
  return (elemento.idade >= 20)
})
const crioncaEAborrecentes = pessoas.filter((elemento, index, array) => {
  return (elemento.idade < 20)
})
console.log(pessoas)
console.log(adultos)
console.log(crioncaEAborrecentes)

/*
EXERCICIO 2
*/
const exemploArray = [1, 2, 3, 4, 5, 6]
//A
function dobraValores(arrayParametro) {
  const arrayPor2 = arrayParametro.map((elemento, index, array) => {
    return elemento * 2
  })
  return arrayPor2
}

let arrayDuplicado = dobraValores(exemploArray)

console.log(exemploArray)
console.log(arrayDuplicado)

//B
function triplicaValores(arrayParametro) {
  const arrayPor3 = arrayParametro.map((elemento, index, array) => {
    return `${elemento * 3}`
  })
  return arrayPor3
}

let arrayTriplicado = triplicaValores(exemploArray)

console.log(exemploArray)
console.log(arrayTriplicado)

//C
function imprimeParOuImpar(arrayParametro) {
  const arrayImpressa = arrayParametro.map((elemento, index, array) => {
    if (elemento % 2 === 0) {
      return `${elemento} é par`
    }
    else {
      return `${elemento} é impar`
    }
  })
  return arrayImpressa
}

let arrayImpressa = imprimeParOuImpar(exemploArray)

console.log(exemploArray)
console.log(arrayImpressa)

/*
EXERCICIO 3
*/
const pessoas = [
	{ nome: "Paula", idade: 12, altura: 1.8},
	{ nome: "João", idade: 20, altura: 1.3},
	{ nome: "Pedro", idade: 15, altura: 1.9},
	{ nome: "Luciano", idade: 22, altura: 1.8},
	{ nome: "Artur", idade: 10, altura: 1.2},
	{ nome: "Soter", idade: 70, altura: 1.9}
]
/*
EXERCICIO 1
*/
/*
EXERCICIO 1
*/