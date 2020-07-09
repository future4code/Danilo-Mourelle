function sumUntilNum(num: number): number {
  if (num === 0) {
    return 0
  }
  return num + sumUntilNum(num - 1)
}

