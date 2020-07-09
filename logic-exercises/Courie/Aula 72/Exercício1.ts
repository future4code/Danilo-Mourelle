function checkOneEdit(first: string, second: string): boolean {
  if (Math.abs(first.length - second.length) > 1) {
    return false
  }

  let count = 0
  for (const char of second) {
    if (first.indexOf(char) === -1) {
      count++
    }
  }

  return count > 1
}