function lonelyNumber(array: number[]): number{
  const stack: number[] = []

  for (const number of array) {
    const i = stack.indexOf(number)
    if(i === -1){
      stack.push(number)
    }
    else {
      stack.splice(i, 1)
    }
  }
  return stack[0]
}