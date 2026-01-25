<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# **Dynamic Routing in Express.js - SUPER EASY** 🚀

## **1 Line Mein Samjhao**

```
Static: app.get('/users', ...)  → Fixed URL
Dynamic: app.get('/users/:id', ...) → URL mein VALUE change hoti hai
```


## **Real Life Example (Shopping App)**

```
Static Route: localhost:3000/products  → All products list
Dynamic Route: localhost:3000/products/123  → Product ID 123 details
                    localhost:3000/products/456  → Product ID 456 details
```


## **🎯 Practical Code Examples**

### **1. BASIC Dynamic Route (User Profile)**

```javascript
app.get('/users/:id', (req, res) => {
    const userId = req.params.id;  // Magic! URL se value nikli
    res.send(`User Profile: ${userId}`);
});
```

**Test:**

```
localhost:3000/users/123  → "User Profile: 123"
localhost:3000/users/rahul → "User Profile: rahul"
localhost:3000/users/999  → "User Profile: 999"
```


### **2. Multiple Parameters (Product Details)**

```javascript
app.get('/products/:category/:id', (req, res) => {
    const { category, id } = req.params;
    res.json({
        category,
        productId: id,
        message: `Showing ${category} product ${id}`
    });
});
```

**Test:**

```
localhost:3000/products/laptop/123 → {category: "laptop", id: "123"}
localhost:3000/products/phone/456  → {category: "phone", id: "456"}
```


### **3. COMPLETE E-commerce Example**

```javascript
const express = require('express');
const app = express();

// Static Route
app.get('/products', (req, res) => {
    res.json({ products: ['Laptop', 'Phone', 'Tablet'] });
});

// Dynamic Routes
app.get('/products/:category', (req, res) => {
    const category = req.params.category;
    res.json({ category, items: [`${category}1`, `${category}2`] });
});

app.get('/products/:category/:id', (req, res) => {
    const { category, id } = req.params;
    res.json({ 
        product: `${category}-${id}`,
        price: 50000,
        inStock: true 
    });
});

app.listen(3000);
```

**Test URLs:**

```
✅ GET /products                    → Product list
✅ GET /products/laptop             → Laptop category
✅ GET /products/laptop/123         → Laptop 123 details
✅ GET /products/phone/456          → Phone 456 details
```


## **🔥 Query Parameters vs Route Parameters**

| **Route Params (:id)** | **Query Params (?id=123)** |
| :-- | :-- |
| `/users/:id` | `/users?id=123` |
| `req.params.id` | `req.query.id` |
| URL structure | Extra info |
| **Dynamic URLs** | **Filters/Search** |

```javascript
// Route Param
app.get('/users/:id', (req, res) => {
    console.log(req.params.id);  // "123"
});

// Query Param  
app.get('/users', (req, res) => {
    console.log(req.query.id);   // "123"
});
```

**Test:**

```
Route: localhost:3000/users/123      → req.params.id = "123"
Query: localhost:3000/users?id=123   → req.query.id = "123"
```


## **📊 Learning Priority (Kitna Seekhna Hai)**

```
✅ 1. :id syntax (1 hour)
✅ 2. req.params access (30 min) 
✅ 3. Multiple params (:cat/:id) (30 min)
✅ 4. Query params (req.query) (15 min)
✅ 5. Error handling (404) (30 min)
❌ Advanced: Regex routes, middleware (later)
```

**TOTAL: 2.5 hours → Production ready!**

## **🎯 Pro Tips**

```javascript
// 1. ID validation
app.get('/users/:id(\\d+)', (req, res) => {
    const id = req.params.id;  // Only numbers allowed
});

// 2. Optional params
app.get('/users/:id?', (req, res) => {
    const id = req.params.id || 'all';  // Default value
});

// 3. Error handling (404)
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});
```


## **🚀 Complete Blog App Example**

```javascript
app.get('/blog', (req, res) => {
    res.json({ blogs: ['Post1', 'Post2'] });
});

app.get('/blog/:slug', (req, res) => {
    res.json({ slug: req.params.slug, views: 100 });
});

app.get('/blog/:category/:id', (req, res) => {
    res.json({ 
        category: req.params.category,
        id: req.params.id,
        title: 'Dynamic Blog Post'
    });
});
```


## **Hinglish Bottom Line**

```
Dynamic routing = URL mein :id laga do
req.params.id = URL value automatic mil jayega
1 route = 1000 URLs handle (magic!)

E-commerce, Blog, User profiles = Dynamic routing MUST!
```

**🎯 Practice: `/products/:cat/:id` banao → localhost:3000/products/laptop/123 test karo!** 😎
<span style="display:none">[^1][^10][^2][^3][^4][^5][^6][^7][^8][^9]</span>

<div align="center">⁂</div>

[^1]: https://stackoverflow.com/questions/25623041/how-to-configure-dynamic-routes-with-express-js

[^2]: https://dev.to/reiallenramos/create-an-express-api-static-and-dynamic-routes-33lb

[^3]: https://expressjs.com/en/guide/routing.html

[^4]: https://www.youtube.com/watch?v=6yHt0nFvtvo

[^5]: https://www.youtube.com/watch?v=EQX0c7_crEc

[^6]: https://sourcebae.com/blog/how-dynamic-routing-works-in-express-js/

[^7]: https://www.youtube.com/watch?v=AUQYBbeELSA

[^8]: https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Express_Nodejs/routes

[^9]: https://www.tutorialspoint.com/expressjs/expressjs_url_building.htm

[^10]: https://ihechikara.com/posts/how-to-use-route-parameter-in-expressjs/

