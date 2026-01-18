<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# **fs.writeFile() vs fs.writeFileSync() - Key Differences**

## **CORE DIFFERENCE (1 Line)**

```
writeFile()     → ASYNC (non-blocking, fast server)
writeFileSync() → SYNC (blocking, simple scripts)
```


## **Side-by-Side Visual Comparison**

```
Scenario: Write "Hello" to file

ASYNC (writeFile):
console.log('1.Start')
↓ writeFile("hello.txt", "Hello")  ← Runs in background
console.log('2.Continue')           ← Prints IMMEDIATELY
↓ (later) File written callback

SYNC (writeFileSync):
console.log('1.Start') 
↓ writeFileSync("hello.txt", "Hello")  ← WAITS here
console.log('2.Continue')              ← Prints AFTER file done
```


## **Decision Matrix - Kab Kaun Use Karo**

| **Use Case** | **Use** | **Why** |
| :-- | :-- | :-- |
| **Web Server/APIs** | `writeFile()` | Non-blocking (fast) |
| **CLI Tools/Scripts** | `writeFileSync()` | Simple, predictable |
| **Logs (high volume)** | `writeFile()` | Performance |
| **Config files** | `writeFileSync()` | Must complete first |
| **Beginner practice** | `writeFileSync()` | Easy debugging |

## **Code Examples (Same Result)**

```javascript
const fs = require('fs');

// ✅ SYNC - Simple (BLOCKS)
try {
    fs.writeFileSync('sync.txt', 'Hello Sync!');
    console.log('✅ Sync done');
} catch(err) {
    console.error('❌ Error:', err.message);
}

// ✅ ASYNC - Production (NON-BLOCKING)
fs.writeFile('async.txt', 'Hello Async!', (err) => {
    if(err) console.error('❌ Error:', err.message);
    else console.log('✅ Async done');
});

// Modern Promise (BEST)
const fsp = require('fs').promises;
async function modern() {
    await fsp.writeFile('modern.txt', 'Hello Modern!');
    console.log('✅ Modern done');
}
```


## **Hinglish Rule**

```
Server banaya? → writeFile() (tez)
Script likha? → writeFileSync() (simple)
Production? → fs.promises (pro)
```


## **Pro Recommendation**

```javascript
// Daily use - This pattern
const { writeFile } = require('fs').promises;

const saveData = async (data, filename) => {
    try {
        await writeFile(filename, JSON.stringify(data, null, 2));
        console.log(`✅ ${filename} saved`);
    } catch(err) {
        console.error(`❌ Error: ${err.message}`);
    }
};
```

**Production = 99% async**. **Learning = 80% sync** (easy). 🎯
<span style="display:none">[^1][^10][^2][^3][^4][^5][^6][^7][^8][^9]</span>

<div align="center">⁂</div>

[^1]: https://blog.risingstack.com/fs-module-in-node-js/

[^2]: https://www.browserstack.com/guide/write-files-using-fs-writefilesync-in-node-js

[^3]: https://blog.openreplay.com/node-js-file-writing-explained-fs-writefilesync/

[^4]: https://www.geeksforgeeks.org/node-js/node-js-fs-writefilesync-method/

[^5]: https://stackoverflow.com/questions/53337663/await-promisified-fs-writefile-vs-fs-writefilesync

[^6]: https://www.youtube.com/watch?v=ynpsQzv-OXM

[^7]: https://www.reddit.com/r/AskProgramming/comments/q21ozq/im_debating_if_i_want_to_use_fswritefile_or/

[^8]: https://stackoverflow.com/questions/52392818/writing-into-file-in-nodejs-using-fs-writefilesync

[^9]: https://nodejs.org/en/learn/manipulating-files/writing-files-with-nodejs

[^10]: https://blog.logrocket.com/using-writefilesync-node-js/

