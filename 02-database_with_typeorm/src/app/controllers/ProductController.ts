import { Request, Response } from "express";

import { Product } from "../entities/Product";

class ProductController {
  async store(req: Request, res: Response) {
    const { name, price, productCategoryId } = req.body;

    const product = new Product();

    product.name = name;
    product.price = price;
    product.productCategoryId = productCategoryId;

    await product.save();

    return res.status(201).json(product);
  }

  async index(req: Request, res: Response) {
    const products = await Product.find();

    return res.json(products);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const product = await Product.findOne({
      where: { id },
      relations: ["productCategory"],
    });

    return res.json(product);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, price, productCategoryId } = req.body;

    const product = await Product.findOne(id);

    product.name = name ?? product.name;
    product.price = price ?? product.price;
    product.productCategoryId = productCategoryId ?? product.productCategoryId;

    await product.save();

    return res.json(product);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const product = await Product.findOne(id);

    await product.remove();

    return res.status(200);
  }
}

export default new ProductController();
