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

      res.sendStatus(201);
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
    } finally {
      await BaseDatabase.desconnectDB()
    }
  }

  async getProductById(req: Request, res: Response) {
    try {
      const {
        id
      } = req.params;

      const result = await ProductController.ProductBusiness.getProduct(id);

      res.status(200).send({product: result});
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
    } finally {
      await BaseDatabase.desconnectDB()
    }
  }
}