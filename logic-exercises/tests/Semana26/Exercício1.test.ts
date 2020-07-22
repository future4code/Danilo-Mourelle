import { findTargetIndex } from "../../Semana26/Exercício1"

describe("Testing Exercício1 (findTargetIndex)", () => {
  test("Return 2 for arr=[1,3,5,6] and target=5", () => {
    const result = findTargetIndex([1, 3, 5, 6], 5)

    expect(result).toBe(2)
  })
  test("Return 1 for arr=[1,3,5,6] and target=2", () => {
    const result = findTargetIndex([1, 3, 5, 6], 2)

    expect(result).toBe(1)
  })
  test("Return 4 for arr=[1,3,5,6] and target=7", () => {
    const result = findTargetIndex([1, 3, 5, 6], 7)

    expect(result).toBe(4)
  })
  test("Return 0 for arr=[1,3,5,6] and target=0", () => {
    const result = findTargetIndex([1, 3, 5, 6], 0)

    expect(result).toBe(0)
  })
})