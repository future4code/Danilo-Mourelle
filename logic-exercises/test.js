function moveZero(arr){
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

console.log(moveZero([0,3,0,0,4,0,5]))