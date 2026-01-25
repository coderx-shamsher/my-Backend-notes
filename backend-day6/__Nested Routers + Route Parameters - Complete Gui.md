<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# **Nested Routers + Route Parameters - Complete Guide** 🛠️

## **📚 Nested Routers Kya Hai?**

```
Router ke ANDAR dusra Router lagana
Parent → Child hierarchy ban jata hai
```


## **🎯 File Structure (Production Ready)**

```
blog-app/
├── routes/
│   ├── index.js           ← Master Router
│   ├── blog.js            ← Parent Blog Router
│   │   └── posts.js       ← Child Posts Router (Nested!)
│   └── users.js
├── controllers/
└── app.js
```


## **🔥 COMPLETE CODE EXAMPLE**

### **1. app.js (Main Entry)**

```javascript
const express = require('express');
const mainRouter = require('./routes');

const app = express();
app.use(express.json());
app.use('/api', mainRouter);  // All routes /api/ ke niche

app.listen(3000);
```


### **2. routes/index.js (Master Router)**

```javascript
const express = require('express');
const router = express.Router();

router.use('/blog', require('./blog'));  // Nested: /api/blog/*
router.use('/users', require('./users')); // Nested: /api/users/*

module.exports = router;
```


### **3. routes/blog.js (PARENT ROUTER)**

```javascript
const express = require('express');
const router = express.Router();

// Blog middleware (sirf blog routes pe)
router.use((req, res, next) => {
    console.log('📝 Blog middleware');
    next();
});

// Blog home
router.get('/', (req, res) => {
    res.json({ message: 'Blog Home' });
});

// 🔥 NESTED CHILD ROUTER (Posts)
router.use('/posts', require('./posts'));

module.exports = router;
```


### **4. routes/posts.js (CHILD ROUTER - Nested!)**

```javascript
const express = require('express');
const router = express.Router({ mergeParams: true });  // 🔥 MAGIC LINE!

// Posts middleware
router.use((req, res, next) => {
    console.log('📄 Posts middleware');
    next();
});

// All posts
router.get('/', (req, res) => {
    res.json({ posts: ['post1', 'post2'] });
});

// Single post with params
router.get('/:postId', (req, res) => {
    res.json({ 
        postId: req.params.postId,
        blogId: req.params.blogId  // 🔥 Parent param bhi mila!
    });
});

module.exports = router;
```


## **🎬 RESULT URLs (Magic!)**

```
✅ GET /api/blog/                    → Blog Home  
✅ GET /api/blog/posts/              → All Posts
✅ GET /api/blog/posts/123           → Post 123 (blog context)
```


## **🔥 ROUTE PARAMETER HANDLING - Deep Dive**

### **Problem WITHOUT `mergeParams: true`**

```javascript
// routes/blog.js
router.use('/posts', require('./posts'));

// routes/posts.js  
router.get('/:postId', (req, res) => {
    console.log(req.params);  // { postId: "123" } ❌ blogId missing!
});
```


### **✅ Solution WITH `mergeParams: true`**

```javascript
// routes/posts.js
const router = express.Router({ mergeParams: true });  // Parent params inherit

router.get('/:postId', (req, res) => {
    console.log(req.params);
    // { blogId: "xyz", postId: "123" } ✅ BOTH params!
});
```


## **📊 Parameter Flow Visual**

```
Request: /api/blog/xyz/posts/123
         ↓
1. mainRouter (/api)
2. blogRouter  (/blog)     → req.params.blogId = "xyz"
3. postsRouter (/posts)    → req.params.postId = "123" 
4. Handler gets BOTH params ✅
```


## **🎯 ADVANCED: Multi-Level Nesting**

```
routes/
├── shop.js
│   └── products.js
│       └── reviews.js      ← 3 Levels deep!
```

**routes/shop.js:**

```javascript
router.use('/products', require('./products'));
```

**routes/products.js:**

```javascript
const router = express.Router({ mergeParams: true });
router.use('/reviews', require('./reviews'));
router.get('/:productId', ...);
```

**routes/reviews.js:**

```javascript
const router = express.Router({ mergeParams: true });
router.get('/:reviewId', (req, res) => {
    // Gets: shopId, productId, reviewId - ALL 3 levels!
    res.json(req.params);
});
```

**URLs:**

```
✅ /api/shop/laptop/products/123/reviews/456
```


## **⚠️ Common Mistakes \& Fixes**

### **❌ Mistake 1: Missing mergeParams**

```javascript
// Child router mein parent params nahi milenge
router.get('/:childId', (req, res) => {
    console.log(req.params.childId);  // OK
    console.log(req.params.parentId); // undefined ❌
});
```


### **✅ Fix:**

```javascript
const router = express.Router({ mergeParams: true });
```


### **❌ Mistake 2: Wrong Mounting**

```javascript
// DON'T do this
app.use('/blog', blogRouter);
app.use('/blog/posts', postsRouter);  // Conflict!
```


### **✅ Correct:**

```javascript
// NEST inside parent
blogRouter.use('/posts', postsRouter);
```


## **🚀 Production Pattern**

```
Final URLs:
/api/blog/                 → Blog home
/api/blog/posts/           → All posts
/api/blog/posts/123        → Single post
/api/blog/posts/123/comments/ → Post comments
```


## **Hinglish Bottom Line**

```
Nested Router = Router ke ANDAR Router
mergeParams: true = Parent ke params child ko pass karo
/blog/posts/123 = blogRouter → postsRouter → Handler

3 levels nesting bhi possible! E-commerce perfect hai iske liye!
```

**🎯 Copy complete structure → /api/blog/posts/123 test karo!** 😎
<span style="display:none">[^1][^10][^2][^3][^4][^5][^6][^7][^8][^9]</span>

<div align="center">⁂</div>

[^1]: https://www.geeksforgeeks.org/node-js/how-do-you-handle-nested-routes-in-express-js/

[^2]: https://stackoverflow.com/questions/25260818/rest-with-express-js-nested-router

[^3]: https://stackoverflow.com/questions/69831466/express-using-multi-nested-routers

[^4]: https://www.reddit.com/r/node/comments/10vyamb/how_to_handle_routes_in_expressjs/

[^5]: https://gist.github.com/zcaceres/f38b208a492e4dcd45f487638eff716c

[^6]: https://expressjs.com/en/guide/routing.html

[^7]: https://www.geeksforgeeks.org/node-js/how-to-handle-route-parameters-in-express/

[^8]: https://javanexus.com/blog/nested-routes-restful-expressjs-api

[^9]: https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Express_Nodejs/routes

[^10]: https://dev.to/msnmongare/a-practical-guide-to-routes-and-routers-in-expressjs-324

