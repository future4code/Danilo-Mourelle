import { checkAnagrama } from "../../Semana25/Exercício2"

describe("Testing Exercício2 (checkAnagrama)", () => {
  test("Return true for s = 'anagrama', t = 'nagarama'", () => {
    const result = checkAnagrama('anagrama', 'nagarama')

    expect(result).toBe(true)
  })
  test("Return true for s = 'gato', t = 'toga'", () => {
    const result = checkAnagrama('gato', 'toga')

    expect(result).toBe(true)
  })
  test("Return false for 'gato', t = 'rato'", () => {
    const result = checkAnagrama('gato', 'rato')

    expect(result).toBe(false)
  })
})