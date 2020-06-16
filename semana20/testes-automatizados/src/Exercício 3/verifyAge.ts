import { Casino, User, Result, NACIONALITY, LOCATION } from "./interfacerEenums";

export function verifyAge(casino: Casino, users: User[]): Result {
  let result: Result = {
    brazilians: {
      allowed: [],
      unallowed: []
    },
    americans:
    {
      allowed: [],
      unallowed: []
    }
  }
  for (const user of users) {
    if (casino.location === LOCATION.BRAZIL) {
      if (user.age >= 18) {
        if (user.nacionality === NACIONALITY.BRAZILIAN) {
          result.brazilians.allowed.push(user.name)
        }
        else if (user.nacionality === NACIONALITY.AMERICAN) {
          result.americans.allowed.push(user.name)
        }
      }
      else {
        if (user.nacionality === NACIONALITY.BRAZILIAN) {
          result.brazilians.unallowed.push(user.name)
        }
        else if (user.nacionality === NACIONALITY.AMERICAN) {
          result.americans.unallowed.push(user.name)
        }
      }
    }
    else if (casino.location === LOCATION.EUA) {
      if (user.age >= 21) {
        if (user.nacionality === NACIONALITY.BRAZILIAN) {
          result.brazilians.allowed.push(user.name)
        }
        else if (user.nacionality === NACIONALITY.AMERICAN) {
          result.americans.allowed.push(user.name)
        }
      }
      else {
        if (user.nacionality === NACIONALITY.BRAZILIAN) {
          result.brazilians.unallowed.push(user.name)
        }
        else if (user.nacionality === NACIONALITY.AMERICAN) {
          result.americans.unallowed.push(user.name)
        }
      }
    }
  }

  return result
}