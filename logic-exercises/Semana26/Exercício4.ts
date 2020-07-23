export function pascalTriangulo(n: number, arr: number[][] = [[1]]): number[][] {
  if (n === 1) {
    return arr
  }
  if (arr === [[1]]) {
    pascalTriangulo(n - 1, [[1], [1, 1]])
  }

  let newSubArray: number[] = [1]
  const lastSubArray = arr.length - 1
  for (let index = 0; index < arr[lastSubArray].length - 1; index++) {
    newSubArray.push(arr[lastSubArray][index] + arr[lastSubArray][index + 1])
  }
  newSubArray.push(1)
  arr.push(newSubArray)
  return pascalTriangulo(n - 1, arr)
}