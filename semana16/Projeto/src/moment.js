var moment = require("moment");
moment.locale("pt-br");

let fourth = "28/12/p98p 15:30"
const teste = moment().format("DD/MM/YYYY")

var minhaData = moment("28/07/2019 15:30", "DD/MM/YYYY HH:mm");
console.log("Meu timestamp é ", minhaData.unix());
console.log("minha data no formato americano", minhaData.format("MM-DD-YYYY hh:mm A"));
console.log("Mostrando os dias: ", minhaData.format("DD/MM/YYYY [é] dddd"));
console.log(minhaData)

console.log(minhaData.isValid())
console.log('isNaN', isNaN(moment(fourth, "DD/MM/YYYY HH:mm").unix()))
console.log('valid', moment(fourth, "DD/MM/YYYY HH:mm").isValid())
console.log(moment(fourth, "DD/MM/YYYY HH:mm").format("DD/MM/YYYY HH:mm"))
console.log(teste)