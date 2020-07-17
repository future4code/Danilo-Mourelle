function findTarget(array: number [], target: number): number[] | undefined {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      if (array[j] + array[i] === target) {
        return [i, j]
      }
    }
  }
}

function findTarget2(array: number [], target: number): number[] | undefined {
  for (let i = 0; i < array.length; i++) {
    const j = array.indexOf(target - array[i])
    if(j !== -1){
      return[i, j]
    }
  }
}