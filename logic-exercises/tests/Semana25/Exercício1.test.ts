import { lonelyNumber } from "../../Semana25/Exercício1"

describe("Testing Exercício1 (lonelyNumber)", () => {
  test("Return 1 for arr=[2,2,1]", () => {
    const result = lonelyNumber([2, 2, 1])

    expect(result).toBe(1)
  })
  test("Return 4 for arr=[4,1,2,1,2]", () => {
    const result = lonelyNumber([4, 1, 2, 1, 2])

    expect(result).toBe(4)
  })
})