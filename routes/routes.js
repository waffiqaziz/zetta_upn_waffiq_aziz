import { isAuth } from "../utlis.js";

import {
  readFileWithoutAwait,
  readFileWithAwait,
} from "../controllers/ReadFile.js";

import {
  insertBookCollection,
  readBookCollection,
  insertBookShelfCollection,
  readBookShelfCollection,
  updateBookShelfCollection,
  deleteBookShelfCollection,
  bookPurchase,
  filterBookShelfID,
} from "../controllers/MongoDB.js";

// init express router
import express from "express";
const router = express.Router();

// calculate total price and save it inside MongoDB
router.post("/bookPurchasing/purchase", isAuth, bookPurchase);

// read file
router.get(
  "/bookPurchasing/readFileWithoutAwait",
  isAuth,
  readFileWithoutAwait
);
router.get("/bookPurchasing/readFileWithAwait", isAuth, readFileWithAwait);

// mongodb CRUD
router.post("/bookPurchasing/books", isAuth, insertBookCollection);
router.get("/bookPurchasing/books", isAuth, readBookCollection);

router.post("/bookPurchasing/bookShelf/", isAuth, insertBookShelfCollection);
router.get("/bookPurchasing/bookShelf", isAuth, readBookShelfCollection);
router.put("/bookPurchasing/bookShelf/", isAuth, updateBookShelfCollection);
router.delete("/bookPurchasing/bookShelf/", isAuth, deleteBookShelfCollection);

// find array list BookID from BookShelf by ID
router.get("/bookPurchasing/bookShelf/", isAuth, filterBookShelfID);

export default router;