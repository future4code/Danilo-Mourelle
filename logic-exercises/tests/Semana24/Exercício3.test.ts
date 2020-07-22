import { checkStringSymbols } from "../../Semana24/Exercício3"

describe("Testing Exercício3 (checkStringSymbols)", () => {
  test("Return true for input='()'", () => {
    const result = checkStringSymbols('()')

    expect(result).toBe(true)
  })
  test("Return true for input='()[]{}' ", () => {
    const result = checkStringSymbols('()[]{}')

    expect(result).toBe(true)
  })
  test("Return false for input='(]' ", () => {
    const result = checkStringSymbols('(]')

    expect(result).toBe(false)
  })
  test("Return false for input='([)]' ", () => {
    const result = checkStringSymbols('([)]')

    expect(result).toBe(false)
  })
  test("Return true for input='{[]}' ", () => {
    const result = checkStringSymbols('{[]}')

    expect(result).toBe(true)
  })
})
