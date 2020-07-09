function checkPrefix(input) {
  let smallestString = input[0]
  for (const str of input) {
    if (str.length < smallestString.length) {
      smallestString = str
    }
  }
  let prefix = smallestString
  while (!everyHas(input, prefix) && prefix.length > 0) {
    prefix = prefix.slice(0, -1)
  }
  return prefix.length !== 0 ? prefix : ''
}

function everyHas(input, prefix) {
  return input.every((str) => (str.includes(prefix)))
}

console.log(checkPrefix(["coracao","cor","corona","coreia"]))