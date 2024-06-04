export interface IUserCreate {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
}
export interface IUser extends IUserCreate {
  id: number;
}
