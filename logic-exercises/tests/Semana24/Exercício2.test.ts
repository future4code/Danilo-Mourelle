import { numberInverted } from "../../Semana24/Exercício2"

describe("Testing Exercício2 (numberInverted)", () => {
  test("Return 321 for num=123", () => {
    const result = numberInverted(123)

    expect(result).toBe(321)
  })
  test("Return -321 for n=-123", () => {
    const result = numberInverted(-123)

    expect(result).toBe(-321)
  })
  test("Return 21 for n=120", () => {
    const result = numberInverted(120)

    expect(result).toBe(21)
  })
})