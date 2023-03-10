function countDiscount(price, percent) {
  percent /= 100; // division assignment
  return (price -= price * percent); // subtraction assignment
}

function countTax(price, tax) {
  return (price *= 1 + tax / 100); // multiplication assignment
}

function showData(
  title = "Lost In The Jungle",
  writer = "Yossi Ghinsberg",
  edition = "1st",
  isbn = "978-602-00-1175",
  price = 60000,
  discount = "10",
  publisher = "Elex Media Komputindo"
) {
  const tax = 5;
  var tempPrice = 0
  tempPrice += countDiscount(price, discount); // addition assignment

  console.clear()
  console.log(`Judul\t\t\t: ${title}`);
  console.log(`Penulis\t\t\t: ${writer}`);
  console.log(`Edisi\t\t\t: ${edition}`);
  console.log(`Harga\t\t\t: ${price}`);
  console.log(`ISBN\t\t\t: ${isbn}`);
  console.log(`Penerbit\t\t: ${publisher}\n`);
  console.log(`Diskon\t\t\t: ${discount}% (-${price * discount / 100})`);
  console.log(`Harga Setelah Diskon\t: ${tempPrice}\n`);
  console.log(`Harga Sebelum PPN\t: ${tempPrice}`);
  console.log(`PPN\t\t\t: ${tax}% (+${tempPrice * tax / 100})`);
  console.log(`Harga Akhir\t\t: ${countTax(tempPrice, tax)}`);
}

showData()