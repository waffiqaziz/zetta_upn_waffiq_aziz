const express = require("express");
// const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(express.json());
// app.use(bodyParser.json());
app.use(cors());

app.post("/bookPurchasing", isAuth, (req, res) => {
  let bookDetails = req.body.bookDetails;
  let termOfCredit = req.body.termOfCredit;
  let purchasedAmount = req.body.purchasedAmount;

  const tax = 5;
  let originPrice = 0;
  let discountPrice = 0;
  let taxPrice = 0;

  // check data
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

  if (purchasedAmount > bookDetails.stock) {
    return res.status(400).json({
      error: `Stok Tidak Cukup.`,
    });
  } else {
    originPrice += bookDetails.price * purchasedAmount;
    discountPrice += countDiscount(
      bookDetails.price,
      purchasedAmount,
      bookDetails.discount
    ); // addition assignment
    taxPrice += countTax(discountPrice, tax);
  }

  // term of credit
  let arrMonth = [];
  let arrCredit = [];
  for (var i = 0; i < termOfCredit; i++) {
    arrMonth.push(`Bulan ke-${i + 1}`);
    arrCredit.push(taxPrice / termOfCredit);
  }

  let objCredit = [];
  let remainingBalance = taxPrice;
  for (var i = 0; i < termOfCredit; i++) {
  remainingBalance -= arrCredit[i]

    objCredit.push({
      month: arrMonth[i],
      credit: arrCredit[i],
      remainingBalance : remainingBalance
    });
  }

  const sumCredit = arrCredit.reduce(
    (accumulator, currentValue) => accumulator + currentValue
  );

  // show term of credit
  for (var i = 0; i < termOfCredit; i++) {
    console.log(`${objCredit[i].month}\t: ${objCredit[i].credit}`);
  }
  console.log(`Total\t\t: ${sumCredit}`);

  return res.json({
    bookDetails: {
      title: bookDetails.title,
      writer: bookDetails.writer,
      publisher: bookDetails.publisher,
      price: bookDetails.price,
      discountPercent: bookDetails.discount,
      remainStock: bookDetails.stock - purchasedAmount,
    },
    purchasedAmount: purchasedAmount,
    totalOriginPrice: originPrice,
    totalDiscountPrice: discountPrice,
    taxPercent: tax,
    totalPrice: taxPrice,
    creditPayment: objCredit,
  });
});

app.listen(3000, () => console.log("Api Server is running..."));

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
