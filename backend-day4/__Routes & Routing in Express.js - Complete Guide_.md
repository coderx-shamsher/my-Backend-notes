<!-- <img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/> -->

# **Routes \& Routing in Express.js - Complete Guide** 🚀
* **A route is the specific path data takes (like a road), while routing is the process of determining and directing that path, often using routers to find the most efficient way for packets to travel across networks or for applications to handle requests, as seen in web frameworks. In essence, the route is the "what" (the destination or path), and routing is the "how" (the action/system of getting there).**

### Route ---  Definition: A defined path or sequence of connections from a source to a destination.
* Web Development: A URL path, like /users/profile, that an application listens for.

### Routing --- Definition: The action or system of directing traffic or data along a route.
* Web Frameworks (Express.js/Angular): The logic that maps HTTP requests (GET, POST) to specific handler functions or components.


---
## **Routing Kya Hai? (1 Line)**

```
Routing = Browser URL → Tumhara code chalao
localhost:3000/users → users page dikhao
localhost:3000/login → login form dikhao
```


## **HTTP Methods (Routes ke Types)**

```
GET    → Data dikhana (pages, API)
POST   → Data bhejna (forms, create)
PUT    → Update karna
DELETE → Delete karna
```


## **Basic Routes (Copy-Paste-Run)**

### **1. Simple Routes**

```javascript
const express = require('express');
const app = express();

// GET routes (pages)
app.get('/', (req, res) => {
    res.send('🏠 Home Page');
});

app.get('/about', (req, res) => {
    res.send('👨‍💻 About Page');
});

app.get('/contact', (req, res) => {
    res.send('📧 Contact Page');
});

app.listen(3000);
```


### **2. Dynamic Routes (Params)**

```javascript
// :id = Variable (magic!)
app.get('/users/:id', (req, res) => {
    res.send(`User ID: ${req.params.id}`);
});

app.get('/products/:category/:id', (req, res) => {
    res.json({
        category: req.params.category,
        id: req.params.id
    });
});
```

**Test:**

- `localhost:3000/users/5`
- `localhost:3000/products/laptop/123`


### **3. Query Parameters (?name=rahul)**

```javascript
app.get('/search', (req, res) => {
    res.send(`Searching for: ${req.query.q}`);
});
```

**Test:** `localhost:3000/search?q=laptop`

## **ALL HTTP Methods (Complete Example)**

```javascript
// routes.js
const express = require('express');
const app = express();

app.use(express.json());

// GET - Read data
app.get('/api/users', (req, res) => {
    res.json([{ id: 1, name: 'Rahul' }]);
});

// POST - Create data
app.post('/api/users', (req, res) => {
    console.log('New user:', req.body);
    res.json({ success: true, id: 123 });
});

// Single user routes
app.route('/api/users/:id')
    .get((req, res) => {
        res.json({ id: req.params.id, name: 'Rahul' });
    })
    .put((req, res) => {
        res.json({ message: 'User updated' });
    })
    .delete((req, res) => {
        res.json({ message: 'User deleted' });
    });

app.listen(3000);
```


## **Router - Pro Level (Separate Files)**

**routes/users.js:**

```javascript
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json([{ name: 'Rahul' }]);
});

router.post('/', (req, res) => {
    res.json({ success: true });
});

module.exports = router;
```

**app.js:**

```javascript
const express = require('express');
const userRoutes = require('./routes/users');
const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);  // /api/users/*

app.listen(3000);
```


## **Complete Real Website**

```javascript
// full-website.js
const express = require('express');
const app = express();

app.set('view engine', 'ejs');

// Public files (CSS/JS)
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.render('home', { title: 'Home' });
});

app.get('/products', (req, res) => {
    res.render('products', { 
        products: [
            { name: 'Laptop', price: 50000 },
            { name: 'Phone', price: 20000 }
        ]
    });
});

app.get('/products/:id', (req, res) => {
    res.render('product', { 
        product: { id: req.params.id, name: 'iPhone' }
    });
});

app.listen(3000);
```


## **Route Order MATTERS!**

```javascript
app.use('/users', userRoutes);    // ✅ First (broad)
app.get('/users/:id', ...);       // ✅ Specific later
app.get('*', (req, res) => {      // ✅ 404 last
    res.status(404).send('Not Found');
});
```


## **Quick Syntax Reference**

```
app.get('/path', handler)           → GET request
app.post('/path', handler)          → POST request
app.route('/path').get().post()     → Chain methods
app.use('/path', router)            → Mount router
req.params.id                       → :id value
req.query.name                      → ?name= value
req.body                            → POST data
```


## **Practice Plan (15 mins)**

```
✅ Basic GET routes (3 pages)
✅ Dynamic :id route
✅ POST API endpoint
✅ Router file banao
✅ Full website with EJS
```

**🎯 Routing Master!**

**Routes = URL paths → Tumhara code mapping!** 🚀

**Copy website example → views folder banao → Run karo!** 😎
<span style="display:none">[^1][^10][^2][^3][^4][^5][^6][^7][^8][^9]</span>

<div align="center">⁂</div>

[^1]: https://www.topcoder.com/thrive/articles/routing-in-express-js

[^2]: https://expressjs.com/en/guide/routing.html

[^3]: https://www.w3schools.in/express-js/routing

[^4]: https://www.geeksforgeeks.org/node-js/what-is-routing-in-express/

[^5]: https://www.tutorialspoint.com/expressjs/expressjs_routing.htm

[^6]: https://expressjs.com/en/starter/basic-routing.html

[^7]: https://www.scaler.com/topics/expressjs-tutorial/express-router/

[^8]: https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Express_Nodejs/routes

[^9]: https://www.almabetter.com/bytes/tutorials/nodejs/express-js-routing

[^10]: https://www.geeksforgeeks.org/javascript/routing-path-for-expressjs/

