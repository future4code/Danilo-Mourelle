import { UserDataBase } from '../../src/data/UserDatabase'
import { BaseDataBase } from '../../src/data/BaseDatabse'

describe("Testing UserDataBase", () => {
  test("Should creat a user", async () => {
    const user = {
      id: "001",
      email: "dan@email.com",
      password: "toranja",
      role: "sempre admin",
      name: "Danilo da Massa"
    }

    await new UserDataBase().createUser(
      user.id,
      user.name,
      user.email,
      user.password,
      user.role
    )

    const userCreated = await new UserDataBase().getUserById("001")

    expect(userCreated).not.toBe(undefined)
    expect(userCreated).toEqual({
      id: user.id,
      email: user.email,
      password: user.password,
      role: user.role,
      name: user.name
    })
  })

  test("Should go to catch", async () => {
    const user = {
      id: "001",
      email: "dan@email.com",
      password: "toranja",
      role: "sempre admin",
      name: "Danilo da Massa"
    }
    try{
      await new UserDataBase().createUser(
        user.id,
        user.name,
        user.email,
        user.password,
        user.role
      )
    } catch (err){
      expect(err).not.toBe(undefined)
    }
  })
  afterAll(async ()=> {
    await new UserDataBase().deleteUserById("001")
    await  BaseDataBase.destroyConnection()
  })
})