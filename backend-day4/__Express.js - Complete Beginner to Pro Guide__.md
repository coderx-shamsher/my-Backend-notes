<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# **Express.js - Complete Beginner to Pro Guide** 🚀

- *Express.js (or simply Express) is a fast, unopinionated, and minimalist web application framework for Node.js. It is the de facto standard server framework for Node.js, providing a robust set of features for building web and mobile applications and APIs (Application Programming Interfaces). 
Built on the Node.js runtime environment, Express simplifies the process of server-side development by providing a thin layer of fundamental web application features, rather than forcing a specific structure or architecture.* 

## **Key Features**
1)  Routing Express provides a powerful system for defining URL endpoints (routes) and handling different HTTP methods (GET, POST, PUT, DELETE) with specific functions.

 2)  Middleware This is a core concept where functions can access the request (req), response (res), and the next middleware function in the application's request-response cycle. Middleware is used for tasks like logging, authentication, error handling, and parsing request bodies.

 3) Templating It supports various template engines (like EJS, Pug, and Handlebars) to dynamically generate HTML content on the server side, allowing developers to build data-driven web pages.

 4) Static File Serving It includes built-in middleware (express.static) to efficiently serve static assets such as images, CSS files, and JavaScript files from a designated directory.

 5) Minimalist & Flexible Express provides only the essentials, allowing developers the freedom to choose additional components and structure their application as they prefer. 

--- 

## **Why use Express.js?*
Developers use Express to manage the backend (server-side) logic of an application, which includes connecting users to databases, processing information, and returning responses. It is used in popular technology stacks such as MEAN and MERN, where it handles the API and server logic while a frontend library like Angular or React manages the user interface. Its simplicity, flexibility, and performance make it a popular choice for everything from rapid prototyping to large-scale enterprise APIs. 
For more information and detailed documentation, you can visit the official Express.js website

## **Express.js Kya Hai? (1 Minute Samjhao)**

```
HTTP module = Bicycle (manual gears)
Express.js = Car (automatic + AC + music)

Express = Node.js ka FAST web framework
- Easy routing
- Middleware power  
- JSON handling
- npm install express
```


## **HTTP Module vs Express - Side-by-Side**

```
HTTP MODULE (Manual 😓):
if(req.url === '/') res.end('Home')
if(req.url === '/about') res.end('About')

EXPRESS (Easy 😎):
app.get('/', (req,res)=> res.send('Home'))
app.get('/about', (req,res)=> res.send('About'))
```


## **🚀 Step 1: Setup (2 Minutes)**

```bash
mkdir my-express-app
cd my-express-app
npm init -y
npm install express
```


## **🚀 Step 2: FIRST EXPRESS SERVER (Copy-Paste-Run)**

```javascript
// app.js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello Express!');
});

app.listen(3000, () => {
    console.log('Server: http://localhost:3000');
});
```

**Run:** `node app.js` → `localhost:3000`

## **🚀 Step 3: Multiple Pages (Real Website)**

```javascript
// website.js
const express = require('express');
const app = express();

// Home page
app.get('/', (req, res) => {
    res.send(`
        <h1>🏠 Home</h1>
        <a href="/about">About</a> | <a href="/contact">Contact</a>
    `);
});

// About page
app.get('/about', (req, res) => {
    res.send(`
        <h1>👨‍💻 About</h1>
        <p>Rahul - Node.js Developer from Ludhiana!</p>
        <a href="/">← Home</a>
    `);
});

// API endpoint
app.get('/api/users', (req, res) => {
    res.json([
        { id: 1, name: 'Rahul' },
        { id: 2, name: 'Priya' }
    ]);
});

// 404 page
app.use((req, res) => {
    res.status(404).send('404 - Page Not Found 😢');
});

app.listen(3000, () => {
    console.log('🌐 Website ready: localhost:3000');
});
```


## **🚀 Step 4: POST Requests (Forms Handle)**

```javascript
// post-server.js
const express = require('express');
const app = express();

// JSON parsing enable
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/login', (req, res) => {
    console.log('Login data:', req.body);
    res.json({ 
        message: 'Login successful!',
        user: req.body.username 
    });
});

app.listen(3000);
```

**Test with curl:**

```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"username":"rahul","password":"123"}'
```


## **🚀 Step 5: Dynamic Routes (Params)**

```javascript
// dynamic.js
const express = require('express');
const app = express();

app.get('/users/:id', (req, res) => {
    res.json({
        id: req.params.id,
        name: `User ${req.params.id}`,
        query: req.query  // ?name=rahul
    });
});

app.listen(3000);
```

**Test:** `localhost:3000/users/5?name=rahul`

## **🚀 Step 6: Middleware Magic**

```javascript
// middleware.js
const express = require('express');
const app = express();

// Logging middleware (har request pe chale)
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();  // Agla middleware/route chale
});

// Authentication middleware
const auth = (req, res, next) => {
    if(req.headers.token === 'secret') {
        next();
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
};

// Protected route
app.get('/secret', auth, (req, res) => {
    res.json({ message: 'Secret data!' });
});

app.listen(3000);
```


## **🚀 Complete Production App**

```javascript
// production-app.js
const express = require('express');
const app = express();

// Middleware
app.use(express.json());
app.use(express.static('public'));  // Static files (CSS/JS)

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/products', (req, res) => {
    res.json([
        { id: 1, name: 'Laptop', price: 50000 },
        { id: 2, name: 'Phone', price: 20000 }
    ]);
});

app.post('/api/orders', (req, res) => {
    console.log('New order:', req.body);
    res.json({ success: true, orderId: 123 });
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
```


## **Key Concepts (Must Learn Order)**

```
1. ✅ app.get/post/put/delete()
2. ✅ req.body / req.params / req.query
3. ✅ res.json() / res.send() / res.sendFile()
4. ✅ app.use() - Middleware
5. ✅ express.json() - Body parsing
6. ✅ Static files - CSS/JS/images
7. ✅ Error handling
```


## **Express vs HTTP Module**

| **Feature** | **HTTP Module** | **Express** |
| :-- | :-- | :-- |
| Setup lines | 20+ if-else | 3 lines |
| Routing | Manual if(req.url) | app.get() |
| JSON | Manual parsing | res.json() |
| Middleware | ❌ No | ✅ Yes |
| Params | ❌ Manual | ✅ :id |
| Error handling | ❌ Manual | ✅ app.use |

## **Practice Plan (1 Hour)**

```
✅ [5min] npm install express
✅ [10min] Basic server (Step 2)
✅ [15min] Website with pages (Step 3)
✅ [10min] API + POST (Step 4-5)
✅ [10min] Middleware (Step 6)
✅ [10min] Production app
```

**🎉 Express PRO ban gaya! MongoDB + Database next?** 🚀

**First server copy karo → Run → localhost:3000 → Success!** 😎
<span style="display:none">[^1][^10][^2][^3][^4][^5][^6][^7][^8][^9]</span>

<div align="center">⁂</div>

[^1]: https://www.geeksforgeeks.org/node-js/express-js/

[^2]: https://expressjs.com

[^3]: https://www.w3schools.com/nodejs/nodejs_express.asp

[^4]: https://www.youtube.com/watch?v=SccSCuHhOw0

[^5]: https://www.tutorialspoint.com/expressjs/index.htm

[^6]: https://www.geeksforgeeks.org/node-js/getting-started-with-express-js/

[^7]: https://expressjs.com/en/starter/hello-world.html

[^8]: https://www.youtube.com/watch?v=fBzm9zja2Y8

[^9]: https://www.youtube.com/watch?v=jivyItmsu18

[^10]: https://www.youtube.com/watch?v=nH9E25nkk3I

