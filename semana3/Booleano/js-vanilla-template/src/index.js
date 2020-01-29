 
//INTERPRETAÇÃO DE CÓDIGO
/*  
EXECÍCIO 1
a. falso
b. false
c. true
d. false
e. boolean
*/

/* 
EXERCÍCIO 2
A. array é um tipo de container onde podem ser armazenadas várias váriávei de acondo com um index de ordenação
B. O index inicial de um array é 0
C. através da função length, por exemplo tamanhoDoArray=nomeDoArray.length
D. I - undefined, II - null, III - 11, IV - 3 e 4, V - 19 e 9, VI - 3, VII - 1
*/

//ESCRITA DE CÓDIGO
/* 
EXERCÍCIO 1
*/
// A 
const Fahrenheit=77;
let resultadoKelvin;

resultadoKelvin=(Fahrenheit - 32)*5/9 + 273.15
console.log(resultadoKelvin, " ºK") //Valor esperado de 298.15 ºK

// B 
const Celsius=80;
let resultadoFahrenheit;

resultadoFahrenheit=Celsius*9/5 + 32
console.log(resultadoFahrenheit, " ºF") //Valor esperado 176 ºF

//C
const Celsius2=30
resultadoFahrenheit=Celsius2*9/5 +32
console.log(resultadoFahrenheit, " ºF") //Valor esperado 86 ºF

resultadoKelvin=(resultadoFahrenheit-32)*5/9+273.15
console.log(resultadoKelvin, " ºK") //Valor esperado 303,15 ºK

//D
let Celsius3=prompt("Indique uma temperatura em Celsius")
resultadoFahrenheit=Celsius3*9/5 +32
console.log(resultadoFahrenheit, " ºF") //Valor esperado 86 ºF

resultadoKelvin=(resultadoFahrenheit-32)*5/9+273.15
console.log(resultadoKelvin, " ºK") //Valor esperado 303,15 ºK

/* 
EXERCÍCIO 2 
*/
let resposta=prompt("Qual cidade vc mora?") ;
console.log(resposta);

resposta=prompt("Quantos anos você tem?")
console.log(resposta)

resposta=prompt("Você prefere gato ou cachorro?")
console.log(resposta)

resposta=prompt("Qual seu esporte favorito?")
console.log(resposta)

resposta=prompt("Você acha que vou ser um bom dev?")
console.log(resposta)

/* 
EXERCICIO 3
*/
//A
const valorKWh=0.05
let contaDaCasa, consumo=280                

contaDaCasa=consumo*valorKWh
console.log(contaDaCasa)

//B
let Desconto=prompt("Qual valor do seu desconto (sem simbolo de %)?")
contaDaCasa=contaDaCasa*(1-Desconto/100)
console.log(contaDaCasa)

/* 
DESAFIOS
*/
const libraEmKilo=0.453592, oncaEmKilo=0.0283495, milhaEmMetro=1609.34, pesEmMetro=0.3048, galaoEmLitro=3.78541, xicaraEmLitro=0.284131 
//A
const valorLibra=20
let resultado=valorLibra*libraEmKilo
console.log(valorLibra, "lb equivalem a ", resultado, " kg")
//B
const valorOnca=10.5
resultado=valorOnca*oncaEmKilo
console.log(valorOnca, "oz equivalem a ", resultado, " kg")
//C
const valorMilha=100
resultado=valorMilha*milhaEmMetro
console.log(valorMilha, "mi equivalem a ", resultado, " m")
//D
const valorPes=50
resultado=valorPes*pesEmMetro
console.log(valorPes, "ft equivalem a ", resultado, " m")
//E
const valorGalao=103.56
resultado=valorGalao*galaoEmLitro
console.log(valorGalao, "gal equivalem a ", resultado, " L")
//F
const valorXicara=450
resultado=valorXicara*xicaraEmLitro
console.log(valorXicara, "xic equivalem a ", resultado, " L")
//G
const valorQualquer=prompt("Coloque o valor em libras para obter em kg")
resultado=valorQualquer*libraEmKilo
console.log(Number(valorQualquer), "lb equivalem a ", resultado, " kg")

