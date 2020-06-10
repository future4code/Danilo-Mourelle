import { ProductDatabase } from "../data/ProductDatabase";
import { IdManager } from "../services/IdManager";
import { Product } from "../model/Product";

export class ProductBusiness {
  constructor(
    private productDatabase: ProductDatabase,
    private idManager: IdManager
  ) { }

  public async createProduct(name: string, price: string, imageLink: string): Promise<void> {
    if (!name || !price || isNaN(Number(price)) || !imageLink) {
      throw new Error('Missing Input')
    }

    const id = this.idManager.generateId()

    await this.productDatabase.create(
      new Product(
        id,
        name,
        Number(price),
        imageLink
      )
    )
  }

  public async getProduct(id: string): Promise<Product | undefined> {
    if (!id) {
      throw new Error('Missing Input')
    }

    const result = await this.productDatabase.getProductById(id)
    return result
  }
}