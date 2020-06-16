import { Request, Response } from "express";
import { ProductBusiness } from "../business/ProductBusiness";
import { ProductDatabase } from "../data/ProductDatabase";
import { IdManager } from "../services/IdManager";
import { BaseDatabase } from "../data/BaseDatabase";

export class ProductController {
  private static ProductBusiness = new ProductBusiness(
    new ProductDatabase(),
    new IdManager()
  )

  async createProduct(req: Request, res: Response) {
    try {
      const {
        name,
        price,
        imageLink,
      } = req.body;

      await ProductController.ProductBusiness.createProduct(
        name,
        price,
        imageLink,
      );

      await BaseDatabase.desconnectDB()
      res.sendStatus(201);
    } catch (err) {
      console.log(err)
      await BaseDatabase.desconnectDB()
      res.status(err.errorCode || 400).send({ message: err.message });
    }
  }

  async getProductById(req: Request, res: Response) {
    try {
      const {
        id
      } = req.params;

      const result = await ProductController.ProductBusiness.getProduct(id);

      await BaseDatabase.desconnectDB()
      res.status(200).send({ product: result });
    } catch (err) {
      await BaseDatabase.desconnectDB()
      console.log(err)
      res.status(err.errorCode || 400).send({ message: err.message });
    }
  }
}