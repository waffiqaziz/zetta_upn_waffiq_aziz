# MongoDB Day 1 

### 1. Create
Create One
```ps
db.profiles.insertOne({
    name: 'Andika',
    email: 'andika1999@gmail.com',
    address: 'Jl. 001 Pangeran Antasari, Jakarta',
    hobby: [
        'reading', 'football', 'painting', 'eating'
    ]
})

db.profiles.insertOne({
    name: 'Yusuf',
    email: 'yusuf.ali@silva.com',
    address: 'Jl Legian Klod Kuta, Bali',
    hobby: [
        'basketball', 'gaming', 'wathching movies'
    ]
})
```
Create Many
```ps
db.profiles.insertMany([
    {
        name: 'Akbah Brahim',
        email: 'akbaraim@core.com',
        address: 'Jl Jend A Yani 313, Jawa Barat',
        hobby: [
            'eat', 'sleep', 'code'
        ]
    },
    {
        name: 'Zidan',
        email: 'zidan.zul@zen.com',
        address: 'Jl Sei Bilah 51, Sumatera Utara',
        hobby: [
            'read', 'drawing', 'riding'
        ]
    }
])
```

### 2. Read
Read All
```ps
 db.profiles.find()
```
Read by ID
```ps
db.profiles.find({
  _id: ObjectId("645ddb1cca753d7680192ad2")
})
```
Read by Name
```ps
db.profiles.find({"name" :"Yusuf"})
```
Read by Name and Email
```ps
db.profiles.find({
  "name" :"Andika",
  "email" :"andika1999@gmail.com"
})
```
### 3. Update
```ps
db.profiles.updateOne(
  {_id: ObjectId("645ded70ca753d7680192ad4")}, {
    $set:{
      name : "Akbar Ibrahim",
      address: "Jl Rembulan 37, Bali"
    }
  }
)
```
### 4. Delete by Name
```ps
db.profiles.deleteOne({name : "Akbar Ibrahim"})
```
