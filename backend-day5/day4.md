<!-- todays topics 
# Form handling and working with the forms 
handle backend process of forms and making ssure the data coming from any frontend lib, fw, templating engies , we still handle it at the same time 

#### set up you expressjs app in js file 
- This is hello world tamplate 
```js

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

```

#### Npm setup 
```bash 

 npm init -y 

``` 

* #### install the package name cookie-parser
```zsh
  npm install cookie-parser

```

### what is session and cookie
Cookies are small text files stored on your browser by a website to remember user info (like preferences or login status) for longer periods, while a session is a temporary server-side link for a single visit, storing data (like shopping cart contents) for that specific interaction and expiring when the browser closes, making sessions more secure for sensitive data. Both manage user state, but cookies are client-side, persistent (or temporary), and limited (4KB), whereas sessions are server-side, temporary, and store more data.

### Cookies
#### **What they are:**  
1) Small pieces of data stored by the browser on the user's device, sent back to the server with each request.
2) Purpose: Remembering user preferences, login status, tracking.
3) Storage: Client-side (browser).
4) Capacity: Limited (around 4KB).
5) Lifespan: Can be short (session cookies) or long (persistent cookies), set by expiration date.
---

### Sessions
#### **What they are:** 
1) A server-side storage mechanism for user-specific data during a single visit.
2) Purpose: Managing temporary user states like shopping carts, login details.
3) Storage: Server-side.
4) Capacity: Larger (e.g., 128MB limit per session).
5) Lifespan: Ends when the browser closes or the session times out. 
---
### Key Differences in Usage
* Login/Logout: Cookies can store a "remember me" token; sessions manage the active logged-in state.
* Shopping Carts: Cookies store small items (like a product ID); sessions hold the entire cart's data on the server.
* Personalization: Persistent cookies remember themes or language; sessions manage temporary page views


---

* so jb bhi hamm kisi bhi website of for example instagram pr ham kisi dost ki reels ko dekhna chaahte hain ton pahala insta bolega k login kro muje nhi pta tum  kon ho..? 
* then you fill your id passwd and see your dost ki reels or mmai bolo k har bar jad app insta open kroge app ko login credentials fill krne pardege ...
or yeh process bhot jada tang krega pareshan krne vala hai.. esa keo hota hai keo ka server hamme yad nhi rakhta means jab hamne reels dekhli kam katam hogya then hamne close kr di app to server ne hamme yad nhi rakha
> now jb bhi ap login krte ho to server app ko response krta hai and sath he ek string value app ko send krta hai keo ? tn k server app ko yaad rakh sake ! ap ko bar bar login krna na parde... now yeh string store hoti hai ek header mein name cookie, in your browser 

> now jab bhi ap (login krne k bad) insta open krte hon to ek request jati hai server tak to vo dekhta hai k acha ye request hai then vo check krta hai cookie mein string hai ? then vo match krta hai ager match ho gyi **(keo k ek cookie value ap k pass and ek server k pas hoti hai jis say match kr k server hamme yaad rakhta hai.. )** then ap ko relogin nhi krna pardega.  yeah string (cookie) har request k sath server tak jati hai.. 

> or now jab ap server say connect ho jitna time ho time hai session , so yehi story hai.. 
> session kiya hai jab tak ap login ho or app use kr rahe ho ho connect vo situation ho session hai jab app relogin krte ho to new session banega, login say logout tak 

> Note-- jb bhi ap login krte ho to data as normal text nhi jaata server tak vo jada hai as blobs or yeh unreadable hota hai means kuj random strings and numbers etc hota hai.. or blob main sari info hoti hai related to us or that's not readable... 

> now server koi us blob ko handle krna pardeda as readable how to do we add these line , yeh middlewares hai 

```js 
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
``` -->
