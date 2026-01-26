<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# **Error Fix: "data argument must be string/Buffer - Received undefined"** 🛠️

## **🚨 PROBLEM ROOT CAUSE**

```
req.body.detail = undefined (form data nahi aa raha)
fs.writeFile ko undefined pass kar rahe ho
Node.js 14+ mein undefined allow nahi karta
```


## **🔥 STEP-BY-STEP SOLUTION**

### **Step 1: Body Parser Middleware Add Karo (MAIN FIX)**

```javascript
const express = require('express');
const fs = require('fs');
const app = express();

// 🔥 YE 2 LINES ADD KARO (Form data milega)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/create', (req, res) => {
    console.log('Full req.body:', req.body);  // Debug
    console.log('TaskTitle:', req.body.TaskTitle);
    console.log('detail:', req.body.detail);  // Ye undefined tha!
    
    // ... rest code
});
```


### **Step 2: NULL Check Add Karo (Safe Code)**

```javascript
app.post('/create', (req, res) => {
    // 🔥 SAFETY CHECKS
    if(!req.body.TaskTitle || !req.body.detail) {
        return res.status(400).send('TaskTitle and detail required!');
    }
    
    const filename = req.body.TaskTitle.split(' ').join('') + '.txt';
    const content = req.body.detail;
    
    fs.writeFile(`./taskfiles/${filename}`, content, (err) => {
        if(err) {
            console.error('File error:', err);
            return res.status(500).send('File creation failed');
        }
        res.redirect('/');
    });
});
```


### **Step 3: Complete Working Code**

```javascript
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// 🔥 BODY PARSER (MANDATORY for forms)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Task files folder banao
const taskDir = './taskfiles';
if (!fs.existsSync(taskDir)) {
    fs.mkdirSync(taskDir);
}

// Routes
app.get('/', (req, res) => {
    res.send(`
        <form action="/create" method="POST">
            <input name="TaskTitle" placeholder="Task Title" required>
            <textarea name="detail" placeholder="Task Details" required></textarea>
            <button type="submit">Create Task</button>
        </form>
    `);
});

app.post('/create', (req, res) => {
    console.log('req.body:', req.body);  // Debug
    
    // Validation
    if(!req.body.TaskTitle || !req.body.detail) {
        return res.status(400).send('Missing data!');
    }
    
    const filename = req.body.TaskTitle.split(' ').join('') + '.txt';
    const content = req.body.detail;
    
    fs.writeFile(path.join(taskDir, filename), content, (err) => {
        if(err) {
            console.error(err);
            return res.status(500).send('Error creating file');
        }
        res.redirect('/');
    });
});

app.listen(3000, () => {
    console.log('Server: http://localhost:3000');
});
```


## **📋 HTML Form Check (name attributes sahi hain?)**

```html
<!-- name="TaskTitle" and name="detail" MUST match req.body -->
<form action="/create" method="POST">
    <input name="TaskTitle" placeholder="Title" required>  <!-- ✅ Correct -->
    <textarea name="detail" placeholder="Details" required></textarea> <!-- ✅ Correct -->
    <button type="submit">Save</button>
</form>
```


## **🎯 WHY Error Aaya? (Deep Reason)**

```
1. ❌ express.urlencoded() missing → req.body = {}
2. ❌ req.body.detail = undefined
3. ❌ fs.writeFile(filename, undefined, ...) → ERROR!
4. ✅ Node.js 14+ strict checking → undefined reject

Node.js 12 mein: undefined → "undefined" string likh deta tha
Node.js 14+: undefined → ERROR! (Better safety)
```


## **✅ TEST COMMANDS**

```bash
# 1. Dependencies check
npm list express ejs

# 2. Missing to install
npm install express

# 3. Server restart
node app.js

# 4. Test form
localhost:3000 → Form fill → Submit
```


## **🔍 Debug Commands**

```bash
# Form data check
curl -X POST http://localhost:3000/create \
  -d "TaskTitle=Test&detail=Hello World" \
  -H "Content-Type: application/x-www-form-urlencoded"
```


## **🚀 QUICK 3-LINE FIX**

```javascript
// Ye 2 lines app ke TOP pe add karo
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Ye check POST handler mein
if(!req.body.detail) return res.send('No data!');
```

**Run karo → Form data aa jayega!** 😎
<span style="display:none">[^1][^10][^2][^3][^4][^5][^6][^7][^8][^9]</span>

<div align="center">⁂</div>

[^1]: https://stackoverflow.com/questions/44703395/undefined-value-when-using-fs-writefile

[^2]: https://github.com/isaacs/node-graceful-fs/issues/211

[^3]: https://nodejs.org/api/fs.html

[^4]: https://www.digitalocean.com/community/tutorials/how-to-work-with-files-using-the-fs-module-in-node-js

[^5]: https://github.com/sbt/sbt-less/issues/105

[^6]: https://www.geeksforgeeks.org/node-js/node-js-fs-writefile-method/

[^7]: https://www.reddit.com/r/learnjavascript/comments/ltqvuy/nodejs_typeerror_when_writing_array_to_jsonfile/

[^8]: https://betterstack.com/community/guides/scaling-nodejs/nodejs-errors/

[^9]: https://www.honeybadger.io/blog/errors-nodejs/

[^10]: https://www.inflearn.com/community/questions/382568/fs-writefile-오류

