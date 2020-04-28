/* import * as moment from 'moment';
moment.locale("pt-br");

let fourth = "28/12/p98p 15:30"
const teste = moment().format("DD/MM/YYYY")

const minhaData = moment("28/07/kbg 15:30", "DD/MM/YYYY HH:mm");

console.log("Meu timestamp é ", minhaData.unix());
console.log("minha data no formato americano", minhaData.format("MM-DD-YYYY hh:mm A"))
console.log("Mostrando os dias: ", minhaData.format("DD/MM/YYYY [é] dddd"))


console.log(minhaData.isValid())
console.log('isNaN', isNaN(moment(fourth, "DD/MM/YYYY HH:mm").unix()))
console.log('valid', moment(fourth, "DD/MM/YYYY HH:mm").isValid())
console.log(moment(fourth, "DD/MM/YYYY HH:mm").format("DD/MM/YYYY HH:mm"))
console.log(teste) */

import * as moment from 'moment';
moment.locale("pt-br")
const formatoData = "DD/MM/YYYY";

//a)

const data1A = moment("20/10/2019", formatoData);
const data2A = moment("20/10/2019", formatoData);
const diffA = data1A.diff(data2A, "days");
console.log("diferença: ", diffA);
console.log("dia da semana - primeira data: ", data1A.format("dddd"));
console.log("dia da semana - segunda data: ", data2A.format("dddd"));

//b)
console.log("-------------------")
const data1B = moment("31/12/2019", formatoData);
const data2B = moment("01/01/2019", formatoData);
const diffB = data2B.diff(data1B , "days");
console.log("diferença: ", diffB);
console.log("dia da semana - primeira data: ", data1B.format("dddd"));
console.log("dia da semana - segunda data: ", data2B.format("dddd"));
console.log("-------------------")

//c)
const data1C = moment("19/08/2010", formatoData);
const data2C = moment("10/12/1995", formatoData);
const diffC = data1C.diff(data2C , "days");
console.log("diferença: ", diffC);
console.log("dia da semana - primeira data: ", data1C.format("dddd"));
console.log("dia da semana - segunda data: ", data2C.format("dddd"));