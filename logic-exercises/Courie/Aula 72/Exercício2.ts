function compression( input: string ): string {
  let count = 0
  let lastChar = input[0]
  let stringReturn = ''
  for (const char of input) {
    if(char !== lastChar){
      stringReturn += (lastChar + count)
      count =0
      lastChar = char
    }
    count++
  }
  stringReturn += (lastChar + count)

  return stringReturn.length > input.length ? input : stringReturn
}