<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# **Node.js Delete Methods: `rmdir`, `rm`, `unlink` - Complete Comparison**

## **1 Method = 1 Target (Simple Rule)**

```
unlink()  → FILE DELETE ONLY
rmdir()   → EMPTY FOLDER DELETE  
rm()      → EVERYTHING (Files + Folders + Subfolders)
```


## **Detailed Breakdown + Examples**

### **`unlink()` - Single File Killer**

```javascript
const fs = require('fs');

// ✅ File only
fs.unlink('hello.txt', (err) => {
    if(err) console.error(err);
    else console.log('✅ File deleted');
});

// ❌ ERROR - Won't work on folders
fs.unlink('myfolder', () => {});  // TypeError!
```

**Sync version:**

```javascript
fs.unlinkSync('hello.txt');
```


### **`rmdir()` / `rmdirSync()` - Empty Folder Only**

```javascript
// ✅ Empty folder only
fs.rmdir('empty-folder', (err) => {
    console.log(err ? '❌ Not empty!' : '✅ Empty folder deleted');
});

// ❌ ERROR - Folder has files
fs.rmdir('folder-with-files', () => {});  // ENOTEMPTY error
```


### **`rm()` - Nuclear Option (Node.js 14.14+)**

```javascript
const fs = require('fs').promises;

// ✅ Files + Folders + Everything
await fs.rm('anything', { recursive: true, force: true });
// recursive = Delete subfolders/files
// force = No error if missing
```


## **Side-by-Side Decision Matrix**

| **Target** | **Method** | **Async** | **Sync** | **Options** |
| :-- | :-- | :-- | :-- | :-- |
| **File** | `unlink()` | `fs.unlink()` | `fs.unlinkSync()` | None |
| **Empty Folder** | `rmdir()` | `fs.rmdir()` | `fs.rmdirSync()` | None |
| **Folder+Files** | `rm()` | `fs.rm()` | `fs.rmSync()` | `{recursive: true}` |

## **Real Examples (Same Folder Structure)**

```
myproject/
├── data.txt
├── uploads/
│   ├── photo.jpg
│   └── docs/
│       └── report.pdf
└── temp/
```

```javascript
// Delete single file
fs.unlinkSync('myproject/data.txt');  // ✅ Works

// Delete empty folder  
fs.rmdirSync('myproject/temp');       // ✅ Works (if empty)

// Delete entire uploads folder + contents
fs.rmSync('myproject/uploads', { recursive: true });  // ✅ Works
```


## **Hinglish Decision Tree**

```
FILE hai? → unlink()
EMPTY FOLDER? → rmdir()
FOLDER + FILES? → rm({recursive: true})

Simple:
1 file = unlink
1 empty folder = rmdir  
Anything else = rm
```


## **Production Code Patterns**

```javascript
const fs = require('fs').promises;

// Safe file delete
const deleteFile = async (path) => {
    try {
        await fs.unlink(path);
        console.log(`✅ ${path} deleted`);
    } catch(err) {
        if(err.code === 'ENOENT') console.log('File not found');
        else console.error(err);
    }
};

// Nuclear folder delete
const deleteFolder = async (path) => {
    await fs.rm(path, { recursive: true, force: true });
    console.log(`✅ ${path} nuked`);
};
```


## **Learning Priority (Interviews)**

```
1. rm({recursive:true}) - 90% use
2. unlink() - 8% use  
3. rmdir() - 2% use (rare)
```

**Pro Rule:** **`rm()` covers 99% cases**. Others for special needs only! 🎯
<span style="display:none">[^1][^10][^2][^3][^4][^5][^6][^7][^8][^9]</span>

<div align="center">⁂</div>

[^1]: https://www.geeksforgeeks.org/node-js/node-js-fs-unlink-method/

[^2]: https://blog.csdn.net/weixin_64684095/article/details/146003408

[^3]: https://www.youtube.com/watch?v=pWRcazOOf-g

[^4]: https://www.geeksforgeeks.org/node-js/node-js-fs-unlinksync-method/

[^5]: https://how.dev/answers/fsrmdir-vs-fsrmdirsync-in-nodejs

[^6]: https://stackoverflow.com/questions/5315138/node-js-remove-file

[^7]: https://www.baeldung.com/linux/rm-vs-unlink

[^8]: https://stackoverflow.com/questions/61260193/node-js-fs-unlink-vs-fs-extra-remove-to-delete-files-when-to-choose-which-one

[^9]: https://nodejs.org/api/fs.html

[^10]: https://dev.to/mccallum91/nodejs-file-system-utilizing-unlink-and-unlinksync-for-file-deletion-595e

