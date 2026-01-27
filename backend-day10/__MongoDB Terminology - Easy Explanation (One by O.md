<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# **MongoDB Terminology - Easy Explanation (One by One)** 🚀

## **🎯 MongoDB vs SQL - Terminology Mapping**

```
SQL TABLE     → MongoDB COLLECTION
SQL ROW       → MongoDB DOCUMENT  
SQL COLUMN    → MongoDB FIELD
SQL DATABASE  → MongoDB DATABASE
```


## **1. DATABASE** 📁

```
**Kya hai:** Data ka main container (Multiple collections rakhta hai)
**Example:** 
- `mydb` (Database name)
- andar: users, products, orders collections

mongosh> use mydb           // Switch/create database
mongosh> show dbs           // List all databases
```


## **2. COLLECTION** 📋

```
**Kya hai:** Documents ka group (Table jaisa, but flexible)
**No schema** - Har document alag structure ho sakta hai

Example:
mydb.users          // Users collection
mydb.products       // Products collection

mongosh> show collections    // List collections in current DB
mongosh> db.users.find()     // Show all users
```


## **3. DOCUMENT** 📄

```
**Kya hai:** Single record (JSON object - Row jaisa)
**Flexible fields** - Har document mein alag fields ho sakte

Example:
{
  _id: "507f1f77bcf86cd799439011",
  name: "Rahul",
  age: 25,
  skills: ["JS", "React"]
}
```


## **4. FIELD** 🔖

```
**Kya hai:** Document ka property (Column jaisa)
**Key-value pair** - name: "Rahul"

Example:
{name: "Rahul"}    → "name" = Field name
{name: "Rahul"}    → "Rahul" = Field value
{age: 25}          → "age" = Field name
```


## **5. _id (Primary Key)** 🆔

```
**Kya hai:** Unique identifier (Auto-generated ObjectId)
**MongoDB automatic** provide karta hai

Example:
_id: ObjectId("507f1f77bcf86cd799439011")
Manual bhi set kar sakte: _id: "user123"
```


## **6. BSON** 📦

```
**Kya hai:** Binary JSON (MongoDB internal format)
**JSON + Extra types** (Date, Binary, ObjectId)
**Faster** than plain JSON

JSON: {"name": "Rahul"}
BSON: {"name": "Rahul"} + metadata (size, type)
```


## **7. MONGOD** ⚙️

```
**Kya hai:** MongoDB Server process
**Background service** - Data store karta hai

Commands:
mongod              // Start server
sudo systemctl start mongod  // Linux service
```


## **8. MONGOSH** 🖥️

```
**Kya hai:** MongoDB Shell (CLI client)
**Database se interact** karne ke liye

Commands:
mongosh             // Connect to local
mongosh "mongodb://localhost:27017"  // Specific URI
```


## **9. CURSOR** 👆

```
**Kya hai:** Query result ka pointer
**Lazy loading** - Ek time mein 101 documents

Example:
db.users.find()    // Returns cursor
cursor.next()      // Get next document
```


## **10. INDEX** 📇

```
**Kya hai:** Fast search structure (Phone book jaisa)
**Without index** = Full scan (slow)
**With index** = Direct jump (fast)

Create:
db.users.createIndex({email: 1})   // 1 = Ascending
db.users.createIndex({name: "text"}) // Text search
```


## **11. AGGREGATION** 📊

```
**Kya hai:** Data processing pipeline (Excel formulas)
**Multiple stages** - $match, $group, $sort

Example:
db.users.aggregate([
  { $match: { age: { $gt: 25 } } },     // Filter
  { $group: { _id: "$city", count: { $sum: 1 } } }  // Count by city
])
```


## **12. REPLICA SET** 🔄

```
**Kya hai:** Data backup group (3 servers minimum)
**Primary** = Write only
**Secondary** = Read + Backup

Example:
Server1 (Primary) → Server2 (Secondary) → Server3 (Arbiter)
```


## **13. SHARDING** 🌍

```
**Kya hai:** Horizontal scaling (Data split across servers)
**Shard Key** pe depend karta hai

Example:
users collection:
Shard1: users A-M
Shard2: users N-Z
```


## **14. OBJECTID** 🆔

```
**Kya hai:** 12-byte unique ID (Auto-generated)
**Format:** Timestamp + Machine ID + Process ID + Counter

Example:
507f1f77bcf86cd799439011
││ │ ││  ││  ││  └─Counter (4 bytes)
││ │ ││  ││  │└───Process ID (2 bytes) 
││ │ ││  ││ └────Machine ID (3 bytes)
││ │ ││  └───────Timestamp (4 bytes)
││ │ │└─────────Random (1 byte)
││ │ └───────────Version (1 byte)
```


## **🔍 SQL vs MongoDB - Quick Reference**

| **SQL** | **MongoDB** | **Example** |
| :-- | :-- | :-- |
| Database | Database | `mydb` |
| Table | Collection | `db.users` |
| Row | Document | `{name: "Rahul"}` |
| Column | Field | `name` |
| Primary Key | _id | `ObjectId("507f...")` |
| JOIN | Embedded Docs | `{posts: [...]}` |

## **🎯 Real-World Data Example**

```javascript
// Collection: users
[
  {
    _id: ObjectId("507f1f77bcf86cd799439011"),
    name: "Rahul",
    email: "rahul@test.com",
    skills: ["JS", "React"],
    posts: [
      { title: "MongoDB Guide", likes: 100 }
    ]
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439012"),
    name: "Priya",
    age: 30,
    address: { city: "Mumbai" }
    // No skills array - Flexible!
  }
]
```


## **🌈 HINGLISH SUMMARY**

```
DATABASE = Folder (users, products rakhega)
COLLECTION = Notebook (users ka data)
DOCUMENT = Page (1 user ka data)
FIELD = Line (name: Rahul)

_id = Page number (Auto unique)
MONGOD = Library (Server)
MONGOSH = Librarian (CLI)

INDEX = Index page (Fast search)
REPLICA SET = Photocopy (Backup)
SHARDING = Multiple libraries (Scale)
```

**Practice:** `mongosh` → `use test` → `db.users.insertOne({name:"Rahul"})` → Master! 😎
<span style="display:none">[^1][^10][^2][^3][^4][^5][^6][^7][^8][^9]</span>

<div align="center">⁂</div>

[^1]: https://www.tutorialspoint.com/mongodb/mongodb_terminology.htm

[^2]: https://www.mongodb.com/docs/manual/reference/glossary/

[^3]: https://mongoing.com/docs/reference/glossary.html

[^4]: https://www.mongodb.com/docs/v7.0/reference/glossary/

[^5]: https://www.geeksforgeeks.org/mongodb/mongodb-terminology/

[^6]: https://www.vskills.in/certification/tutorial/mongodb-glossary/

[^7]: https://docs.byteplus.com/en/docs/mongodb/glossary

[^8]: https://dev.to/burakboduroglu/mongodb-cheat-sheet-1a6a

[^9]: https://www.meteorops.com/glossary/mongodb

[^10]: https://support.quest.com/kb/4301685/terminology-used-with-the-mongodb-databases

