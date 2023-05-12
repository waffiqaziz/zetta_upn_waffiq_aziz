const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const fs = require('fs/promises');
const { log } = require("console");
const mongoose = require(`mongoose`);
const Books = require(`./Books.model`);

const PORT = 3000;

const dbName = `local`;
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/" + dbName);

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// calculate total price and save it inside MongoDB 
app.post("/bookPurchasing", isAuth, async (req, res) => {
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

    // insert into mongo
    try {
      const book = await Books.insertMany({
        bookDetails: {
          title: bookDetails.title,
          writer: bookDetails.writer,
          publisher: bookDetails.publisher,
          price: bookDetails.price,
          discount: bookDetails.discount,
          stock: bookDetails.stock
        },
        purchasedAmount : purchasedAmount,
        termOfCredit: termOfCredit,
        additionalPrice : additionalPrice
      });
      log("Data has been adden to mongo");
    } catch (err) {
      console.log(err);
    }

    originPrice = bookDetails.price * purchasedAmount;
    discountPrice = countDiscount(
      bookDetails.price,
      purchasedAmount,
      bookDetails.discount
    ); // addition assignment
    taxPrice = countTax(discountPrice, tax);
    creditPayment = await countCredit(taxPrice, termOfCredit, additionalPrice);
    totalPrice = taxPrice + additionalPrice * termOfCredit;
    bookDetails = {
      "title": bookDetails.title,
      "writer": bookDetails.writer,
      "publisher": bookDetails.publisher,
      "price": bookDetails.price,
      "discountPercent": bookDetails.discount,
      "remainStock": bookDetails.stock - purchasedAmount
    }
  }

  // save into object
  objData = { 
    "bookDetails" : bookDetails,
    "purchasedAmount": purchasedAmount,
    "totalOriginPrice": originPrice,
    "totalPriceAfterDiscount": discountPrice,
    "taxPercent": tax,
    "totalPriceAfterTax": taxPrice,
    "termOfCredit": termOfCredit,
    "additionalPrice" : additionalPrice,
    "totalAdditionalPrice": additionalPrice * purchasedAmount,
    "totalPrice": totalPrice,
    "creditPayment": creditPayment
  }; 

  // set
  let setBooks = new Set()
  setBooks.add([bookDetails])
  for(let i  = 1; i < 10; i++){
    setBooks.add("Buku" + i)
  }    
  log(setBooks)

  // map
  let mapBooks = new Map()
  mapBooks.set("book1", bookDetails.title)
  log("\nmap get value")
  for(let i  = 2; i < 10; i++){
    mapBooks.set("book"+i, "Buku Siswa " + 1)
    log(mapBooks.get("book"+i))
  }

  // write object into file text.txt
  await fs.writeFile(`text.txt`, JSON.stringify(objData));

  return res.status(200).json({
    object: objData,
    setBooks: Array.from(setBooks),
    mapBooks: Array.from(mapBooks.values())
  });
});

app.get("/readFileWithAwait", isAuth, async (req, res) => {
  try {
    let data = await fs.readFile('text.txt', { encoding: 'utf8' });
    data = JSON.parse(data)
    console.log(data)
    return res.status(200).json({
      data
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/readDataFromMongoDB", isAuth, async (req, res) => {
  const fs = require('fs');
  try {
    const book = await Books.find({});
    res.send(book);
    console.log(book);
  } catch (err) {
    console.log(err);
  }
});

app.get("/readFileWithoutAwait", isAuth, (req, res) => {
  const fs = require('fs');
  try {
    let data = fs.readFileSync('text.txt', { encoding: 'utf8' });
    data = JSON.parse(data)
    console.log(data);
    return res.status(200).json({
      data
    });
  } catch (err) {
    console.error(err);
  }
 
});

app.listen(PORT, () => console.log("Api Server is running on port" + PORT));

function isAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (auth === "your_password") {
    next();
  } else {
    res.status(401);
    res.send("Access forbidden");
  }
}

function countDiscount(price, piece, percent) {
  percent /= 100; // division assignment
  price -= price * percent; // subtraction assignment
  return price * piece;
}

function countTax(price, tax) {
  return (price *= 1 + tax / 100); // multiplication assignment
}

async function countCredit(taxPrice, termOfCredit, additionalPrice) {
  let arrMonth = [];
  let arrCredit = [];
  let arrAdditional = [];
  let arrCreditPlusAdditional = [];
  for (var i = 0; i < termOfCredit; i++) {
    arrMonth.push(i + 1);
    arrCredit.push(taxPrice / termOfCredit);
    arrAdditional.push(additionalPrice);
    arrCreditPlusAdditional.push(arrCredit[i] + additionalPrice);
  }

  let objCredit = [];
  let remainingBalance = taxPrice;
  for (var i = 0; i < termOfCredit; i++) {
    remainingBalance -= arrCredit[i];

    await objCredit.push({
      month: arrMonth[i],
      credit: arrCredit[i],
      additional: arrAdditional[i],
      totalCreditMustPay: arrCreditPlusAdditional[i],
      remainingBalance: remainingBalance,
    });
  }

  const sumCredit = arrCredit.reduce(
    (accumulator, currentValue) => accumulator + currentValue
  );
  console.log(`Total\t\t: ${sumCredit}`);

  return objCredit;
}
