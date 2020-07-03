function tillNumber(num: number): void {
  if (num === 0) {
    console.log(0)
  }
  else {
    tillNumber(num - 1)
    console.log(num)
  }
}