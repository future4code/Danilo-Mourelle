function printArray(array: number[], index: number = 0): void {
  if (index < array.length) {
    console.log(array[index])
    printArray(array, index + 1)
  }
}
