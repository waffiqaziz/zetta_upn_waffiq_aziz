export const countTax = (price, tax) => {
  return (price *= 1 + tax / 100); // multiplication assignment
};

export const countCredit = async function (
  taxPrice,
  termOfCredit,
  additionalPrice
) {
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
};

export const countDiscount = (price, piece, percent) => {
  percent /= 100; // division assignment
  price -= price * percent; // subtraction assignment
  return price * piece;
};

export const isAuth = function (req, res, next) {
  const auth = req.headers.authorization;
  if (auth === "your_password") {
    next();
  } else {
    res.status(401);
    res.send("Access forbidden");
  }
};
