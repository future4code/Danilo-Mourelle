function exer1b(array:number[]){
   const result = array.sort((a,b) => a - b)
   return {
    max:result[result.length - 1],
    min:result[0]
  }
}