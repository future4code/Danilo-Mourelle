function orderArray(array:number[]): number[] {
  let max = array[0], min = array[0]
  for (const element of array) {
    if (element > max) {
      max = element
    }
    if (element < min) {
      min = element
    }
  }
  let result:number[] = []
  for (let index = 0; index <= max - min; index++) {
    result.push(min + index)
  }
  return result
}

console.log(orderArray([10, 20, 17, 22]))
