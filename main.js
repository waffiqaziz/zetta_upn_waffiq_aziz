const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/bookPurchased", (req, res) => {
  res.json({
    message: "Still Under Development",
  });
});

app.post("/bookPurchasing", isAuth, (req, res) => {
  const title = req.body.title;
  const writer = req.body.writer;
  const edition = req.body.edition;
  const isbn = req.body.isbn;
  const price = req.body.price;
  const discount = req.body.discount;
  const publisher = req.body.publisher;
  const stock = req.body.stock;
  const termOfCredit = req.body.termOfCredit;

  if (!title) {
    return res.sendStatus(400);
  }
  if (!writer) {
    return res.sendStatus(400);
  }
  if (!edition) {
    return res.sendStatus(400);
  }
  if (!isbn) {
    return res.sendStatus(400);
  }
  if (!price) {
    return res.sendStatus(400);
  }
  if (!discount) {
    return res.sendStatus(400);
  }
  if (!publisher) {
    return res.sendStatus(400);
  }
  if (!stock) {
    return res.sendStatus(400);
  }
  if (!termOfCredit) {
    return res.sendStatus(400);
  }

  console.log(title);
  res.status(201).json({
    message: "Purchasing Successful",
    price: bookPurchasing(
      title,
      writer,
      edition,
      isbn,
      price,
      discount,
      publisher,
      stock,
      termOfCredit
    )
  }
  );
});


app.listen(3000, () => console.log("Api Server is running..."));

function isAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (auth === 'your_password') {
    next();
  } else {
    res.status(401);
    res.send('Access forbidden');
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

function bookPurchasing(
  title,
  writer,
  edition,
  isbn,
  price,
  discount,
  publisher,
  stock,
  termOfCredit
) {
  let inputUser = 0;
  const tax = 5;
  let tempPrice = 0;
  let amountOfPurchased = 0;

  console.clear();
  console.log(`===============================================`);
  console.log(`====================PEMBELIAN==================`);
  console.log(`===============================================`);
  console.log(`Judul\t\t\t: ${title}`);
  console.log(`Penulis\t\t\t: ${writer}`);
  console.log(`Edisi\t\t\t: ${edition}`);
  console.log(`Harga\t\t\t: ${price}`);
  console.log(`Stok\t\t\t: ${stock}`);
  console.log(`ISBN\t\t\t: ${isbn}`);
  console.log(`Penerbit\t\t: ${publisher}`);
  console.log(`Diskon\t\t\t: ${discount}% (-${(price * discount) / 100})`);
  console.log(`Harga Setelah Diskon\t: ${countDiscount(price, 1, discount)}`);
  console.log(`===============================================\n`);

  for (let i = 0; i < 100; i++) {
    inputUser = Math.floor(Math.random() * 10) + 1;
    console.log(`Jumlah Stok yang Akan Dibeli : ${inputUser}`);
    if (inputUser > stock) {
      console.log(`Stok tidak cukup`);
      continue;
    } else {
      stock -= inputUser; // subtraction assignment
      amountOfPurchased += inputUser; // addition assignment
      tempPrice += countDiscount(price, inputUser, discount); // addition assignment
    }

    // show summary
    console.log(`Jumlah Sudah Dibeli\t: ${amountOfPurchased}`);
    console.log(`Total Harga\t\t: ${tempPrice}\n`);
    console.log(`PPN\t\t\t: ${tax}% (+${(tempPrice * tax) / 100})`);
    console.log(`Total Harga + PPN\t: Rp. ${countTax(tempPrice, tax)},00-\n`);
    console.log(`*Stok Sekarang\t: ${stock}\n`);
    console.log(`===============================================`);

    if (stock <= 0) {
      console.log(`Maaf Tidak Dapat Menambah Pembelian\nStok Tidak Tersedia\n`);
      break;
    }
  }

  // term of credit
  let arrMonth = [];
  let arrCredit = [];
  for (var i = 0; i < termOfCredit; i++) {
    arrMonth.push(`Bulan ke-${i + 1}`);
    arrCredit.push(countTax(tempPrice, tax) / termOfCredit);
  }

  let objCredit = [];
  for (var i = 0; i < termOfCredit; i++) {
    objCredit.push({ month: arrMonth[i], credit: arrCredit[i] });
  }

  const sumCredit = arrCredit.reduce(
    (accumulator, currentValue) => accumulator + currentValue
  );

  // show term of credit
  for (var i = 0; i < termOfCredit; i++) {
    console.log(`${objCredit[i].month}\t: ${objCredit[i].credit}`);
  }
  console.log(`Total\t\t: ${sumCredit}`);

  return countTax(tempPrice,tax);
}
