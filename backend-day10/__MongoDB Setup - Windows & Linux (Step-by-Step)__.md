<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# **MongoDB Setup - Windows \& Linux (Step-by-Step)** 🚀

## **📋 WINDOWS SETUP (15 Minutes)**

### **Method 1: MSI Installer (Recommended)**

```cmd
# Step 1: Download MSI
# Go to: https://www.mongodb.com/try/download/community
# Windows → msi → 64-bit → Download

# Step 2: Install (Run as Administrator)
1. Double-click mongodb-windows-x86_64-*.msi
2. "Complete" → Next → Install as Service ✅
3. Finish → MongoDB auto-starts

# Step 3: Verify Installation
mongod --version
mongosh          # Mongo shell

# Step 4: Create data folder (if needed)
mkdir C:\data\db
mongod           # Start server
```


### **Method 2: ZIP Archive (No Admin Rights)**

```cmd
# Step 1: Download ZIP
# mongodb-windows-x86_64-*.zip

# Step 2: Extract
# C:\mongodb\ → Extract here

# Step 3: Add to PATH
# System Properties → Environment Variables → Path → Add: C:\mongodb\bin

# Step 4: Create data folder
mkdir C:\data\db

# Step 5: Start server
cd C:\mongodb\bin
mongod --dbpath C:\data\db
```

**New Terminal → Connect:**

```cmd
mongosh
show dbs
```


## **🐧 LINUX SETUP (Ubuntu/Debian - 10 Minutes)**

```bash
# Step 1: Import MongoDB Key
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor

# Step 2: Add Repository
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Step 3: Install
sudo apt-get update
sudo apt-get install -y mongodb-org

# Step 4: Start Service
sudo systemctl start mongod
sudo systemctl enable mongod   # Auto-start on boot

# Step 5: Verify
sudo systemctl status mongod
mongosh
```


## **🎯 ATLAS CLOUD (Zero Setup - Recommended for Beginners)**

```bash
# Step 1: Sign up FREE
# https://mongodb.com/cloud/atlas → Create Free M0 Cluster

# Step 2: Get Connection String
# Clusters → Connect → Drivers → Node.js
# Copy: mongodb+srv://username:<password>@cluster0.xxx.mongodb.net/

# Step 3: Use in Node.js
npm install mongoose
```

```javascript
// .env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxx.mongodb.net/myapp

// Connect
mongoose.connect(process.env.MONGODB_URI);
```


## **✅ QUICK TEST (All Platforms)**

**Terminal 1 (Server):**

```bash
# Windows
mongod

# Linux  
sudo systemctl start mongod
```

**Terminal 2 (Client):**

```bash
mongosh
use myapp
db.users.insertOne({name: "Rahul", age: 25})
db.users.find()
```


## **🔍 Troubleshooting Common Issues**

| **Problem** | **Windows Fix** | **Linux Fix** |
| :-- | :-- | :-- |
| **`mongod` not found** | Add `C:\mongodb\bin` to PATH | `sudo apt install mongodb-org-shell` |
| **`C:\data\db` not found** | `mkdir C:\data\db` | `sudo mkdir -p /data/db` |
| **Port 27017 busy** | `mongod --port 27018` | `sudo lsof -i :27017` |
| **Permission denied** | Run CMD as Administrator | `sudo chown -R $USER /data/db` |

## **🚀 Node.js Quick Test**

```javascript
// test.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test')
  .then(() => {
    console.log('✅ MongoDB Connected!');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ MongoDB Error:', err);
    process.exit(1);
  });
```

```bash
npm install mongoose
node test.js
```


## **📁 Final Folder Structure**

```
my-mongo-app/
├── node_modules/
├── src/
│   └── server.js
├── data/           # Windows: C:\data\db
├── .env            # MONGODB_URI
└── package.json
```


## **🎯 Success Checklist**

```
✅ [ ] MongoDB installed
✅ [ ] mongod --version works  
✅ [ ] mongosh connects
✅ [ ] New database created
✅ [ ] Test document inserted
✅ [ ] Node.js connects (mongoose)
✅ [ ] Express API working
```

**Run `mongosh` → `db.users.find()` → Data dikhega = SUCCESS!** 😎
<span style="display:none">[^1][^10][^2][^3][^4][^5][^6][^7][^8][^9]</span>

<div align="center">⁂</div>

[^1]: https://www.geeksforgeeks.org/mongodb/how-to-install-mongodb-on-windows/

[^2]: https://stackoverflow.com/questions/2404742/how-to-install-mongodb-on-windows

[^3]: https://dev.to/seanwelshbrown/installing-mongodb-on-windows-subsystem-for-linux-wsl-2-19m9

[^4]: https://www.youtube.com/watch?v=ificGzgx-Es

[^5]: https://www.prisma.io/dataguide/mongodb/setting-up-a-local-mongodb-database

[^6]: https://www.youtube.com/watch?v=KYIOJrE3zjk

[^7]: https://www.mongodb.com/docs/manual/installation/

[^8]: https://www.youtube.com/watch?v=gB6WLkSrtJk

[^9]: https://www.mongodb.com/docs/manual/tutorial/getting-started/

[^10]: https://www.w3schools.com/mongodb/mongodb_get_started.php

