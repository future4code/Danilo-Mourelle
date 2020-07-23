import { pascalTriangulo } from "../../Semana26/Exercício4"

describe("Testing Exercício4 (pascalTriangulo)", () => {
  test("Return [[1]] for n = 1", () => {
    const result = pascalTriangulo(1)

    expect(result).toEqual([[1]])
  })
  test("Return [[1], [1, 1], [1, 2, 1]] for n = 3", () => {
    const result = pascalTriangulo(3)

    expect(result).toEqual([[1], [1, 1], [1, 2, 1]])
  })
  test("Return [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]] for n = 5", () => {
    const result = pascalTriangulo(5)

    expect(result).toEqual([[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]])
  })
  test("Return [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1], [1, 5, 10, 10, 5, 1], [1, 6, 15, 20, 15, 6, 1], [1, 7, 21, 35, 35, 21, 7, 1]] for n = 8", () => {
    const result = pascalTriangulo(8)

    expect(result).toEqual([[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1], [1, 5, 10, 10, 5, 1], [1, 6, 15, 20, 15, 6, 1], [1, 7, 21, 35, 35, 21, 7, 1]])
  })
})