import fs from "fs/promises";
import * as fsSync from 'fs';

export const readFileWithoutAwait = (req, res) => {
  try {
    let data = fsSync.readFileSync("text.txt", { encoding: "utf8" });
    data = JSON.parse(data);
    console.log(data);
    return res.status(200).json({
      error: 0,
      data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const readFileWithAwait = async (req, res) => {
  try {
    let data = await fs.readFile("text.txt", { encoding: "utf8" });
    data = JSON.parse(data);
    console.log(data);
    return res.status(200).json({
      error: 0,
      data,
    });
  } catch (err) {
    console.log(err);
  }
};
