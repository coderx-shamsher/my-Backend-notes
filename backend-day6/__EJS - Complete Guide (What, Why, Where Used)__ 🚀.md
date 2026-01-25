<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# **EJS - Complete Guide (What, Why, Where Used)** 🚀

## **EJS Kya Hai? (Technical Definition)**

```
EJS = "Embedded JavaScript Templating"
Server-side template engine jo HTML mein JS logic embed karta hai
Dynamic HTML generate karta hai data ke saath
```


## **Simple Analogy (1 Minute Samjhao)**

```
Static HTML:
<h1>Hello World</h1>  → Fixed content

EJS (Dynamic):
<h1>Hello <%= name %></h1>  → Rahul ke liye "Hello Rahul"
```


## **EJS Ka Main Use**

```
1. ✅ Dynamic webpages banao
2. ✅ Database data HTML mein dikhao  
3. ✅ Loops/conditions HTML mein chalao
4. ✅ Server-side rendering (SSR)
```


## **Setup (Copy-Paste-Run)**

```bash
npm install ejs express
mkdir views
```

**app.js:**

```javascript
const express = require('express');
const app = express();

// EJS ko view engine banao
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home', { 
        title: 'My Site',
        user: 'Rahul',
        products: [
            { name: 'Laptop', price: 50000 },
            { name: 'Phone', price: 20000 }
        ]
    });
});

app.listen(3000);
```

**views/home.ejs:**

```html
<!DOCTYPE html>
<html>
<head>
    <title><%= title %></title>
</head>
<body>
    <h1>Hello <%= user %>!</h1>
    
    <h2>Products:</h2>
    <% products.forEach(product => { %>
        <div>
            <%= product.name %> - ₹<%= product.price %>
        </div>
    <% }); %>
</body>
</html>
```


## **EJS Syntax (Most Important Tags)**

| **Tag** | **Use** | **Example** |
| :-- | :-- | :-- |
| `<%= %>` | **Print safe data** | `<%= name %>` → Rahul |
| `<%- %>` | **Print raw HTML** | `<%- post.html %>` |
| `<% %>` | **JS logic** (no print) | `<% if(loggedIn) { %>` |
| `<%# %>` | **Comment** | `<%# Hidden %>` |

## **Real-World Use Cases (Where MOST Used)**

### **1. User Dashboards (80% Use)**

```ejs
<!-- Dashboard with user data -->
<h1>Welcome <%= user.name %>!</h1>
<p>Email: <%= user.email %></p>

<% if(user.role === 'admin') { %>
    <a href="/admin">Admin Panel</a>
<% } %>
```


### **2. Product Listings (E-commerce)**

```ejs
<% products.forEach(product => { %>
    <div class="product">
        <h3><%= product.name %></h3>
        <p>₹<%= product.price %></p>
        <% if(product.stock > 0) { %>
            <button>Add to Cart</button>
        <% } else { %>
            <span>Out of Stock</span>
        <% } %>
    </div>
<% }); %>
```


### **3. Forms with Errors**

```ejs
<% if(errors.length > 0) { %>
    <div class="errors">
        <% errors.forEach(error => { %>
            <p style="color:red"><%= error %></p>
        <% }); %>
    </div>
<% } %>
```


## **Complete E-commerce Example**

```javascript
// Backend data
app.get('/shop', (req, res) => {
    res.render('shop', {
        products: [
            { id: 1, name: 'iPhone', price: 80000, stock: 5 },
            { id: 2, name: 'Laptop', price: 50000, stock: 0 },
            { id: 3, name: 'Headphones', price: 3000, stock: 20 }
        ],
        cartCount: 2
    });
});
```

**views/shop.ejs:**

```html
<h1>🛒 Online Store (Cart: <%= cartCount %>)</h1>
<div class="products">
    <% products.forEach(p => { %>
        <div class="card">
            <h3><%= p.name %></h3>
            <p>₹<%= p.price %></p>
            <% if(p.stock > 0) { %>
                <button>Add to Cart</button>
            <% } else { %>
                <span class="soldout">🛑 Sold Out</span>
            <% } %>
        </div>
    <% }); %>
</div>
```


## **Where EJS MOST Used (2026 Industry Reality)**

```
✅ 1. Admin Dashboards (90%)
✅ 2. E-commerce sites (70%)  
✅ 3. Internal tools (80%)
✅ 4. Reports generation (60%)
✅ 5. Email templates (50%)
❌ 6. Public SPA (React/Vue use karte hain)
```


## **EJS vs React (When Use What)**

```
EJS → Server-side, simple pages, admin panels
React → SPA, complex UI, public websites
```


## **Pro Tips (Production Ready)**

```javascript
// 1. Layouts (header/footer reuse)
<%- include('partials/header') %>
Main content here
<%- include('partials/footer') %>

// 2. Partials folder banao
views/
├── partials/
│   ├── header.ejs
│   └── footer.ejs
└── pages/
    ├── home.ejs
    └── shop.ejs
```


## **Learning Priority**

```
✅ 1. Setup (app.set('view engine', 'ejs'))
✅ 2. <%= %> <% %> tags master
✅ 3. res.render('file', {data})
✅ 4. Loops/conditions
✅ 5. Includes/Partials
```

**🎯 EJS = Dynamic HTML generator!**

**Most used: Admin panels + E-commerce product lists!** 🚀

**Practice: Shop page banao → Products loop → Backend frontend ready!** 😎
<span style="display:none">[^1][^10][^2][^3][^4][^5][^6][^7][^8][^9]</span>

<div align="center">⁂</div>

[^1]: https://www.geeksforgeeks.org/node-js/ejs-template-engine-for-express/

[^2]: https://expressjs.com/en/guide/using-template-engines.html

[^3]: https://www.topcoder.com/thrive/articles/using-ejs-template-engine-with-express-js

[^4]: https://www.youtube.com/watch?v=KtSMkCWM0oM

[^5]: https://www.w3schools.in/express-js/ejs-templating

[^6]: https://www.pabbly.com/tutorials/template-engine-in-expressjs/

[^7]: https://www.geeksforgeeks.org/node-js/use-ejs-as-template-engine-in-node-js/

[^8]: https://www.digitalocean.com/community/tutorials/how-to-use-ejs-to-template-your-node-application

[^9]: https://blog.logrocket.com/how-to-use-ejs-template-node-js-application/

[^10]: https://pieces.app/blog/serverside-rendering-with-express-and-ejs-templates

