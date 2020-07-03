function countDigits(num) {
  let count = 0

  for (let index = 1; Math.floor(Math.abs(num) / index) !== 0; index = index * 10) {
    count++
  }
  return count
}

console.log(countDigits(-100))