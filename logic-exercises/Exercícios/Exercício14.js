function findMissing(array) {
  let found = false
  let number = 0
  do {
    number++
    found = array.includes(number)
  } while (found)
  return number
}

console.log(findMissing([
  90,19,29,39,49,59,69,79,89,99,
  40,14,24,34,44,54,64,74,84,94,
  00,01,02,03,04,05,06,07,08,09,
  20,12,22,32,42,52,62,72,82,92,
  30,13,23,33,43,53,63,73,83,93,
  50,15,25,35,45,55,65,75,85,95,
  70,17,27,37,47,57,67,77,87,97,
  10,11,21,31,41,51,61,71,81,91,
  80,18,28,38,48,58,68,78,88,98,
  60,16,26,36,46,56,66,76,86,96,
]))