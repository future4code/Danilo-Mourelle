import { countAndTell } from "../../Semana26/Exercício3"

describe("Testing Exercício3 (countAndTell)", () => {
  test("Return 1 for n = 1", () => {
    const result = countAndTell(1)

    expect(result).toBe('1')
  })
  test("Return 21 for n = 3", () => {
    const result = countAndTell(3)

    expect(result).toBe('21')
  })
  test("Return 1113213211 for n = 8", () => {
    const result = countAndTell(8)

    expect(result).toBe('1113213211')
  })
})