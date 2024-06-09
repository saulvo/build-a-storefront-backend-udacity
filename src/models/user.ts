import db from "@/database";
import { IUser, IUserBase } from "@/types";
import bcrypt from "bcrypt";

export class UserModel {
  async getAll(): Promise<IUser[]> {
    {
      try {
        const connect = await db.connect();
        const sqlQuery = "SELECT id, firstname, lastname, username FROM users";
        const result = await connect.query(sqlQuery);
        connect.release();
        return result.rows;
      } catch (error) {
        throw new Error("Cannot get any user");
      }
    }
  }
  async get(id: number): Promise<IUser> {
    try {
      const connect = await db.connect();
      const sqlQuery = `SELECT id, firstname, lastname, username FROM users where id = ($1)`;
      const result = await connect.query(sqlQuery, [id]);
      connect.release();
      return result.rows[0];
    } catch (error) {
      throw new Error("Cannot find current user");
    }
  }
  async create(user: IUserBase): Promise<IUser> {
    const { firstname, lastname, username, password } = user;

    try {
      const sql =
        "INSERT INTO users (firstname, lastname, username, password) VALUES($1, $2, $3, $4) RETURNING id, firstname, lastname, username";
      const hash = bcrypt.hashSync(password, 10);
      const connection = await db.connect();
      const { rows } = await connection.query(sql, [
        firstname,
        lastname,
        username,
        hash,
      ]);

      connection.release();

      return rows[0];
    } catch (error) {
      console.log(error);
      throw new Error("Cannot create new user");
    }
  }
  async update(id: number, user: IUser): Promise<IUser> {
    try {
      const sqlQuery =
        "UPDATE users SET firstname = $1, lastname = $2, username = $3, password = $4 WHERE id = $5 RETURNING *";
      const connect = await db.connect();
      const result = await connect.query(sqlQuery, [
        user.firstname,
        user.lastname,
        user.username,
        user.password,
        id,
      ]);
      connect.release();
      return result.rows[0];
    } catch (error) {
      throw new Error("Cannot update user");
    }
  }
  async delete(id: number): Promise<IUser> {
    try {
      const sqlQuery = "DELETE FROM users WHERE id = $1 RETURNING *";
      const connect = await db.connect();
      const result = await connect.query(sqlQuery, [id]);
      connect.release();
      return result.rows[0];
    } catch (error) {
      throw new Error("Cannot delete user");
    }
  }
  async authentication(username: string, password: string): Promise<IUser> {
    try {
      const connect = await db.connect();
      const sqlQuery = `SELECT * FROM users where username = ($1)`;
      const result = await connect.query(sqlQuery, [username]);
      connect.release();
      if (result.rows.length === 0) {
        throw new Error("Cannot found current user");
      }
      const user = result.rows[0];
      const isPasswordMatch = bcrypt.compareSync(password, user.password);
      if (!isPasswordMatch) {
        throw new Error("Password is incorrect");
      }
      return user;
    } catch (error) {
      throw new Error("Cannot found current user");
    }
  }
}
