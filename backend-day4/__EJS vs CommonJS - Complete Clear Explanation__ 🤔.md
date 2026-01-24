<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# **EJS vs CommonJS - Complete Clear Explanation** 🤔

## **EJS - Template Engine (HTML + JS Mix)**

```
EJS = "Embedded JavaScript" 
HTML mein JS daal ke dynamic pages banao
```

**Simple Analogy:**

```
HTML = Fixed content
EJS = HTML + JS variables/loops
```


### **EJS Example (Copy-Paste-Run)**

```javascript
// app.js
const express = require('express');
const app = express();

// EJS ko view engine banao
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home', { 
        name: 'Rahul', 
        users: ['Priya', 'Amit', 'Neha'],
        age: 25 
    });
});

app.listen(3000);
```

**views/home.ejs:**

```html
<!DOCTYPE html>
<html>
<head><title>Home</title></head>
<body>
    <h1>Hello <%= name %>!</h1>
    
    <% users.forEach(user => { %>
        <p>👤 <%= user %></p>
    <% }); %>
    
    <p>You are <%= age %> years old</p>
</body>
</html>
```

**Output:** Dynamic HTML with Rahul's name + user list!

**EJS Tags:**

```
<%= variable %>     → Print (safe/escaped)
<%- variable %>    → Print (raw HTML)
<% logic %>         → JS code (no print)
<%# comment %>      → Comment
```


## **CommonJS - Module System (require/export)**

```
CommonJS = Node.js ka original module system
require() → Import
module.exports → Export
```


### **CommonJS Example**

```javascript
// math.js
function add(a, b) {
    return a + b;
}

module.exports = { add };  // Export

// app.js  
const math = require('./math');  // Import
console.log(math.add(5, 3));  // 8
```


## **EJS vs CommonJS - Side-by-Side**

| **Aspect** | **EJS** | **CommonJS** |
| :-- | :-- | :-- |
| **Purpose** | HTML templates | Code modules |
| **Syntax** | `<%= name %>` | `require/export` |
| **Use** | Views/UI | Logic/Functions |
| **Files** | `.ejs` | `.js` |
| **Example** | `res.render('home')` | `require('fs')` |

## **Real Project Structure**

```
my-app/
├── app.js              (CommonJS - require express)
├── views/
│   └── home.ejs        (EJS - HTML templates)
├── utils/
│   └── math.js         (CommonJS - functions)
└── package.json
```


## **Complete Working Example (EJS + CommonJS)**

**utils/users.js (CommonJS):**

```javascript
const users = [
    { name: 'Rahul', age: 25 },
    { name: 'Priya', age: 22 }
];

module.exports = users;
```

**app.js (Main - CommonJS + EJS):**

```javascript
const express = require('express');     // CommonJS
const users = require('./utils/users'); // CommonJS
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', { users });  // EJS render
});

app.listen(3000);
```

**views/index.ejs (EJS):**

```html
<h1>Users List</h1>
<% users.forEach(user => { %>
    <div><%= user.name %> - <%= user.age %> yrs</div>
<% }); %>
```


## **Hinglish Summary**

```
EJS = HTML + JS = Dynamic webpages banao
CommonJS = require/export = Code files share karo

Together = Backend + Frontend perfect combo!
```

```
Daily Use:
✅ Express app.js → CommonJS (require)
✅ HTML pages → EJS (views folder)
✅ Utils/DB → CommonJS modules
```

**🎯 Clear? EJS = HTML magic, CommonJS = Code sharing!** 🚀

**Practice: EJS views folder banao → Dynamic users list!** 😎
<span style="display:none">[^1][^10][^2][^3][^4][^5][^6][^7][^8][^9]</span>

<div align="center">⁂</div>

[^1]: https://www.geeksforgeeks.org/node-js/use-ejs-as-template-engine-in-node-js/

[^2]: https://www.digitalocean.com/community/tutorials/how-to-use-ejs-to-template-your-node-application

[^3]: https://blog.logrocket.com/how-to-use-ejs-template-node-js-application/

[^4]: https://www.youtube.com/watch?v=EYKjBJDPvEU

[^5]: https://www.geeksforgeeks.org/node-js/how-to-install-use-ejs-template-engine/

[^6]: https://dev.to/ugorji_simon/how-to-use-embedded-javascript-ejs-as-a-template-engine-in-nodejs-full-explanation-7m5

[^7]: https://www.youtube.com/watch?v=AHtSPnHb7Cs

[^8]: https://www.topcoder.com/thrive/articles/using-ejs-template-engine-with-express-js

[^9]: https://www.youtube.com/watch?v=eg244TvZHyU

[^10]: https://www.youtube.com/watch?v=KtSMkCWM0oM

