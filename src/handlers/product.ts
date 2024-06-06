import { ProductModel } from "@/models";
import express, { Request, Response } from "express";

const productModel = new ProductModel();

const getAllProducts = async (_: Request, res: Response) => {
  try {
    const products = await productModel.getAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    if (!id) res.status(400).json({ message: "Invalid id" });
    const product = await productModel.get(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await productModel.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    if (!id) res.status(400).json({ message: "Invalid id" });

    const name = req.body.name as unknown as string;
    const price = req.body.price as unknown as number;
    const category = req.body.category as unknown as string;
    if (!name || !price || !category)
      res.status(400).json({ message: "Invalid data" });

    const product = await productModel.update(id, {
      name,
      price,
      category,
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {}
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    if (!id) res.status(400).json({ message: "Invalid id" });
    const product = await productModel.delete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json(error);
  }
};

const productRoute = (app: express.Application) => {
  app.get("/products", getAllProducts);
  app.get("/products/:id", getProduct);
  app.post("/products", createProduct);
  app.put("/products/:id", updateProduct);
  app.delete("/products/:id", deleteProduct);
};

export { productRoute };
