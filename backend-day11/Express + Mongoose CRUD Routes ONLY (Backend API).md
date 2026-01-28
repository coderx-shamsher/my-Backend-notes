<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Express + Mongoose CRUD Routes ONLY (Backend API)

## 📦 **Complete Backend Setup (No Frontend)**

### **1. Project Setup**

```bash
mkdir crud-api
cd crud-api  
npm init -y
npm i express mongoose cors dotenv nodemon
```


### **2. `.env` File**

```
MONGO_URI=mongodb://localhost:27017/crudapi
PORT=5000
```


### **3. Main Server (`server.js`)**

```javascript
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());  // Parse JSON requests
app.use(cors());          // Allow all origins for testing

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Error:", err));

// Routes
app.use('/api/users', require('./routes/users'));

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server: http://localhost:${process.env.PORT}`);
});
```


### **4. User Model (`models/User.js`)**

```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, default: 18 }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
```


### **5. COMPLETE CRUD ROUTES (`routes/users.js`)**

```javascript
const express = require('express');
const User = require('../models/User');
const router = express.Router();

// ========================================
// CREATE - POST /api/users
router.post('/', async (req, res) => {
  try {
    console.log('📥 CREATE - Data received:', req.body);
    
    const user = new User(req.body);     // Create new user instance
    await user.save();                   // Save to MongoDB
    
    console.log('✅ User created:', user._id);
    res.status(201).json(user);          // 201 = Created successfully
  } catch (error) {
    console.log('❌ CREATE Error:', error.message);
    res.status(400).json({ error: error.message });
  }
});

// ========================================
// READ ALL - GET /api/users
router.get('/', async (req, res) => {
  try {
    console.log('🔍 READ ALL - Fetching all users');
    
    const users = await User.find();     // Get ALL users
    console.log(`📊 Found ${users.length} users`);
    
    res.json(users);
  } catch (error) {
    console.log('❌ READ Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// ========================================
// READ ONE - GET /api/users/:id
router.get('/:id', async (req, res) => {
  try {
    console.log('🔍 READ ONE - ID:', req.params.id);
    
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    console.log('✅ User found:', user.name);
    res.json(user);
  } catch (error) {
    console.log('❌ Invalid ID format');
    res.status(500).json({ error: 'Invalid ID format' });
  }
});

// ========================================
// UPDATE - PUT /api/users/:id
router.put('/:id', async (req, res) => {
  try {
    console.log('✏️ UPDATE - ID:', req.params.id, 'Data:', req.body);
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }  // new: return updated doc
    );
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    console.log('✅ User updated:', user.name);
    res.json(user);
  } catch (error) {
    console.log('❌ UPDATE Error:', error.message);
    res.status(400).json({ error: error.message });
  }
});

// ========================================
// DELETE - DELETE /api/users/:id
router.delete('/:id', async (req, res) => {
  try {
    console.log('🗑️ DELETE - ID:', req.params.id);
    
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    console.log('✅ User deleted:', user.name);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.log('❌ DELETE Error:', error.message);
    res.status(500).json({ error: 'Invalid ID format' });
  }
});

module.exports = router;
```


## 🚀 **How to Test (Postman/Thunder Client)**

### **Start Server**

```bash
npm run dev  # Add "dev": "nodemon server.js" to package.json
```


### **Test Each Route:**

```
1️⃣ CREATE (POST)
URL: http://localhost:5000/api/users
Body (JSON):
{
  "name": "John Doe",
  "email": "john@example.com", 
  "age": 25
}
✅ Response: { _id: "...", name: "John Doe", ... }

2️⃣ READ ALL (GET)
URL: http://localhost:5000/api/users
✅ Response: [ {user1}, {user2}, ... ]

3️⃣ READ ONE (GET)
URL: http://localhost:5000/api/users/{COPY_ID_FROM_STEP1}
✅ Response: Single user object

4️⃣ UPDATE (PUT)
URL: http://localhost:5000/api/users/{ID}
Body:
{
  "name": "John Updated",
  "age": 26
}
✅ Response: Updated user

5️⃣ DELETE (DELETE)
URL: http://localhost:5000/api/users/{ID}
✅ Response: { "message": "User deleted successfully" }
```


## 📁 **Final Structure**

```
crud-api/
├── models/
│   └── User.js
├── routes/
│   └── users.js
├── .env
├── server.js
└── package.json
```


## 🎯 **package.json Scripts**

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

**Run**: `npm run dev`

**Test with**: Postman, Thunder Client, or `curl`

**Pure Backend API** - No frontend needed! Ready for React/Vue/Angular/mobile apps. 🚀
<span style="display:none">[^1][^10][^2][^3][^4][^5][^6][^7][^8][^9]</span>

<div align="center">⁂</div>

[^1]: http://pont.ist/route-examples-mongoose-express/

[^2]: https://stackoverflow.com/questions/10952571/node-js-express-routing-with-mongodb

[^3]: https://stackoverflow.com/questions/60592168/using-mongoose-schema-in-multiple-routes-with-express

[^4]: https://expressjs.com/en/guide/routing.html

[^5]: https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Express_Nodejs/mongoose

[^6]: https://dev.to/kjdowns/building-a-basic-api-using-express-node-and-mongodb-160f

[^7]: https://gist.github.com/Kusumoto/04e48d7ad61e449b3abc

[^8]: https://www.facebook.com/groups/somaliprogrammers/posts/2085042051989083/

[^9]: https://blog.appsignal.com/2023/08/09/how-to-use-mongodb-and-mongoose-for-nodejs.html

[^10]: https://webapplog.com/express-js-and-mongoose-example-building-hackhall/

