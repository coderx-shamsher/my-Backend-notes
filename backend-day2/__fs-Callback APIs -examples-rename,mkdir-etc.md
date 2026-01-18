<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# **fs Callback APIs - Callback Style Examples Only**

**Callback Pattern:** `fs.method(path, callback)`
**Callback Format:** `(err, result) => { ... }`
**Rule:** `err` pehle, success data baad mein

## **1. `rename()` - Callback Style**

```javascript
const fs = require('fs');

// File rename
fs.rename('old.txt', 'new.txt', (err) => {
    if(err) {
        console.error('❌ Rename failed:', err.message);
        return;
    }
    console.log('✅ File renamed to new.txt');
});

// Folder move
fs.rename('./old-folder', './new-folder', (err) => {
    if(err) console.error('❌ Move failed');
    else console.log('✅ Folder moved');
});
```


## **2. `mkdir()` - Callback Style**

```javascript
// Simple folder
fs.mkdir('uploads', (err) => {
    if(err) {
        console.error('❌ Folder creation failed:', err.message);
        return;
    }
    console.log('✅ uploads folder created');
});

// Nested folders
fs.mkdir('uploads/images/thumbs', { recursive: true }, (err) => {
    if(err) console.error('❌ Nested folder error');
    else console.log('✅ Full folder structure ready');
});
```


## **3. Read Files - `readFile()` Callback**

```javascript
// Text file
fs.readFile('data.txt', 'utf8', (err, data) => {
    if(err) {
        console.error('❌ Read error:', err.message);
        return;
    }
    console.log('✅ File content:', data);
});

// JSON file
fs.readFile('users.json', 'utf8', (err, jsonData) => {
    if(err) {
        console.error('❌ JSON read error');
        return;
    }
    const users = JSON.parse(jsonData);
    console.log('✅ Users:', users);
});
```


## **4. Read Folders - `readdir()` Callback**

```javascript
// List files
fs.readdir('./uploads', (err, files) => {
    if(err) {
        console.error('❌ Folder read error:', err.message);
        return;
    }
    console.log('✅ Files:', files);
});

// With file types
fs.readdir('./uploads', { withFileTypes: true }, (err, dirents) => {
    if(err) return console.error('❌ Error:', err);
    
    dirents.forEach(dirent => {
        if(dirent.isFile()) console.log('📄 File:', dirent.name);
        if(dirent.isDirectory()) console.log('📁 Folder:', dirent.name);
    });
});
```


## **5. Complete Workflow - Callback Chain**

```javascript
const fs = require('fs');

// 1. Create folder
fs.mkdir('project', (err) => {
    if(err) return console.error('❌ Folder error');
    
    // 2. Write file
    fs.writeFile('project/data.json', JSON.stringify({name: 'Rahul'}), (err) => {
        if(err) return console.error('❌ Write error');
        
        // 3. Read back
        fs.readFile('project/data.json', 'utf8', (err, data) => {
            if(err) return console.error('❌ Read error');
            
            // 4. List contents
            fs.readdir('project', (err, files) => {
                if(err) return console.error('❌ List error');
                console.log('✅ Complete! Files:', files);
            });
        });
    });
});
```


## **Callback Error Pattern (MUST KNOW)**

```javascript
// Standard pattern
fs.method(path, (err, result) => {
    if(err) {
        console.error('❌ Error:', err.code, err.message);
        return;  // Early exit
    }
    // Success code here
    console.log('✅ Success:', result);
});
```


## **Quick Reference - Callback Style**

```
Rename:    fs.rename(old, new, callback)
mkdir:     fs.mkdir(folder, callback)
Read file: fs.readFile(path, 'utf8', callback)
Read dir:  fs.readdir(folder, callback)

Callback:  (err, result) => {
    if(err) return console.error(err);
    // Success code
}
```

**Pro Tip:** Har callback mein **if(err) return** pehla line! 🎯

**Practice:** Folder → File write → Read → List → Backend file ops master! 🚀
<span style="display:none">[^1][^10][^2][^3][^4][^5][^6][^7][^8][^9]</span>

<div align="center">⁂</div>

[^1]: https://www.cs.unb.ca/~bremner/teaching/cs2613/books/nodejs-api/fs/

[^2]: https://www.w3schools.com/nodejs/nodejs_filesystem.asp

[^3]: https://nodejs.org/docs/latest/api/fs.html

[^4]: https://www.geeksforgeeks.org/node-js/node-js-callback-concept/

[^5]: https://www.geeksforgeeks.org/node-js/node-js-file-system/

[^6]: https://node.readthedocs.io/en/latest/api/fs/

[^7]: https://www.freecodecamp.org/news/nodejs-callbacks/

[^8]: https://nodejs.org/api/fs.html

[^9]: https://omarsaade.hashnode.dev/ways-of-dealing-with-file-system-fs-in-nodejs

[^10]: https://www.sohamkamani.com/nodejs/file-system/

