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
  filterBookShelfCollection,
  filterArrayBookShelfCollection,
  listGenreBookShelfCollection,
  listGenreEachBook,
  listGenreEachBookUnwind,
  sortOfBookTitle,
  sortOfBookTitleLookup,
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

// filtering with elemMatch genre and title book for bookshelf collection 
router.get("/bookPurchasing/bookShelf/filter/", isAuth, filterBookShelfCollection);

// update writer of book collection based on genre of book using filterArray
router.put("/bookPurchasing/bookShelf/filter/", isAuth, filterArrayBookShelfCollection);

// get list genre of book
router.get("/bookPurchasing/bookShelf/listGenre/", isAuth, listGenreBookShelfCollection);

// list genre each book using projection and totalBook using addField
router.get("/bookPurchasing/bookShelf/genreEachBook/", isAuth, listGenreEachBook);

// list book including title and list of genre with projection, totalGenre using addField and split using unwind
router.get("/bookPurchasing/bookShelf/splitGenreEachBook/", isAuth, listGenreEachBookUnwind);

// list of books sorted by title, with genre according to parameters, displaying genre totals, 
// and column publisher-author using concat
router.get("/bookPurchasing/bookShelf/sortOfBookTitle/", isAuth, sortOfBookTitle);

// Same as above sortOfBookTitle with addion data from books collection
router.get("/bookPurchasing/bookShelf/sortOfBookTitleLookup/", isAuth, sortOfBookTitleLookup);
export default router;