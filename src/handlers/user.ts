import { getTokenByUser, verifyToken } from '@/helper';
import { UserModel } from '@/models';
import express, { Request, Response } from 'express';

const userModel = new UserModel();

const createUser = async (req: Request, res: Response) => {
  try {
    const user = await userModel.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const getUsers = await userModel.get(id);
    res.json(getUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const listUsers = await userModel.getAll();
    res.json(listUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userModel.update(id, req.body);
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userModel.delete(id);
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.authentication(username, password);
    const token = getTokenByUser(user);
    const { firstname, lastname } = user;
    res.status(200).json({ username, firstname, lastname, token });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const userRoute = (app: express.Application) => {
  app.get('/users', verifyToken, getAllUsers);
  app.get('/users/:id', verifyToken, getUser);
  app.put('/users/:id', verifyToken, updateUser);
  app.delete('/users/:id', verifyToken, deleteUser);
  app.post('/users', createUser);
  app.post('/login', login);
};

export { userRoute };
