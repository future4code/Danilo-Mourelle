function fatorial(n: number) {
  if (n > 1) {
    return n * fatorial(n - 1)
  }
  else {
    return 1
  }
}
