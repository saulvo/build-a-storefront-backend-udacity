import { UserModel } from "@/models";
import { IUser, IUserBase } from "@/types";

const userModel = new UserModel();

describe("User Model", () => {
  let userBase: IUserBase = {
    username: "saul",
    password: "123",
    firstname: "Saul",
    lastname: "Vo",
  };
  let user: IUser | undefined;

  afterAll(async () => {
    if (user) {
      await userModel.delete(user.id);
      user = undefined;
    }
  });

  it("should have a show method", () => {
    expect(userModel.getAll).toBeDefined();
  });
  it("should have a get method", () => {
    expect(userModel.get).toBeDefined();
  });
  it("should have a add method", () => {
    expect(userModel.create).toBeDefined();
  });
  it("should have a update method", () => {
    expect(userModel.update).toBeDefined();
  });
  it("should have a delete method", () => {
    expect(userModel.delete).toBeDefined();
  });

  it("should add a user", async () => {
    const newUser = await userModel.create(userBase);
    user = newUser;
    expect(newUser).toBeDefined();
  });

  it("should return a list of users", async () => {
    const users = await userModel.getAll();
    expect(users).toBeDefined();
  });

  it("should update the user", async () => {
    const updatedUser = await userModel.update(user!.id, {
      username: "paul",
      password: "123",
      firstname: "Paul",
      lastname: "Lee",
    });
    expect(updatedUser).toBeDefined();
  });

  it("should delete a user", async () => {
    if (!user) {
      throw new Error("User is not defined");
    }
    const deletedUser = await userModel.delete(user.id);
    expect(deletedUser).toBeDefined();
  });
});
