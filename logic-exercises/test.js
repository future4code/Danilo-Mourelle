function countNegativeIntoMatrix(matrix) {
  let countNegatives = 0

  for (let i = 0; i < matrix.length; i++) {
    if (matrix[i][0] >= 0) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] < 0) {
          countNegatives += matrix[i].length - j
          j = matrix[i].length
        }
      }
    } else {
      countNegatives += matrix[i].length
    }
  }
  return countNegatives
}

console.log(countNegativeIntoMatrix([[-1]]))