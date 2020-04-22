type result = {
  length: number,
  evenOdd: number,
  addAll: number
}

function arrayTricks(array: number[]): result {
  const length = array.length
  const evenOdd = array.filter(element => element % 2 === 1).length
  const addAll = array.reduce((accum, curr) => accum + curr)

  return {
    length,
    evenOdd,
    addAll,
  }
}

const ex2 = arrayTricks([1, 2, 3, 4, 5])
console.log(ex2)