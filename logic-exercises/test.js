function teste(n, str = '1') {
  if (n === 1) {
    return str
  }
  const arr = str.split('')
  let value, count
  let nextArr = []

  for (let index = 0; index < arr.length; index++) {
    if (arr[index] !== value) {
      if (index !== 0) {
        nextArr.push(count)
        nextArr.push(value)
      }
      value = arr[index],
        count = 1
    } else {
      count++
    }
  }
  nextArr.push(count)
  nextArr.push(value)

  const nextStr = nextArr.join('')
  return teste(n - 1, nextStr)
}

console.log(teste(1))