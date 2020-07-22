import { findTarget, anotherWay } from "../../Semana25/Exercício3"

describe("Testing Exercício3 (findTarget)", () => {
  test("Return [0,1] for nums=[2, 7, 11, 15] target=9", () => {
    const result = findTarget([2, 7, 11, 15], 9)

    expect(result).toEqual([0, 1])
  })
  test("Return [1,3] for nums=[4, 5, 10, 12, 21] target=17", () => {
    const result = findTarget([4, 5, 10, 12, 21], 17)

    expect(result).toEqual([1, 3])
  })
  test("Return [0,4] and NOT [1,1] for nums=[5, 6, 10, 12, 7] target=12", () => {
    const result = findTarget([5, 6, 10, 12, 7], 12)

    expect(result).toEqual([0, 4])
    expect(result).not.toEqual([1,1])
  })
})

describe("Testing Exercício3 (anotherWay)", () => {
  test("Return [0,1] for nums=[2, 7, 11, 15] target=9", () => {
    const result = anotherWay([2, 7, 11, 15], 9)

    expect(result).toEqual([0, 1])
  })
  test("Return [1,3] for nums=[4, 5, 10, 12, 21] target=17", () => {
    const result = anotherWay([4, 5, 10, 12, 21], 17)

    expect(result).toEqual([1, 3])
  })
  test("Return [0,4] and NOT [1,1] for nums=[5, 6, 10, 12, 7] target=12", () => {
    const result = anotherWay([5, 6, 10, 12, 7], 12)

    expect(result).toEqual([0, 4])
    expect(result).not.toEqual([1,1])
  })
})