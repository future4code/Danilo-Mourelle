function moveZero(arr: number[]): number[]{
  arr.sort((a,b) => {
    if(a === 0){
      return 1
    } else if(b === 0 ){
      return -1
    }
    else {
      return 0
    }
  })

  return arr
}