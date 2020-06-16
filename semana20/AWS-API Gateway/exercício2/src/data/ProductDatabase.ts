import { BaseDatabase } from "./BaseDatabase";
import { Product } from "../model/Product";

export class ProductDatabase extends BaseDatabase {
  public static TABLE_NAME: string = 'Product'

  private toModel(dbModel?: any): Product | undefined {
    return (
      dbModel &&
      new Product(
        dbModel.id,
        dbModel.name,
        dbModel.price,
        dbModel.image_link,
      )
    )
  }

  public async create(product: Product): Promise<void> {
    await this.setConnection()
      .insert({
        id: product.getId(),
        name: product.getName(),
        price: product.getPrice(),
        image_link: product.getImageLink()
      })
      .into(ProductDatabase.TABLE_NAME)
  }

  public async getProductById(id: string): Promise<Product | undefined> {
    const result = await this.setConnection()
      .select("*")
      .from(ProductDatabase.TABLE_NAME)
      .where({ id })

    return this.toModel(result[0])
  }
}