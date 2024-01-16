import fs, { constants } from "fs/promises";

export const PATH = "./src/data/cars.json";

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
    const fileContent = await fs.readFile(PATH, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    return [];
  }
};

export const writeFile = async (cars) => {
  await fs.writeFile(PATH, JSON.stringify(cars, null, 2));
};
