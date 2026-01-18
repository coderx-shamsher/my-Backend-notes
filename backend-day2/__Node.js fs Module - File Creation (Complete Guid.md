<!-- <img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/> -->

# **Node.js fs Module - File Creation (Complete Guide)**

**Module:** `fs` (File System) - Built-in Node.js module, **no npm install needed**

## **3 Ways to Create Files (Best → Easy)**

#### NOTE --- check my day2.js file to see more code examples maine kaise code kra .... 
### **1. `fs.writeFile()` - MOST COMMON (Async)**

```javascript
const fs = require('fs');

// Create/overwrite file
fs.writeFile('hello.txt', 'Hello World!', (err) => {
    if(err) {
        console.error('Error:', err);
        return;
    }
    console.log('File created!');
});
```


### **2. `fs.writeFileSync()` - SIMPLE (Sync)**

```javascript
const fs = require('fs');

// Blocking - easy for beginners
fs.writeFileSync('hello.txt', 'Hello World!');
console.log('File created!');
```


### **3. `fs.appendFile()` - ADD DATA**

```javascript
fs.appendFile('hello.txt', '\nNew line!', (err) => {
    if(err) console.error(err);
    else console.log('Data appended!');
});
```


## **Complete Working Example**

```javascript
// create-file.js
const fs = require('fs');

// 1. Create file
fs.writeFileSync('notes.txt', 'My first Node.js file!');

// 2. Add more data
fs.appendFileSync('notes.txt', '\nLearning fs module');

// 3. Read to verify
const data = fs.readFileSync('notes.txt', 'utf8');
console.log('File content:', data);
```

**Run:** `node create-file.js`

## **Best Practices (Pro Level)**

```
✅ ALWAYS use try-catch with sync
✅ Use 'utf8' encoding for text
✅ Handle errors properly
✅ Async preferred in production
```

```javascript
// Production Ready
const fs = require('fs').promises;  // Modern async/await

async function createFile() {
    try {
        await fs.writeFile('data.json', JSON.stringify({name: 'Rahul'}, null, 2));
        console.log('✅ File created');
    } catch(err) {
        console.error('❌ Error:', err.message);
    }
}

createFile();
```


## **Practice Plan (1 Hour)**

```
1. Create 5 files with different names
2. Write JSON data (student records)
3. Append new students
4. Read and log content
5. Error handling practice
```

**Daily Use:** Logs, configs, CSV export, backups

**Priority:** **HIGH** for Node.js backend jobs! 🚀

**Next Practice:** Read files → Database → APIs
<span style="display:none">[^1][^10][^2][^3][^4][^5][^6][^7][^8][^9]</span>

<div align="center">⁂</div>

[^1]: https://www.digitalocean.com/community/tutorials/node-fs-js-create-file-read-write

[^2]: https://www.almabetter.com/bytes/tutorials/nodejs/fs-module-in-nodejs

[^3]: https://www.youtube.com/watch?v=qnm9xhE-qHU

[^4]: https://www.w3schools.com/nodejs/nodejs_filesystem.asp

[^5]: https://www.browserstack.com/guide/write-files-using-fs-writefilesync-in-node-js

[^6]: https://www.geeksforgeeks.org/node-js/node-js-fs-writefile-method/

[^7]: https://www.geeksforgeeks.org/node-js/node-js-file-system/

[^8]: https://nodejs.org/en/learn/manipulating-files/writing-files-with-nodejs

[^9]: https://nodejs.org/api/fs.html

[^10]: https://www.youtube.com/watch?v=iNdTorrjZCI

