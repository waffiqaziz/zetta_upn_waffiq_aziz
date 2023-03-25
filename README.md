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


#### Example:
```
{
    "bookDetails": {
        "title": "Lost In The Jungle",
        "writer": "Yossi Ghinsberg",
        "publisher": "Elex Media Komputindo",
        "price": 800000,
        "discount": 10,
        "stock": 3
    },
    "purchasedAmount" : 2,
    "termOfCredit": 6
}
```

#### Response:
```
{
    "bookDetails": {
        "title": "Lost In The Jungle",
        "writer": "Yossi Ghinsberg",
        "publisher": "Elex Media Komputindo",
        "price": 800000,
        "discountPercent": 10,
        "remainStock": 1
    },
    "purchasedAmount": 2,
    "totalOriginPrice": 1600000,
    "totalDiscountPrice": 1440000,
    "taxPercent": 5,
    "totalPrice": 1512000,
    "creditPayment": [
        {
            "month": "Bulan ke-1",
            "credit": 252000,
            "remainingBalance": 1260000
        },
        {
            "month": "Bulan ke-2",
            "credit": 252000,
            "remainingBalance": 1008000
        },
        {
            "month": "Bulan ke-3",
            "credit": 252000,
            "remainingBalance": 756000
        },
        {
            "month": "Bulan ke-4",
            "credit": 252000,
            "remainingBalance": 504000
        },
        {
            "month": "Bulan ke-5",
            "credit": 252000,
            "remainingBalance": 252000
        },
        {
            "month": "Bulan ke-6",
            "credit": 252000,
            "remainingBalance": 0
        }
    ]
}
```

**Note : All data is for example only**
