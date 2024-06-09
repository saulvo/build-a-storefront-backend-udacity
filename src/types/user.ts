export interface IUserBase {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
}
export interface IUser extends IUserBase {
  id: number;
}
