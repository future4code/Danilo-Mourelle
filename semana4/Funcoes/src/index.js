
//INTERPRETAÇÃO DE CÓDIGO
/*  
EXECÍCIO 1
a. minhaFunção(2) = []
b. minhaFuncao(5) = [0, 1, 0, 1, 2, 3,]
c. minhaFuncao(8) = [0, 1, 0, 1, 2, 3, 0, 1, 2, 3, 4, 5]
*/

/* 
EXERCÍCIO 2
a. console.lgo(funcao(arrayDeNomes, "Darvas")) = 0 / console.lgo(funcao(arrayDeNomes, "João")) = 2 / console.lgo(funcao(arrayDeNomes, "Paula")) = undefined
b. Sim, afinal a comparação é do elemento da lista com o parâmentro nome, uma vez que o parâmetro é alimentado com um número, e os elementos da lista são números, a comparação é possível.
*/

/* 
EXERCÍCIO 3
Ela faz duas operações com o array de input, que é somar os valores dos elementos e multiplicar os valores dos elementos. Um nome seria "Deveria-ter-separado-em-duas", 
  ou também somaTotalMultiplicaTotal(array)
*/

//ESCRITA DE CÓDIGO
/* 
EXERCÍCIO 4
*/
//A
function converteIdadeHumanoCachorro(idadeHumana) {
  let idadeCachorro = 7 * idadeHumana
  return idadeCachorro
}

//B
function geraDadosPessoais(nome, idade, endereco, ehEstudante) {
  if (ehEstudante === true) {
    return "Eu sou " + nome + ", tenho " + idade + " anos, moro em " + endereco + " e SOU estudante"
  }
  else {
    return "Eu sou " + nome + ", tenho " + idade + " anos, moro em " + endereco + " e NÃO SOU estudante"
  }
}

/* 
EXERCÍCIO 5
*/
function defineSeculo(ano) {
  const seculosRomanos = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX", "XXI"]
  let seculo = Math.floor(ano / 100)

  if (ano % 100 === 0) {
    return "O ano " + ano + " pertence ao século " + seculosRomanos[seculo - 1]
  }
  else {
    return "O ano " + ano + " pertence ao século " + seculosRomanos[seculo]
  }
}

/*
EXERCÍCIO 6
 */
const arrayExemplo = [10, 23, 45, 78, 90, 52, 35, 67, 84, 22]
//A
function quantificaElementos(array) {
  return array.length
}
//B
let ehPar = function (numero) {
  if (numero % 2 === 0) {
    return true
  }
  else {
    return false
  }
}
//C
let quantidadePar = (array) => {
  let somaPares = 0
  for (const elemento of array) {
    if (elemento % 2 === 0) {
      somaPares++
    }
  }
  return somaPares
}
//D
let quantidadePar = (array) => {
  let somaPares = 0
  for (const elemento of array) {
    if (ehPar(elemento)) {
      somaPares++
    }
  }
  return somaPares
}
