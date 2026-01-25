<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# **Express Router - Complete Setup (EASY → MEDIUM → PRO)** 🚀

## **📁 BEST \& EASY File Structure (Start Here)**

```
blog-app/
├── public/           ← CSS/JS/Images
│   ├── css/
│   └── js/
├── routes/           ← 🔥 ROUTERS YAHAN!
│   ├── blog.js       ← Blog routes
│   └── users.js      ← User routes
├── views/            ← EJS templates
├── app.js            ← Main app
├── package.json
└── server.js         ← Production entry
```


## **STEP 1: EASY - Basic Router Setup (Copy-Paste)**

### **1. app.js (Main File - 20 Lines Only!)**

```javascript
const express = require('express');
const path = require('path');
const app = express();

// Static files
app.use(express.static('public'));

// 🔥 ROUTERS IMPORT & MOUNT
const blogRoutes = require('./routes/blog');
const userRoutes = require('./routes/users');

app.use('/blog', blogRoutes);     // /blog/*
app.use('/users', userRoutes);    // /users/*

app.listen(3000, () => {
    console.log('Server: http://localhost:3000');
});
```


### **2. routes/blog.js (Blog Router)**

```javascript
const express = require('express');
const router = express.Router();  // 🔥 MINI APP!

// Blog-specific middleware
router.use((req, res, next) => {
    console.log('📝 Blog route hit:', req.originalUrl);
    next();
});

// Routes
router.get('/', (req, res) => {
    res.send('📰 Blog Home');
});

router.get('/about', (req, res) => {
    res.send('📖 About Blog');
});

router.get('/:slug', (req, res) => {
    res.send(`📄 Blog Post: ${req.params.slug}`);
});

module.exports = router;  // Export for app.js
```


### **3. routes/users.js (User Router)**

```javascript
const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    console.log('👤 User route hit');
    next();
});

router.get('/', (req, res) => {
    res.send('👥 All Users');
});

router.get('/:id', (req, res) => {
    res.send(`👤 User ID: ${req.params.id}`);
});

module.exports = router;
```


## **🎯 RESULT URLs (Magic!)**

```
✅ http://localhost:3000/blog/           → Blog Home
✅ http://localhost:3000/blog/about      → About Blog  
✅ http://localhost:3000/blog/my-post    → Blog Post: my-post
✅ http://localhost:3000/users/          → All Users
✅ http://localhost:3000/users/123       → User ID: 123
```


## **STEP 2: MEDIUM - Controllers + Better Structure**

```
blog-app/
├── controllers/       ← Logic yahan
│   ├── blogController.js
│   └── userController.js
├── middleware/        ← Common middleware
│   └── auth.js
├── routes/
│   ├── blog.js
│   └── users.js
├── app.js
└── package.json
```


### **controllers/blogController.js**

```javascript
// Pure functions - No Express dependency
exports.getBlogHome = (req, res) => {
    res.json({ title: 'Blog Home', posts: ['post1', 'post2'] });
};

exports.getBlogPost = (req, res) => {
    res.json({ slug: req.params.slug, content: 'Post content' });
};

exports.getAbout = (req, res) => {
    res.json({ message: 'About our blog' });
};
```


### **routes/blog.js (Updated)**

```javascript
const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

// Connect controller functions
router.get('/', blogController.getBlogHome);
router.get('/about', blogController.getAbout);
router.get('/:slug', blogController.getBlogPost);

module.exports = router;
```


## **STEP 3: PRO Structure (Production Ready)**

```
blog-app/
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   │   ├── index.js     ← Master router
│   │   ├── blog.js
│   │   └── users.js
│   └── utils/
├── public/
├── views/
├── config/
│   └── database.js
├── app.js
├── server.js
└── package.json
```


### **routes/index.js (Master Router)**

```javascript
const express = require('express');
const router = express.Router();

const blogRoutes = require('./blog');
const userRoutes = require('./users');

// Master mounting
router.use('/blog', blogRoutes);
router.use('/api/users', userRoutes);

module.exports = router;
```


### **app.js (Clean!)**

```javascript
const express = require('express');
const path = require('path');
const mainRouter = require('./src/routes');

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 🔥 Single router mount
app.use('/', mainRouter);

module.exports = app;
```


## **🚀 QUICK START COMMANDS**

```bash
mkdir blog-app
cd blog-app
npm init -y
npm install express
mkdir routes controllers middleware public views src
# Copy files above → node app.js
```


## **📊 Learning Priority**

```
✅ EASY (1 hour): Basic router + 2 files
✅ MEDIUM (2 hours): Controllers + middleware  
✅ PRO (4 hours): Master router + folder structure
```


## **Hinglish Bottom Line**

```
Router = MINI EXPRESS APP har feature ke liye
app.js = SIRF routers connect karta hai (20 lines)
routes/ folder = Har feature apni file

Small app = Basic structure
Big app = Controllers + Master router

Copy EASY structure → 30 min mein complete blog app ready!
```

**🎯 Start with EASY → Scale to PRO!** 😎
<span style="display:none">[^1][^10][^2][^3][^4][^5][^6][^7][^8][^9]</span>

<div align="center">⁂</div>

[^1]: https://www.dhiwise.com/post/express-js-folder-structure-best-practices-for-clean-code

[^2]: https://www.codemzy.com/blog/nodejs-file-folder-structure

[^3]: https://www.youtube.com/watch?v=MdtrrGCvTiQ

[^4]: https://www.reddit.com/r/node/comments/bol0fq/how_can_i_organize_my_express_router_routes_better/

[^5]: https://stackoverflow.com/questions/37167602/typescript-node-js-express-routes-separated-files-best-practices

[^6]: https://stackoverflow.com/questions/59681974/how-to-organize-routes-in-nodejs-express-app

[^7]: https://dev.to/mr_ali3n/folder-structure-for-nodejs-expressjs-project-435l

[^8]: https://dev.to/moibra/best-practices-for-structuring-an-expressjs-project-148i

[^9]: https://www.reddit.com/r/node/comments/12aatt9/project_file_structure_and_best_practices_you/

[^10]: https://treblle.com/blog/egergr

