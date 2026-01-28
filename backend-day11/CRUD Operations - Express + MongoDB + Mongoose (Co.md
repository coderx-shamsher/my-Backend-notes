<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# CRUD Operations - Express + MongoDB + Mongoose (Complete Step-by-Step)

## 🎯 **What is CRUD?**

**C**reate = Add new data
**R**ead = Get/Fetch data
**U**pdate = Modify existing data
**D**elete = Remove data

## 📦 **Step 0: Setup Project**

```bash
mkdir crud-app
cd crud-app
npm init -y
npm i express mongoose cors dotenv nodemon
```

**`.env` file** (MongoDB connection):

```
MONGO_URI=mongodb://localhost:27017/myapp
PORT=5000
```


## **Step 1: Server Setup (`server.js`) - EVERY LINE EXPLAINED**

```javascript
require('dotenv').config();      // 1. Load .env variables (MONGO_URI)
const express = require('express'); // 2. Express framework
const mongoose = require('mongoose'); // 3. MongoDB ORM
const cors = require('cors');   // 4. Allow frontend requests

const app = express();          // 5. Create Express app

// MIDDLEWARE (runs on EVERY request)
app.use(express.json());        // 6. Parse JSON bodies (req.body)
app.use(cors());                // 7. Allow cross-origin requests

// CONNECT MONGODB
mongoose.connect(process.env.MONGO_URI)  // 8. Connect using env var
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Error:", err));

// ROUTES (import later)
app.use('/api/users', require('./routes/users'));

app.listen(process.env.PORT, () => {  // 9. Start server
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});
```


## **Step 2: Mongoose Model (`models/User.js`)**

```javascript
const mongoose = require('mongoose');  // 1. Import Mongoose

// 2. SCHEMA = Data structure blueprint
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },    // String, MUST have value
  email: { type: String, required: true, unique: true },  // Unique email
  age: { type: Number, default: 18 }         // Number, default 18
}, { timestamps: true });  // 3. Add createdAt/updatedAt auto

// 4. MODEL = Interface to MongoDB collection "users"
module.exports = mongoose.model('User', userSchema);
```

**Why Schema?** Enforces data rules (no empty names).

## **Step 3: Routes + Controllers (`routes/users.js`) - FULL CRUD**

```javascript
const express = require('express');
const User = require('../models/User');  // 1. Import model
const router = express.Router();         // 2. Mini Express app for routes

// ========================================
// C - CREATE (POST /api/users)
router.post('/', async (req, res) => {   // 3. POST route, async/await
  try {
    const user = new User(req.body);     // 4. Create new User from request body
    await user.save();                   // 5. SAVE to MongoDB (returns saved doc)
    res.status(201).json(user);          // 6. Send created user (201=created)
  } catch (error) {
    res.status(400).json({ error: error.message });  // 7. Validation errors
  }
});

// ========================================
// R - READ ALL (GET /api/users)
router.get('/', async (req, res) => {
  try {
    const users = await User.find();     // 8. Find ALL users
    res.json(users);                     // 9. Send array of users
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========================================
// R - READ ONE (GET /api/users/:id)
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);  // 10. Find by MongoDB _id
    if (!user) return res.status(404).json({ error: 'User not found' });  // 11. Check exists
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Invalid ID format' });
  }
});

// ========================================
// U - UPDATE (PUT /api/users/:id)
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(  // 12. Find + update in 1 command
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }        // 13. Return UPDATED doc, validate
    );
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ========================================
// D - DELETE (DELETE /api/users/:id)
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);  // 14. Find + delete
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Invalid ID format' });
  }
});

module.exports = router;
```


## **🔍 EVERY Mongoose Method Explained**

| Method | What it does | Returns |
| :-- | :-- | :-- |
| `new User(data).save()` | **CREATE** new document | Saved document |
| `User.find()` | **READ** all documents | Array |
| `User.findById(id)` | **READ** one by ID | Document or null |
| `User.findByIdAndUpdate(id, data, {new:true})` | **UPDATE** by ID | Updated document |
| `User.findByIdAndDelete(id)` | **DELETE** by ID | Deleted document |

## **🚀 Test with Postman (Step-by-Step)**

```
1. CREATE: POST http://localhost:5000/api/users
Body: { "name": "John", "email": "john@test.com", "age": 25 }

2. READ ALL: GET http://localhost:5000/api/users

3. READ ONE: GET http://localhost:5000/api/users/{id_from_step1}

4. UPDATE: PUT http://localhost:5000/api/users/{id}
Body: { "name": "John Updated", "age": 26 }

5. DELETE: DELETE http://localhost:5000/api/users/{id}
```


## **📁 Final Folder Structure**

```
crud-app/
├── models/
│   └── User.js
├── routes/
│   └── users.js
├── .env
├── server.js
└── package.json
```

**Run**: `npm run dev` (add `"dev": "nodemon server.js"` to scripts)

**Why this way?** Industry-standard: Models (data), Routes (endpoints), Controllers (logic separated). Scalable to 100s of models![^1][^2]
<span style="display:none">[^10][^3][^4][^5][^6][^7][^8][^9]</span>

<div align="center">⁂</div>

[^1]: https://www.youtube.com/watch?v=_7UQPve99r4

[^2]: https://www.geeksforgeeks.org/node-js/node-js-crud-operations-using-mongoose-and-mongodb-atlas/

[^3]: https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Express_Nodejs/mongoose

[^4]: https://www.youtube.com/watch?v=snhR9yjJeOI

[^5]: https://www.youtube.com/watch?v=gIteoUkSM-k

[^6]: https://www.digitalocean.com/community/tutorials/nodejs-crud-operations-mongoose-mongodb-atlas

[^7]: https://www.bezkoder.com/node-express-mongodb-crud-rest-api/

[^8]: https://stackoverflow.com/questions/70537035/crud-operations-using-mongoose-and-express

[^9]: https://www.youtube.com/watch?v=i9YnKRXZzB8

[^10]: https://www.youtube.com/watch?v=XionRs32FB0

