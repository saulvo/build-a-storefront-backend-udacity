import { verifyToken } from "@/helper";
import { OrderModel } from "@/models";
import { OrderProduct } from "@/types";
import express, { Request, Response } from "express";

const orderModel = new OrderModel();
const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await orderModel.getAll();
    res.json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
};
const createOrder = async (req: Request, res: Response) => {
  try {
    const products = req.body.products as unknown as OrderProduct[];
    const status = req.body.status as unknown as boolean;
    const user_id = req.body.user_id as unknown as number;
    if (!products || !status || !user_id) {
      res.status(400).json({ message: "Invalid body" });
      return;
    }

    const order = await orderModel.create({ products, status, user_id });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) res.status(400).json({ message: "Invalid id" });

    const order = await orderModel.get(id);
    res.json(order);
  } catch (error) {
    res.status(500).json(error);
  }
};
const updateOrder = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    const products = req.body.products as unknown as OrderProduct[];
    const status = req.body.status as unknown as boolean;
    const user_id = req.body.user_id as unknown as number;
    if (!products || !status || !user_id) {
      res.status(400).json({ message: "Invalid body" });
    }
    const order = await orderModel.update(id, req.body);
    res.json(order);
  } catch (error) {
    res.status(500).json(error);
  }
};
const deleteOrder = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    if (!id) res.status(400).json({ message: "Invalid id" });
    const order = await orderModel.delete(id);
    res.json(order);
  } catch (error) {
    res.status(500).json(error);
  }
};

const orderRouter = (app: express.Application) => {
  app.get("/orders", getOrders);
  app.post("/orders", verifyToken, createOrder);
  app.get("/orders/:id", verifyToken, getOrder);
  app.put("/orders/:id", verifyToken, updateOrder);
  app.delete("/orders/:id", verifyToken, deleteOrder);
};

export { orderRouter };
