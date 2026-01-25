<!-- <img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/> -->

# **Query Strings vs Route Parameters - Pure Theory** 📚

## **Route Parameters (:id)**

```
**Kya hai:** URL PATH ka hissa (colon wala)
**Syntax:** /users/:id, /products/:category/:id  
**Location:** URL structure mein
**Access:** req.params.id
**Example:** /users/123 → req.params.id = "123"
```


## **Query Strings (?key=value)**

```
**Kya hai:** URL ke END mein ? ke baad
**Syntax:** /users?page=2&limit=10
**Location:** URL tail mein  
**Access:** req.query.page
**Example:** /users?page=2 → req.query.page = "2"
```


## **Core Technical Difference**

| **Aspect** | **Route Parameters** | **Query Strings** |
| :-- | :-- | :-- |
| **URL Part** | **PATH** `/users/:id` | **QUERY** `/users?page=2` |
| **Position** | Fixed position | End mein ? ke baad |
| **Required** | **YES** (route match ke liye) | **NO** (optional) |
| **SEO** | **Better** (clean URLs) | Normal |
| **HTTP Method** | GET/PUT/DELETE sab mein | Mostly GET |
| **Object** | `req.params` | `req.query` |

## **Visual URL Breakdown**

```
ROUTE PARAM:  /api/users/123/profile
              ↑     ↑    ↑
            base  /:id   /profile

QUERY PARAM:  /api/users?page=2&limit=10&sort=name
              ↑     ↑
            base  query string
```


## **Access Method**

```javascript
// ROUTE PARAMS
app.get('/users/:id', (req, res) => {
    console.log(req.params.id);  // "123"
});

// QUERY PARAMS
app.get('/users', (req, res) => {
    console.log(req.query.page);  // "2"
});
```


## **Fundamental Purpose**

```
**Route Params:** "Main resource identify karo"
→ /users/123 = User ID 123 dhundho

**Query Params:** "Extra instructions do"  
→ /users?page=2 = Users list do, page 2 pe
```

**Yahi hai asli theory difference!** 🎯


# **Query Strings vs Route Parameters - Clear Decision Guide** 🎯

## **1 Line Rule:**

```
Route Params (:id) = "KAUN SA resource chahiye?"
Query Strings (?page=2) = "KAISAA dikhana hai?"
```


## **Visual Example**

```
ROUTE PARAMS:     /users/123         → Specific USER ID 123
QUERY PARAMS:     /users?page=2      → Users list, page 2
```


## **Decision Matrix - Kab Kya Use Karo**

| **Use Case** | **Route Params (:id)** | **Query Params (?key=value)** | **Example** |
| :-- | :-- | :-- | :-- |
| **Specific Resource** | ✅ **BEST** | ❌ | `/users/123` |
| **Resource List + Filter** | ❌ | ✅ **BEST** | `/users?page=2&limit=10` |
| **Search** | ❌ | ✅ | `/products?q=laptop` |
| **Sorting** | ❌ | ✅ | `/products?sort=price` |
| **Pagination** | ❌ | ✅ | `/posts?page=3` |
| **Optional Filters** | ❌ | ✅ | `/users?active=true` |

## **Practical Code Examples**

### **✅ ROUTE PARAMS (Resource Identification)**

```javascript
// GOOD: Specific user profile
app.get('/users/:id', (req, res) => {
    const userId = req.params.id;  // "123"
    res.json({ userId, name: 'Rahul' });
});

// GOOD: Nested resources  
app.get('/products/:category/:id', (req, res) => {
    const { category, id } = req.params;
    res.json({ category, productId: id });
});
```

**URLs:**

```
✅ /users/123
✅ /products/laptop/456
```


### **✅ QUERY PARAMS (Filters/Search)**

```javascript
// GOOD: Product search + filters
app.get('/products', (req, res) => {
    const { q, category, page = 1, limit = 10, sort = 'name' } = req.query;
    res.json({ 
        search: q, 
        category, 
        page: parseInt(page),
        results: [] 
    });
});
```

**URLs:**

```
✅ /products?q=laptop
✅ /products?category=electronics&page=2
✅ /products?sort=price&limit=20
```


## **❌ WRONG Usage Examples**

```javascript
// ❌ BAD: Pagination in route params
app.get('/users/page/:pageNumber', ...)  // Ugly!

// ✅ GOOD:
app.get('/users', (req, res) => {
    const page = req.query.page;  // Clean!
});

// ❌ BAD: User ID in query params  
app.get('/users', (req, res) => {
    const id = req.query.id;  // Confusing!
});

// ✅ GOOD:
app.get('/users/:id', ...);
```


## **Real-World E-commerce API**

```javascript
// Products API - Perfect Mix
app.get('/api/products', (req, res) => {
    // Query params for filtering
    const { category, priceMin, priceMax, page = 1, limit = 20 } = req.query;
    res.json({ filters: req.query, products: [] });
});

app.get('/api/products/:id', (req, res) => {
    // Route param for specific product
    const productId = req.params.id;
    res.json({ id: productId, name: 'iPhone 15' });
});

app.get('/api/products/:category/:id', (req, res) => {
    // Nested resources
    const { category, id } = req.params;
    res.json({ category, id });
});
```

**Test URLs:**

```
✅ GET /api/products              → All products
✅ GET /api/products?category=laptop → Laptop products  
✅ GET /api/products?page=2       → Page 2
✅ GET /api/products/123          → Product 123 details
```


## **REST API Standards (Industry Practice)**

```
✅ /api/users/:id                    → GET specific user
✅ /api/users/:id/posts              → User posts
✅ /api/users/:id/posts/:postId      → Specific post

✅ /api/users?role=admin&page=1      → Admin users list
✅ /api/posts?author=rahul&sort=date → Rahul's posts
```


## **Quick Decision Flowchart**

```
Kya specific resource chahiye? (ID by name)
    ↓ YES → ROUTE PARAMS (:id)
    ↓ NO
List/filter/search hai?
    ↓ YES → QUERY PARAMS (?page=2)
```


## **Access Code Reference**

```javascript
// Route Params
req.params.id          // "/users/123" → "123"
req.params.category    // "/products/laptop/456" → "laptop"

// Query Params  
req.query.page         // "/users?page=2" → "2"
req.query.sort         // "/products?sort=price" → "price"
req.query              // All query params object
```


## **Hinglish Bottom Line**

```
:id = "Ye user/product dhundho"
?page=2 = "List dikhao, filter ke saath"

Resource identify → Route params
List modify → Query params

E-commerce, Blog, Admin panels = Dono MUST!
```

**🎯 Rule: ID = Route, Filter = Query!** 🚀
<!-- <span style="display:none">[^1][^10][^2][^3][^4][^5][^6][^7][^8][^9]</span> -->

<!-- 
[^1]: https://stackoverflow.com/questions/63205191/express-route-parameters-vs-http-query-parameters

[^2]: https://www.reddit.com/r/learnprogramming/comments/1hq4zpf/query_params_vs_path_params_in_expressjs/

[^3]: https://hackmd.io/@abernier/rJPKjpjhS

[^4]: https://www.geeksforgeeks.org/node-js/difference-between-req-query-and-req-params-in-express/

[^5]: https://codesignal.com/learn/courses/first-steps-into-back-end-engineering-with-expressjs/lessons/adding-route-parameters-and-query-parameters-in-expressjs

[^6]: https://expressjs.com/en/guide/routing.html

[^7]: https://www.reddit.com/r/node/comments/6i2bzo/routing_when_to_use_query_vs_params/

[^8]: https://www.youtube.com/watch?v=--TQwiNIw28

[^9]: https://www.dctacademy.com/blog/understanding-the-differences-between-req-query-and-req-params-in-express

[^10]: https://www.youtube.com/watch?v=YIYc_mDAReI -->


<div align="center">⁂</div>