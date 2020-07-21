function findTarget(arr: number[], target: number): number{
  for (let i = 0; i < arr.length; i++) {
    if(arr[i] >= target){
      return i
    };
  }

  return arr.length
}