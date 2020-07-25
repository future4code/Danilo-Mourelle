export function checkPrefix(input: string[]): string {
  let smallestString: string = input[0]
  for (const str of input) {
    if (str.length < smallestString.length) {
      smallestString = str
    }
  }
  let prefix: string = smallestString
  while (!everyHas(input, prefix) && prefix.length > 0) {
    prefix = prefix.slice(0, -1)
  }
  return prefix.length !== 0 ? prefix : ''
}

function everyHas(input: string[], prefix: string): boolean {
  return input.every((str) => (str.includes(prefix)))
}