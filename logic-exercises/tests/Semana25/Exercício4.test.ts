import { countNegativeIntoMatrix } from "../../Semana25/Exercício4"

describe("Testing Exercício3 (countNegativeIntoMatrix)", () => {
  test("Return 8 for matrix=[[4,3,2,-1],[3,2,1,-1],[1,1,-1,-2],[-1,-1,-2,-3]]", () => {
    const result = countNegativeIntoMatrix([[4,3,2,-1],[3,2,1,-1],[1,1,-1,-2],[-1,-1,-2,-3]])

    expect(result).toBe(8)
  })
  test("Return 0 for matrix=[[3,2],[1,0]]", () => {
    const result = countNegativeIntoMatrix([[3,2],[1,0]])

    expect(result).toBe(0)
  })
  test("Return 3 for matrix=[[1,-1],[-1,-1]]", () => {
    const result = countNegativeIntoMatrix([[1,-1],[-1,-1]])

    expect(result).toBe(3)
  })
  test("Return 1 for matrix=[[-1]]", () => {
    const result = countNegativeIntoMatrix([[-1]])

    expect(result).toBe(1)
  })
})