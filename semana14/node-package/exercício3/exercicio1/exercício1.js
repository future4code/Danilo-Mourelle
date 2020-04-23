const operation = process.argv[2]
const valueA = process.argv[3]
const valueB = process.argv[4]


function mathOperation(operation, firstValue, secondValue) {
  if (isNaN(firstValue) || isNaN(secondValue)) {
    console.log('\u001b[31m O segundo e terceiro parametros precisam ser valores numéricos')
  }
  else {
    switch (operation) {
      case 'add':
        console.log(`\u001b[34m Resposta: ${Number(firstValue) + Number(secondValue)}`)
        break;
      case 'sub':
        console.log(`\u001b[34m Resposta: ${Number(firstValue) - Number(secondValue)}`)
        break;
      case 'div':
        console.log(`\u001b[34m Resposta: ${Number(firstValue) / Number(secondValue)}`)
        break;
      case 'tim':
        console.log(`\u001b[34m Resposta: ${Number(firstValue) * Number(secondValue)}`)

        break;

      default:
        console.log('\u001b[31m Operação inválidas')
        break;
    }
  }
}

const result = mathOperation(operation, valueA, valueB)