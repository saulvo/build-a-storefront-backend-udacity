import { IUserBase } from "@/types";
import supertest from "supertest";
import app from "../../server";

const request = supertest(app);

describe("User Handler", () => {
  let userBase: IUserBase = {
    username: "saul",
    password: "123",
    firstname: "Saul",
    lastname: "Vo",
  };
  let userId: number | undefined;
  let userToken: string | undefined;

  it("should get the create endpoint", async (done) => {
    const res = await request.post("/users").send(userBase);
    expect(res.status).toBe(200);
    done();
  });

  it("should get the login endpoint", async (done) => {
    const res = await request.post("/login").send({
      username: userBase.username,
      password: userBase.password,
    });

    const { token, id } = res.body;
    userId = id;
    userToken = token;
    expect(res.status).toBe(200);
    done();
  });

  it("should get the read endpoint", async (done) => {
    const res = await request
      .get(`/users/${userId}`)
      .set("Authorization", `Bearer ${userToken}`);
    expect(res.status).toBe(200);
    done();
  });

  it("should get the list endpoint", async (done) => {
    const res = await request
      .get("/users")
      .set("Authorization", `Bearer ${userToken}`);
    expect(res.status).toBe(200);
    done();
  });

  it("should get the update endpoint", async (done) => {
    const res = await request
      .put(`/users/${userId}`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        username: "paul",
        password: "123",
        firstname: "Paul",
        lastname: "Lee",
      });
    expect(res.status).toBe(200);
    done();
  });

  it("should get the delete endpoint", async (done) => {
    const res = await request
      .delete(`/users/${userId}`)
      .set("Authorization", `Bearer ${userToken}`);
    expect(res.status).toBe(200);
    done();
  });
});
