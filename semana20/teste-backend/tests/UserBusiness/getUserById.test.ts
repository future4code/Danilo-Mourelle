import { UserBusiness } from "../../src/business/UserBusiness";
import { User, UserRole, stringToUserRole } from "../../src/model/User";

describe("Testing UserBusiness.getUserById", () => {
  let userDatabase = {};
  let hashGenerator = {};
  let tokenGenerator = {};
  let idGenerator = {};

  test("Should return 'User not Found!!' when user doesn't exist", async () => {
    expect.assertions(3);

    const getUserById = jest.fn((id: string) => undefined)
    userDatabase = { getUserById }

    try {
      const userBusiness = new UserBusiness(
        userDatabase as any,
        hashGenerator as any,
        tokenGenerator as any,
        idGenerator as any
      );

      await userBusiness.getUserById("001")
    } catch (err) {
      expect(err.errorCode).toBe(404);
      expect(err.message).toBe('User not Found!!');
      expect(getUserById).toHaveBeenCalledWith("001")
    }
  });

  test("Should return a user found", async () => {
    expect.assertions(2);

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

    const result = await userBusiness.getUserById("35b62ff4-64af-4721-a4c5-d038c6f730cf");

    expect(getUserById).toHaveBeenCalledWith("35b62ff4-64af-4721-a4c5-d038c6f730cf")
    expect(result).toEqual({
      id: "35b62ff4-64af-4721-a4c5-d038c6f730cf",
      name: "Astrodev",
      email: "astrodev@gmail.com",
      role: "ADMIN"
    })
  });
})