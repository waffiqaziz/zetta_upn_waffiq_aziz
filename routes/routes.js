import { countTax, countCredit, countDiscount, isAuth } from "../utlis.js";

import {
  readFileWithoutAwait,
  readFileWithAwait,
} from "../controllers/ReadFile.js";

import fs from "fs/promises";
import { log } from "console";

// init express router
import express from "express";
const router = express.Router();

// schema
import Books from "../schema/Books.model.js";
import BookShelf from "../schema/BookShelf.model.js";

// calculate total price and save it inside MongoDB
router.post("/bookPurchasing/purchase", isAuth, async (req, res) => {
  let bookDetails = req.body.bookDetails;
  let termOfCredit = req.body.termOfCredit;
  let purchasedAmount = req.body.purchasedAmount;
  let additionalPrice = req.body.additionalPrice;

  const tax = 5;
  let originPrice = 0;
  let discountPrice = 0;
  let taxPrice = 0;
  let totalPrice = 0;

  // check data is null/not
  if (!bookDetails.title) {
    return res.status(400).json({
      error: `Title is null`,
    });
  }
  if (!bookDetails.writer) {
    return res.status(400).json({
      error: `Writer is null`,
    });
  }
  if (!bookDetails.price) {
    return res.status(400).json({
      error: `Price is null`,
    });
  }
  if (!bookDetails.discount) {
    return res.status(400).json({
      error: `Discount is null`,
    });
  }
  if (!bookDetails.publisher) {
    return res.status(400).json({
      error: `Publisher is null`,
    });
  }
  if (!bookDetails.genre) {
    return res.status(400).json({
      error: `Genre is null`,
    });
  }
  if (!bookDetails.stock) {
    return res.status(400).json({
      error: `Stock is null`,
    });
  }
  if (!termOfCredit) {
    return res.status(400).json({
      error: `Term of Credit is null`,
    });
  }
  if (!purchasedAmount) {
    return res.status(400).json({
      error: `Purchased Amount is null`,
    });
  }
  if (!additionalPrice) {
    return res.status(400).json({
      error: `Additional Price is null`,
    });
  }

  // check if amount is higher that current stock
  if (purchasedAmount > bookDetails.stock) {
    return res.status(200).json({
      error: `Stok Tidak Cukup.`,
    });
  } else {
    // insert into book collection
    try {
      const book = await Books.insertMany({
        book: {
          title: bookDetails.title,
          writer: bookDetails.writer,
          publisher: bookDetails.publisher,
          genre: bookDetails.genre,
        },
        price: bookDetails.price,
        discount: bookDetails.discount,
        stock: bookDetails.stock,
      });
      log("Data has been added into Books Collection");
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: 1,
        message: err,
      });
    }

    // get Latest id from books collection
    var bookID = 0;
    try {
      bookID = await Books.findOne().sort({ field: "asc", _id: -1 });
      log("Inserted ID : " + bookID._id);
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: 1,
        message: err,
      });
    }

    // check if bookshelf already created or not
    let alreadyCreated = 0;
    try {
      alreadyCreated = await BookShelf.find().limit(1).size();
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: 1,
        message: err,
      });
    }

    // insert ID into bookshelf collection
    if (alreadyCreated == 1) {
      // already created
      try {
        const bookShelf = await BookShelf.updateOne(
          { _id: bookID._id },
          { $addToSet: { idBook: bookID._id } }
        );
      } catch (err) {
        console.log(err);
        return res.status(500).json({
          error: 1,
          message: err,
        });
      }
    } else {
      // not yet created
      try {
        const bookShelf = await BookShelf.insertMany({
          idBook: bookID._id,
          books: bookDetails,
        });
      } catch (err) {
        console.log(err);
        return res.status(500).json({
          error: 1,
          message: err,
        });
      }
    }

    // calculate total price
    originPrice = bookDetails.price * purchasedAmount;
    discountPrice = countDiscount(
      bookDetails.price,
      purchasedAmount,
      bookDetails.discount
    );
    taxPrice = countTax(discountPrice, tax);
    creditPayment = await countCredit(taxPrice, termOfCredit, additionalPrice);
    totalPrice = taxPrice + additionalPrice * termOfCredit;
    bookDetails = {
      title: bookDetails.title,
      writer: bookDetails.writer,
      publisher: bookDetails.publisher,
      genre: bookDetails.genre,
      price: bookDetails.price,
      discountPercent: bookDetails.discount,
      remainStock: bookDetails.stock - purchasedAmount,
    };
  }

  // save into object
  objData = {
    bookDetails: bookDetails,
    purchasedAmount: purchasedAmount,
    totalOriginPrice: originPrice,
    totalPriceAfterDiscount: discountPrice,
    taxPercent: tax,
    totalPriceAfterTax: taxPrice,
    termOfCredit: termOfCredit,
    additionalPrice: additionalPrice,
    totalAdditionalPrice: additionalPrice * purchasedAmount,
    totalPrice: totalPrice,
    creditPayment: creditPayment,
  };

  // set
  let setBooks = new Set();
  setBooks.add([bookDetails]);
  for (let i = 1; i < 10; i++) {
    setBooks.add("Buku" + i);
  }

  // map
  let mapBooks = new Map();
  mapBooks.set("book1", bookDetails.title);
  for (let i = 2; i < 10; i++) {
    mapBooks.set("book" + i, "Buku Siswa " + 1);
  }

  // overwrite object into file text.txt
  await fs.writeFile(`text.txt`, JSON.stringify(objData));

  // response success
  return res.status(200).json({
    error: 0,
    message: "Data has been added",
    object: objData,
    setBooks: Array.from(setBooks),
    mapBooks: Array.from(mapBooks.values()),
  });
});

router.get("/bookPurchasing/readFileWithoutAwait", isAuth, readFileWithoutAwait);

router.get("/bookPurchasing/readFileWithAwait", isAuth, readFileWithAwait);

router.get("/bookPurchasing/readDataFromMongoDB", isAuth, async (req, res) => {
  try {
    const book = await Books.find({});
    if (book.length == 0) {
      res.send({
        error: 0,
        message: "No Data",
      });
    } else {
      res.send({
        error: 0,
        book: book,
      });
    }
    console.log(book);
  } catch (err) {
    console.log(err);
  }
});

// insert into books collection
router.post("/bookPurchasing/books", isAuth, async (req, res) => {
  let bookData = req.body;
  if (Array.isArray(bookData)) {
    // for arrray of book
    bookData.forEach(function (obj) {
      try {
        const book = Books.insertMany({
          book: {
            title: obj.book.title,
            writer: obj.book.writer,
            publisher: obj.book.publisher,
            genre: obj.book.genre,
          },
          price: obj.price,
          discount: obj.discount,
          stock: obj.stock,
        });
        log("Data book has been added to mongo");
      } catch (err) {
        console.log(err);
        return res.status(500).json({
          error: 1,
          message: err,
        });
      }
    });
    return res.status(200).json({
      error: 0,
      message: "Success Added",
    });
  } else {
    // single book
    bookData = req.body.book;
    const priceData = req.body.price;
    const discountData = req.body.discount;
    const stockData = req.body.stock;

    try {
      const book = await Books.insertMany({
        book: {
          title: bookData.title,
          writer: bookData.writer,
          publisher: bookData.publisher,
          genre: bookData.genre,
        },
        price: priceData,
        discount: discountData,
        stock: stockData,
      });
      log("Data has been added to mongo");
      return res.status(200).json({
        error: 0,
        message: "Success Added",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: 1,
        message: err,
      });
    }
  }
});

// find array list BookID from BookShelf by ID
router.get("/bookPurchasing/bookShelf/", isAuth, async (req, res) => {
  var id = req.query.idBook;
  try {
    const bookShelf = await BookShelf.find({
      idBook: new mongoose.mongo.ObjectId(id),
    });
    if (bookShelf.length == 0) {
      res.send({
        error: 0,
        message: "No Data",
      });
    } else {
      res.send({
        error: 0,
        bookShelf: bookShelf,
      });
    }
    console.log(book);
  } catch (err) {
    console.log(err);
  }
});

// export default router
export default router;
