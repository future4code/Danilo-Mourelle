enum cristianTime {
  ac = 'AC',
  dc = 'DC',
  empty = ''
}
enum yearRange {
  min = 0,
}

function defineEra(year: number, time?: string): string {
  switch (time) {
    case cristianTime.ac:
      if (year < yearRange.min) {
        return 'Dados inputados inválidos'
      }
      else if (year < 476) {
        return 'Idade-Antiga'
      }
      else {
        return 'Pré-história'
      }
    case cristianTime.dc:
      if (year < 476) {
        return 'Idade-Antiga'
      }
      else if (year < 1453) {
        return 'Idade-Moderna'
      }
      else {
        return 'Idade-Contemporânea'
      }
    case undefined:
      if (year < 476) {
        return 'Idade-Antiga'
      }
      else if (year < 1453) {
        return 'Idade-Moderna'
      }
      else {
        return 'Idade-Contemporânea'
      }
    default:
      return 'Dados inputados inválidos'
  }
}

const ex41 = defineEra(-10, 'DC')
console.log(ex41)
const ex42 = defineEra(1500, 'fr')
console.log(ex42)
const ex43 = defineEra(-10, 'fr')
console.log(ex43)
const ex44 = defineEra(5000, 'AC')
console.log(ex44)
const ex45 = defineEra(1000, 'AC')
console.log(ex45)
const ex46 = defineEra(250)
console.log(ex46)
const ex47 = defineEra(600, 'DC')
console.log(ex47)
const ex48 = defineEra(2020, 'DC')
console.log(ex48)