import fs, { constants } from "fs/promises";
import path from "path";

export const PATH = "./src/data/products.json";

export const ensureExistFile = async () => {
  try {
    await fs.access(PATH, constants.F_OK);
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.writeFile(PATH, "[]");
    } else {
      throw error;
    }
  }
};

export const readFile = async () => {
  try {
    const fielContent = await fs.readFile(PATH, "utf-8");
    return JSON.parse(fielContent);
  } catch (error) {
    return [];
  }
};

export const writeFile = async (products) => {
  await fs.writeFile(PATH, JSON.stringify(products, null, 2));
};

export const updateProduct = async (i, product, products) => {
  if (i !== -1) {
    products[i].title = product.title || products[i].title;
    products[i].description = product.description || products[i].description;
    products[i].price = product.price || products[i].price;
    products[i].code = product.code || products[i].code;
    products[i].stock = product.stock || products[i].stock;

    return await products;
  } else {
    console.log("Product not found");
  }
};
