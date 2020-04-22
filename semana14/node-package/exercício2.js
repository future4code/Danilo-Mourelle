const fs = require('fs')
const file = process.argv[2]
const data = `\n${process.argv[3]}`

try {
  fs.appendFileSync(file, data, 'utf8')
  console.log("\u001b[95m Tarefa adicionada com sucesso")
}
catch (e) {
  console.error(e)
}