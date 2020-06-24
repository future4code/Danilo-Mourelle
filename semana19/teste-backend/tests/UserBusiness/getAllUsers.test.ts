import { UserBusiness } from "../../src/business/UserBusiness";
import { User, UserRole, stringToUserRole } from "../../src/model/User";

describe("Testing UserBusiness.getAllUsers", () => {
  let userDatabase = {};
  let hashGenerator = {};
  let tokenGenerator = {};
  let idGenerator = {};

  test("Should return 'Invalid user role' when role not ADMIN", async () => {
    expect.assertions(2);

    const verify = jest.fn((token: string) => ({ id: "Any value", role: "NOT ADMIN" }))
    tokenGenerator = { verify }

    try {
      const userBusiness = new UserBusiness(
        userDatabase as any,
        hashGenerator as any,
        tokenGenerator as any,
        idGenerator as any
      );

      await userBusiness.getAllUsers("token")

    } catch (err) {
      expect(err.errorCode).toBe(422);
      expect(err.message).toBe("Invalid user role");
    }
  });

  test("Should return 'You can't do this pall' when role NORMAL", async () => {
    expect.assertions(2);

    const verify = jest.fn((token: string) => ({ id: "Any value", role: "NORMAL" }))
    tokenGenerator = { verify }

    try {
      const userBusiness = new UserBusiness(
        userDatabase as any,
        hashGenerator as any,
        tokenGenerator as any,
        idGenerator as any
      );

      await userBusiness.getAllUsers('token')

    } catch (err) {
      expect(err.errorCode).toBe(401);
      expect(err.message).toBe("You can't do this pall");
    }
  });

  test("Should return a list of user found", async () => {
    const verify = jest.fn((token: string) => ({ id: "Any value", role: "ADMIN" }))
    tokenGenerator = { verify }

    const getAllUsers = jest.fn(() =>
      [
        new User(
          "35b62ff4-64af-4721-a4c5-d038c6f730cf",
          "Astrodev",
          "astrodev@gmail.com",
          "hash",
          UserRole.ADMIN)
      ]
    )

    userDatabase = { getAllUsers }

    const userBusiness = new UserBusiness(
      userDatabase as any,
      hashGenerator as any,
      tokenGenerator as any,
      idGenerator as any
    );

    const result = await userBusiness.getAllUsers("token");

    expect(getAllUsers).toHaveBeenCalled()
    expect(result).toEqual([{
      id: "35b62ff4-64af-4721-a4c5-d038c6f730cf",
      name: "Astrodev",
      email: "astrodev@gmail.com",
      role: "ADMIN"
    }])
  });
})