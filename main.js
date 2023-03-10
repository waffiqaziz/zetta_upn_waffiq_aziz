const prompt = require("prompt-sync")({ sigint: true });

function countDiscount(price, percent) {
  percent /= 100; // division assignment
  return (price -= price * percent); // subtraction assignment
}

function countTax(price, tax) {
  return (price *= 1 + tax / 100); // multiplication assignment
}

function main(
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

  for (let i = 0; i < stock; i++) {
    tempPrice += countDiscount(price, discount); // addition assignment
    amountOfPurchased += 1
    
    console.clear();
    console.log(`===============================================`);
    console.log(`====================PEMBELIAN==================`);
    console.log(`===============================================`);
    console.log(`Judul\t\t\t: ${title}`);
    console.log(`Penulis\t\t\t: ${writer}`);
    console.log(`Edisi\t\t\t: ${edition}`);
    console.log(`Harga\t\t\t: ${price}`);
    console.log(`Stok Awal\t\t: ${stock - i}`);
    console.log(`ISBN\t\t\t: ${isbn}`);
    console.log(`Penerbit\t\t: ${publisher}`);
    console.log(`Diskon\t\t\t: ${discount}% (-${(price * discount) / 100})`);
    console.log(`Harga Setelah Diskon\t: ${countDiscount(price, discount)}\n`);
    
    console.log(`Jumlah Yg Akan Dibeli\t: ${amountOfPurchased}`);
    console.log(`Total Harga\t\t: ${tempPrice}\n`);
    console.log(`PPN\t\t\t: ${tax}% (+${(tempPrice * tax) / 100})`);
    console.log(`Total Harga + PPN\t: Rp. ${countTax(tempPrice, tax)},00-\n`);
    console.log(`*Stok Sekarang\t: ${stock - (i+1)}\n`);
    
    if (amountOfPurchased < 3) {
      inputUser = prompt(`Tambah 1 lagi? (y/n) `);
      if (inputUser == "n" || inputUser == "N") {
        break;
      } else if (inputUser == "y" || inputUser == "Y") {
      } else {
        console.log(`Input salah`);
        break
      }
    } else {
      console.log(`Maaf Tidak Dapat Menambah Pembelian\nStok Tidak Tersedia`);
    }
  }
}

main(
  "Lost In The Jungle",
  "Yossi Ghinsberg",
  "1st",
  "978-602-00-1175",
  60000,
  "10",
  "Elex Media Komputindo",
  3,
  0
);
