import { Request, Response } from "express";
import product from "../db/product";

const getAll = (req: Request, res: Response) => {
  product
    .selectAll() //--db/product.ts
    .then((products) => {
      // .then for async call
      res.status(200).send({
        message: "OK",
        result: products,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: "DATABASE ERROR",
        error: err.code,
      });
    });
};
export default { getAll };