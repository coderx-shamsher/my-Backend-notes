<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# **Node.js fs: `rename()`, `mkdir()`, Read Files/Folders - Complete Guide**

## **1. `rename()` - File/Folder Ka Naam Badlo/Move Karo**

```
rename(oldPath, newPath)
```

```javascript
const fs = require('fs');

// File rename
fs.rename('old.txt', 'new.txt', (err) => {
    if(err) console.error(err);
    console.log('✅ Renamed!');
});

// Folder rename + move
fs.rename('./old-folder', './new-location/my-folder', (err) => {
    console.log(err ? '❌ Error' : '✅ Moved!');
});

// Sync version
fs.renameSync('file.txt', 'new-file.txt');
```


## **2. `mkdir()` - Folder Banaye**

```
mkdir(folderPath, [options])
```

```javascript
// Simple folder
fs.mkdir('uploads', (err) => {
    console.log(err ? '❌ Error' : '✅ Folder created');
});

// Nested folders (parents bhi banao)
fs.mkdir('uploads/images/thumbs', { recursive: true }, (err) => {
    console.log('✅ Nested folders ready');
});

// Sync
fs.mkdirSync('temp', { recursive: true });
```


## **3. Read Files - `readFile()`**

```
readFile(path, encoding, callback)
```

```javascript
// Text file
fs.readFile('data.txt', 'utf8', (err, data) => {
    if(err) console.error(err);
    else console.log(data);  // File content as string
});

// JSON file
fs.readFile('users.json', 'utf8', (err, data) => {
    const users = JSON.parse(data);
    console.log(users);
});

// Binary (images)
fs.readFile('photo.jpg', (err, buffer) => {
    console.log(buffer.length, 'bytes');
});
```


## **4. Read Folders - `readdir()`**

```
readdir(folderPath, callback)
```

```javascript
// List all files/folders
fs.readdir('./uploads', (err, files) => {
    console.log(files);  // ['file1.jpg', 'file2.png']
});

// Files only (no folders)
fs.readdir('./uploads', { withFileTypes: true }, (err, items) => {
    items.forEach(item => {
        if(item.isFile()) console.log('File:', item.name);
        if(item.isDirectory()) console.log('Folder:', item.name);
    });
});
```


## **Decision Matrix - Kab Kaun Use Karo**

| **Task** | **Method** | **Async** | **Sync** |
| :-- | :-- | :-- | :-- |
| Rename file/folder | `rename()` | `fs.rename()` | `fs.renameSync()` |
| Create folder | `mkdir()` | `fs.mkdir()` | `fs.mkdirSync()` |
| Read text/JSON | `readFile()` | `fs.readFile()` | `fs.readFileSync()` |
| List folder contents | `readdir()` | `fs.readdir()` | `fs.readdirSync()` |

## **Complete Real Example**

```javascript
const fs = require('fs');

// 1. Create folder structure
fs.mkdirSync('user-data', { recursive: true });

// 2. Write user data
fs.writeFileSync('user-data/users.json', JSON.stringify([
    {id:1, name:'Rahul'}, {id:2, name:'Priya'}
], null, 2));

// 3. Read and process
const users = JSON.parse(fs.readFileSync('user-data/users.json', 'utf8'));
console.log('Users:', users);

// 4. Create uploads per user
users.forEach(user => {
    fs.mkdirSync(`user-data/uploads/user-${user.id}`, { recursive: true });
});

// 5. List everything
fs.readdirSync('user-data').forEach(item => {
    console.log('Found:', item);
});
```


## **Modern Promise Style (Production Ready)**

```javascript
const fs = require('fs').promises;

async function setupProject() {
    await fs.mkdir('project/uploads', { recursive: true });
    await fs.writeFile('project/info.json', JSON.stringify({version: '1.0'}));
    const files = await fs.readdir('project');
    console.log('Project ready:', files);
}

setupProject().catch(console.error);
```


## **Quick Rules**

```
Rename = fs.rename()
Folder banao = fs.mkdir({recursive:true})
File padho = fs.readFile(path, 'utf8')
Folder dekho = fs.readdir()

Pro tip: fs.promises use karo everywhere!
```

**Practice:** Create full project folder → users.json → uploads/user1/ → Backend ready! 🎯
<!-- <span style="display:none">[^1][^10][^2][^3][^4][^5][^6][^7][^8][^9]</span>


[^1]: https://dev.to/emkay860/read-and-rename-all-files-in-a-directory-with-nodejs-2dfo

[^2]: https://flaviocopes.com/node-mass-rename-files/

[^3]: https://blog.kevinchisholm.com/javascript/node-js/renaming-a-file-with-node-js/

[^4]: https://nodejs.org/en/learn/manipulating-files/working-with-folders-in-nodejs

[^5]: https://www.geeksforgeeks.org/javascript/node-js-fs-rename-method/

[^6]: https://mdawar.dev/blog/node-js-move-file

[^7]: https://nodejs.org/api/fs.html

[^8]: https://www.geeksforgeeks.org/node-js/node-js-fs-mkdir-method/

[^9]: https://www.youtube.com/watch?v=OYuWDe_LSbE

[^10]: https://www.w3schools.com/nodejs/nodejs_filesystem.asp -->


<div align="center">⁂</div>