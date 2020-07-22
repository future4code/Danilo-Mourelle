import { moveZero } from "../../Semana26/Exercício2"

describe("Testing Exercício2 (moveZero)", () => {
  test("Return [1,3,12,0,0] for arr = [0,1,0,3,12]", () => {
    const result = moveZero([0, 1, 0, 3, 12])

    expect(result).toEqual([1, 3, 12, 0, 0])
  })
  test("Return [1,0,0] for arr = [0,0,1]", () => {
    const result = moveZero([0, 0, 1])

    expect(result).toEqual([1, 0, 0])
  })
  test("Return [3,4,5,0,0,0,0] for arr = [0,3,0,0,4,0,5]", () => {
    const result = moveZero([0, 3, 0, 0, 4, 0, 5])

    expect(result).toEqual([3, 4, 5, 0, 0, 0, 0])
  })
})