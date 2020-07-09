function strigDetails(string: string): any {
  return {
    character: string.length,
    firstCharacter: string[0],
    lastCharacter: string[string.length - 1]
  }
}