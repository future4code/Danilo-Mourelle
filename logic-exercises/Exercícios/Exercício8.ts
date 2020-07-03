function a(array: number[], number: number): number[] | string {
  if (array[0] > number) {
    let newArray = []
    for (let index = 0; number + index < array[0]; index++) {
      newArray.push(number + index)
    }
    return newArray.concat(array)
  }
  else if (array[array.length - 1] >= number) {
    return array
  }
  else {
    do
      array.push(array[array.length - 1] + 1)
    while (array[array.length - 1] < number)
    return array
  }
}