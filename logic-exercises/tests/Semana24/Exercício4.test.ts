import { checkPrefix } from "../../Semana24/Exercício4"

describe("Testing Exercício3 (checkPrefix)", () => {
  test("Return 'fl' for input=[flower,flow,flight]", () => {
    const result = checkPrefix(["flower","flow","flight"])

    expect(result).toBe('fl')
  })
  test("Return '' for input=[dog,racecar,car]", () => {
    const result = checkPrefix(["dog","racecar","car"])

    expect(result).toBe('')
  })
  test("Return 'cor' for input=['coracao','cor','corona','coreia']", () => {
    const result = checkPrefix(["coracao","cor","corona","coreia"])

    expect(result).toBe('cor')
  })
})