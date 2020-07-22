import { arrayRotation } from "../../Semana24/Exercício1"

describe("Testing Exercício1 (arrayRotation)", () => {
  test("Return [5,6,7,1,2,3,4] for nums = [1,2,3,4,5,6,7], k = 3", () => {
    const result = arrayRotation([1, 2, 3, 4, 5, 6, 7], 3)

    expect(result).toEqual([5, 6, 7, 1, 2, 3, 4])
  })
  test("Return [3,99,-1,-100] for nums = [-1,-100,3,99], k = 2", () => {
    const result = arrayRotation([-1, -100, 3, 99], 2)

    expect(result).toEqual([3, 99, -1, -100])
  })
})