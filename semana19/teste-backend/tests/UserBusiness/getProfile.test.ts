import { UserBusiness } from "../../src/business/UserBusiness";
import { User, UserRole, stringToUserRole } from "../../src/model/User";

describe("Testing UserBusiness.getProfile", () => {
  let userDatabase = {};
  let hashGenerator = {};
  let tokenGenerator = {};
  let idGenerator = {};

  test("Should return 'User not Found!!' when user doesn't exist", async () => {
    expect.assertions(4);

    const verify = jest.fn((token: string) => ({ id: "Any value", role: "NORMAL" }))
    tokenGenerator = { verify }

    const getUserById = jest.fn((id: string) => undefined)
    userDatabase = { getUserById }

    try {
      const userBusiness = new UserBusiness(
        userDatabase as any,
        hashGenerator as any,
        tokenGenerator as any,
        idGenerator as any
      );

      await userBusiness.getProfile('token')
    } catch (err) {
      expect(err.errorCode).toBe(404);
      expect(err.message).toBe('User not Found!!');
      expect(verify).toHaveBeenCalledWith("token")
      expect(getUserById).toHaveBeenCalledWith("Any value")
    }
  });

  test("Should return a user found", async () => {
    const verify = jest.fn((token: string) => ({ id: "35b62ff4-64af-4721-a4c5-d038c6f730cf", role: "ADMIN" }))
    tokenGenerator = { verify }

    const getUserById = jest.fn((id: string) => new User(
      "35b62ff4-64af-4721-a4c5-d038c6f730cf",
      "Astrodev",
      "astrodev@gmail.com",
      "hash",
      UserRole.ADMIN))

    userDatabase = { getUserById }


    const userBusiness = new UserBusiness(
      userDatabase as any,
      hashGenerator as any,
      tokenGenerator as any,
      idGenerator as any
    );

    const result = await userBusiness.getProfile('token');

    expect(verify).toHaveBeenCalledWith("token")
    expect(getUserById).toHaveBeenCalledWith("35b62ff4-64af-4721-a4c5-d038c6f730cf")
    expect(result).toEqual({
      id: "35b62ff4-64af-4721-a4c5-d038c6f730cf",
      name: "Astrodev",
      email: "astrodev@gmail.com",
      role: "ADMIN"
    })
  });
})