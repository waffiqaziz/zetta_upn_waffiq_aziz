# 1. Overview
This Branch is for educational use, learning about Node.js, MongoDB, and Mongoose.

# 2. Step by Step
Guide step to use this repo:
1. Make sure MongoDB is installed.
2. Clone repo `git clone https://github.com/waffiqaziz/zetta_upn_waffiq_aziz/tree/javascript_day_7.git`.
3. Run `npm install express cors body-parser mongoose`.
4. Run `node main.js`.
5. Test using Postman or any platform for building and use json body for request.
6. Set headers key `authorization` and value `your_password`.
7. Use endpoint that provided below to do a test run.

# 3. Endpoint

## Book Purchasing [POST]
Endpoint for puchasing book, this also will store into MongoDB.
`http://localhost:3000/bookPurchasing`

Request example:
```
{
    "bookDetails": {
        "title": "Lost In The Jungle",
        "writer": "Yossi Ghinsberg",
        "publisher": "Elex Media Komputindo",
        "price": 10000,
        "discount": 10,
        "stock": 3
    },
    "purchasedAmount" : 2,
    "termOfCredit": 2,
    "additionalPrice" : 2000
}
```
With the following parameters:
| Parameter         | Type    | Required? | Description                                        |
| ------------------|---------|-----------|----------------------------------------------------|
| `bookDetails`     | object  | required  | Object contain certain information about the book. |
| `title`           | string  | required  | Title of the book.                                 |
| `writer`          | string  | required  | Author                                             |
| `publisher`       | string  | required  | Book publisher                                     |
| `price`           | integer | required  | Book price                                         | 
| `discount`        | integer | required  | Book discount in percent                           | 
| `stock`           | integer | required  | Available book stock                               | 
| `purchasedAmount` | integer | required  | The number of books to be purchased                | 
| `termOfCredit`    | integer | required  | Credit term                                        |
| `additionalPrice` | integer | required  | Additional credit payments                         | 


Example Response:
```
{
    "finalData": {
        "bookDetails": {
            "title": "Lost In The Jungle",
            "writer": "Yossi Ghinsberg",
            "publisher": "Elex Media Komputindo",
            "price": 10000,
            "discountPercent": 10,
            "remainStock": 1
        },
        "purchasedAmount": 2,
        "totalOriginPrice": 20000,
        "totalPriceAfterDiscount": 18000,
        "taxPercent": 5,
        "totalPriceAfterTax": 18900,
        "termOfCredit": 2,
        "additionalPrice": 2000,
        "totalAdditionalPrice": 4000,
        "totalPrice": 22900,
        "creditPayment": [
            {
                "month": 1,
                "credit": 9450,
                "additional": 2000,
                "totalCreditMustPay": 11450,
                "remainingBalance": 9450
            },
            {
                "month": 2,
                "credit": 9450,
                "additional": 2000,
                "totalCreditMustPay": 11450,
                "remainingBalance": 0
            }
        ]
    },
    "setBooks": [...],
    "mapBooks": [...]
}
```
With the following parameters:
| Parameter                 | Type    | Description                                        |
| --------------------------|---------|----------------------------------------------------|
| `bookDetails`             | object  | Object contain certain information about the book. |
| `title`                   | string  | Title of the book.                                 |
| `writer`                  | string  | Author.                                            |
| `publisher`               | string  | Book publisher.                                    |
| `price`                   | integer | Book price.                                        | 
| `discountPercent`         | integer | Book discount in percent.                          | 
| `remainStock`             | integer | Available book stock now.                          | 
| `purchasedAmount`         | integer | Number of books purchased.                         | 
| `totalOriginPrice`        | integer | Book origin price.                                 |
| `totalPriceAfterDiscount` | integer | Total book price after discount.                   |
| `taxPercent`              | integer | Tax percent.                                       | 
| `totalPriceAfterTax`      | integer | Total book price after discount and tax.           | 
| `termOfCredit`            | integer | Credit term.                                       | 
| `additionalPrice`         | integer | Aditional price for credit term.                   | 
| `totalAdditionalPrice`    | integer | Total Aditional price for credit term.             | 
| `totalPrice`              | integer | Total price to be paids.                           | 
| `creditPayment`           | object  | Object contain information about credit term.      | 
| `month`                   | integer | Term credit payment month.                         | 
| `credit`                  | integer | Amount credit payment.                             | 
| `additional`              | integer | Additional price each credit payment.              | 
| `totalCreditMustPay`      | integer | Total credit payments for the month.               | 
| `remainingBalance`        | integer | Remaining price to be paid.                        | 
| `setBooks`                | array   | Array of set.                                      | 
| `mapBooks`                | array   | Array of map.                                      | 

## Read File with Await [GET]
Read file endpoint with await
`http://localhost:3000/readFileWithAwait`

## Read File without Await [GET]
Read file endpoint without await
`http://localhost:3000/readFileWithoutAwait`

## Read data from MongoDB [GET]
Read all data that has been sent from [Book Purchasing](#book-purchasing-post) endpoint  
`http://localhost:3000/readDataFromMongoDB`

___Note : All data is for example only___
