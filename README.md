### **Step by Step**
1. Clone repo
2. Run ```npm install express cors body-parser```
3. Run ```node main.js```
4. Test using Postman or any platform for building and using APIs. Link : ```http://localhost:3000/bookPurchasing``` (use JSON body)
5. Set headers key "authorization" and value "your_password"

### **Structure Post Method**
- title : String
- writer : String
- price : Integer
- discount : Integer
- publisher : String
- stock : Integer
- termOfCredit : Integer
- purchasedAmount : Integer
- additionalPrice : Integer


#### Example:
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

#### Response:
```
{
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
}
```

**Note : All data is for example only**
