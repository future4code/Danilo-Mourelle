function printArray(array, index  = 0) {
  if (index < array.length) {
    console.log(array[index])
    printArray(array, index + 1)
  }
}

printArray([1,2,3,5,6,8,9])