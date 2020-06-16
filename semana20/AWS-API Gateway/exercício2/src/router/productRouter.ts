import express from "express";
import { ProductController } from "../controller/ProductController";

export const productRouter = express.Router()

const product = new ProductController()

productRouter.post('/create', product.createProduct)
productRouter.get('/:id', product.getProductById)