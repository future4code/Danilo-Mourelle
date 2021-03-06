import { Casino, User, Result, NACIONALITY, LOCATION } from "../../src/Exercício 3/interfacerEenums"
import { verifyAge } from "../../src/Exercício 3/verifyAge"

describe("Testing function verifyAge", () => {
  test("Should accept a brazilian in a Brazil casino", () => {
    const cassino: Casino = {
      name: "BelaDonna",
      location: LOCATION.BRAZIL
    }
    const user: User[] = [{
      nacionality: NACIONALITY.BRAZILIAN,
      name: "Rosana",
      age: 20
    }]

    const result: Result = verifyAge(cassino, user)

    expect(result.brazilians.allowed).toContain("Rosana")
  })

  test("Should accept a american in a Brazil casino", () => {
    const cassino: Casino = {
      name: "BelaDonna",
      location: LOCATION.BRAZIL
    }
    const user: User[] = [{
      nacionality: NACIONALITY.AMERICAN,
      name: "Felipe",
      age: 20
    }]

    const result: Result = verifyAge(cassino, user)

    expect(result.americans.allowed).toContain("Felipe")
  })

  test("Should result for a EUA casino", () => {
    const cassino: Casino = {
      name: "Mirage",
      location: LOCATION.EUA
    }
    const users: User[] = [
      {
        nacionality: NACIONALITY.BRAZILIAN,
        name: "Danilo",
        age: 19
      },
      {
        nacionality: NACIONALITY.BRAZILIAN,
        name: "Elo",
        age: 19
      },
      {
        nacionality: NACIONALITY.AMERICAN,
        name: "Leo",
        age: 19
      },
      {
        nacionality: NACIONALITY.AMERICAN,
        name: "Marina",
        age: 19
      },
    ]
    const result: Result = verifyAge(cassino, users)

    expect(result.brazilians.unallowed).toContain("Danilo")
    expect(result.brazilians.unallowed).toContain("Elo")
    expect(result.brazilians.unallowed).toHaveLength(2)
    expect(result.americans.unallowed).toContain("Leo")
    expect(result.americans.unallowed).toContain("Marina")
    expect(result.americans.unallowed).toHaveLength(2)
  })

  test("Should result for a EUA casino 2", () => {
    const cassino: Casino = {
      name: "Mirage",
      location: LOCATION.EUA
    }
    const users: User[] = [
      {
        nacionality: NACIONALITY.BRAZILIAN,
        name: "Danilo",
        age: 19
      },
      {
        nacionality: NACIONALITY.BRAZILIAN,
        name: "Elo",
        age: 19
      },
      {
        nacionality: NACIONALITY.AMERICAN,
        name: "Leo",
        age: 21
      },
      {
        nacionality: NACIONALITY.AMERICAN,
        name: "Marina",
        age: 21
      },
    ]
    const result: Result = verifyAge(cassino, users)

    expect(result.brazilians.unallowed).toContain("Danilo")
    expect(result.brazilians.unallowed).toContain("Elo")
    expect(result.brazilians.unallowed).toHaveLength(2)
    expect(result.americans.allowed).toContain("Leo")
    expect(result.americans.allowed).toContain("Marina")
    expect(result.americans.allowed).toHaveLength(2)
  })
})