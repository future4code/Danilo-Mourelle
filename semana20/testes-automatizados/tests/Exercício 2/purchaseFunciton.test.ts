import { User } from "../../src/Exercício 1/UserInterface"
import { purchase } from "../../src/Exercício 1/purchaseFunction"

describe("Testing function purchase", () => {
  test("Should return undefined for user balance less than value", () => {
    const user: User = {
      balance: 30,
      name: "Danilo"
    }
    const value = 50

    const result = purchase(user, value)

    expect(result).toBe(undefined)
  })
  test("Should return user balance 0 for user balance equal than value", () => {
    const user: User = {
      balance: 30,
      name: "Danilo"
    }
    const value = 30

    const result = purchase(user, value)

    expect(result).toEqual({name: user.name, balance:0})
  })
  test("Should return user with new balacne for user balance greather than value", () => {
    const user: User = {
      balance: 30,
      name: "Danilo"
    }
    const value = 20

    const result = purchase(user, value)

    expect(result).toEqual({name: user.name, balance:10})
    expect(result?.balance).toEqual(user.balance - value)
  })
})