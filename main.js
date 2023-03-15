const prompt = require("prompt-sync")({ sigint: true });

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
  amountOfPurchased
) {
  let inputUser;
  const tax = 5;
  let tempPrice = 0;

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
  console.log(`Harga Setelah Diskon\t: ${countDiscount(price, 1, discount)}\n`);
  console.log(`===============================================`);

  for (let i = 0; i < 100; i++) {
    inputUser = parseInt(prompt(`Jumlah Stok yang Akan Dibeli : `));
    if (inputUser > stock) {
      console.log(`Stok tidak cukup ${inputUser}`);
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

    if (amountOfPurchased >= stock) {
      console.log(`Maaf Tidak Dapat Menambah Pembelian\nStok Tidak Tersedia`);
      break;
    } else {
      inputUser = prompt(`Beli lagi? (y/n) `);

      // check input user if match/not
      if (inputUser == "n" || inputUser == "N") {
        break;
      } else if (inputUser == "y" || inputUser == "Y") {
        continue;
      } else {
        console.log(`Input salah`);
        break;
      }
    }
  }
}

function main() {
  console.clear();
  const stock = prompt(`Jumlah Stok Awal = `);

  bookPurchasing(
    "Lost In The Jungle",
    "Yossi Ghinsberg",
    "1st",
    "978-602-00-1175",
    60000,
    "10",
    "Elex Media Komputindo",
    stock,
    null
  );
}

main();
