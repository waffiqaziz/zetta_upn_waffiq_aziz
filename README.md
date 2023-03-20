### **Step by Step**
1. Clone repo
2. Run ```npm ini -y```
3. Run ```npm install express cors```
4. Update package.json 
``` 
  "scripts": {
    "start": "node main.js"
  },
```
5. Run ```npm start```
6. Test using Postman or any platform for building and using APIs. Link : ```http://localhost:3000/bookPurchasing``` (use JSON body)

### **Structure Post Method**
- title : String
- writer : String
- edition : String
- isbn : String
- price : Integer
- discount : Integer
- publisher : String
- stock : Integer
- termOfCredit : Integer

#### Example:
```
{
    "title": "Lost In The Jungle",
    "writer": "Yossi Ghinsberg",
    "edition": "1st",
    "isbn": "978-602-00-1175",
    "price": 60000,
    "discount": 10,
    "publisher": "Elex Media Komputindo",
    "stock": 10,
    "termOfCredit": 2
}
```

**Note : All data is for example only**