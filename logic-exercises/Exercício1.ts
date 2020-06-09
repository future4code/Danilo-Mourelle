function exerc1(array: number[]): any{

  return {
    soma: array.reduce((acc, cur) => acc + cur),
    quantidade: array.length,
    multiplicacao: array.reduce((acc, cur) =>  acc * cur)
  }
}