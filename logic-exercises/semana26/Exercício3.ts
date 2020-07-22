export function countAndTell(n: number, str = '1'): string {
  if (n === 1) {
    return str
  }
  const arr = str.split('')
  let value: string = ''
  let count: number = 0
  let nextArr: string[] = []

  const addToArr = (count: number, value: string) => {
    nextArr.push(count.toString())
    nextArr.push(value)
  }

  for (let index = 0; index < arr.length; index++) {
    if (arr[index] !== value) {
      if (index !== 0) {
        addToArr(count, value)
      }
      value = arr[index],
        count = 1
    } else {
      count++
    }
  }
  addToArr(count, value)

  const nextStr = nextArr.join('')
  return countAndTell(n - 1, nextStr)
}