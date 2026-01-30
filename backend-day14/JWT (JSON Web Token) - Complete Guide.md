<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# JWT (JSON Web Token) - Complete Guide

## 1️⃣ **Theory \& Full Definition**

### What is a Token?

**Token** = Digital "permission slip" or "ID card". Server gives you a unique string after login. You show this string on every request to prove "I'm logged in".

```
Plain Token: "abc123xyz"  (server remembers what it means)
JWT Token:  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."  (SELF-CONTAINED info)
```


### JWT Full Definition

**JSON Web Token (JWT)** = **Compact, secure, self-contained token** for authentication/authorization. It's a **3-part string** encoded in Base64:

```
HEADER.Payload.Signature
eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJKb2huIn0.signature123
```

**3 Parts Explained:**

1. **Header**: `{"alg": "HS256", "typ": "JWT"}` (what signing method)
2. **Payload**: `{"userId": 1, "name": "John", "role": "admin"}` (user data)
3. **Signature**: Server signs with secret key (prevents tampering)

**Why JWT?** Stateless—no server database lookup needed. Server just **verifies signature**.

## 🔑 **Cookie vs Token - Key Differences**

| **Cookies** | **JWT Tokens** |
| :-- | :-- |
| **Server stores** user session | **Token contains** all user info |
| Browser **auto-sends** every request | **Manual send** (Authorization header) |
| **Stateful** (server remembers) | **Stateless** (token self-contained) |
| Size: Small (just session ID) | Size: Larger (full user data) |
| **CSRF risk** | **XSS risk** (if localStorage) |
| Good for **traditional web apps** | Good for **APIs/SPAs/mobile** |

**Cookie Flow**: Login → Server saves session → Browser sends cookie auto
**JWT Flow**: Login → Server sends JWT → Client sends JWT manually

## 2️⃣ **Code Examples (Node.js + Full Explanation)**

### Setup (Install: `npm i jsonwebtoken express`)

```javascript
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
app.use(express.json());
```


### **Example 1: CREATE JWT (Login - Server Side)**

```javascript
// Secret key (keep hidden!)
const SECRET_KEY = "mySuperSecretKey123";

// User logs in
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  // 1. Check credentials (fake DB check)
  if (email === "john@example.com" && password === "pass123") {
    // 2. CREATE JWT - payload has user data
    const token = jwt.sign(
      { userId: 1, name: "John", role: "admin" },  // PAYLOAD: data inside token
      SECRET_KEY,                                  // SECRET: signs it
      { expiresIn: "1h" }                          // EXPIRES: auto logout
    );
    
    // 3. SEND token to client (can be cookie OR response)
    res.json({ token });  // Client stores it
  } else {
    res.status(401).json({ error: "Wrong credentials" });
  }
});
```

**Why each part?**

- `jwt.sign()`: Creates signed token
- **Payload**: User info (no passwords!)
- **Secret**: Your password—tamperers can't fake it
- **expiresIn**: Security—token dies after 1hr


### **Example 2: VERIFY JWT (Protect Routes)**

```javascript
// Middleware: Check token on EVERY protected route
function verifyToken(req, res, next) {
  // 1. Get token from Authorization header
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[^1];  // "Bearer <token>"
  
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }
  
  try {
    // 2. VERIFY signature + decode
    const decoded = jwt.verify(token, SECRET_KEY);
    
    // 3. Add user data to request
    req.user = decoded;  // {userId: 1, name: "John", role: "admin"}
    next();  // Continue to route
  } catch (error) {
    res.status(403).json({ error: "Invalid token" });
  }
}

// Protected route
app.get('/dashboard', verifyToken, (req, res) => {
  res.json({ 
    message: "Welcome to dashboard", 
    user: req.user  // From token!
  });
});
```

**Why each part?**

- `Authorization: Bearer <token>`: Standard header
- `jwt.verify()`: Checks signature + expiration
- `req.user`: Token data available everywhere


### **Example 3: Frontend Usage (JavaScript)**

```javascript
// 1. LOGIN → Get token
async function login() {
  const response = await fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'john@example.com', password: 'pass123' })
  });
  
  const data = await response.json();
  localStorage.setItem('token', data.token);  // Store token
}

// 2. Use token for protected API
async function getDashboard() {
  const token = localStorage.getItem('token');
  
  const response = await fetch('/dashboard', {
    headers: {
      'Authorization': `Bearer ${token}`  // Send token!
    }
  });
  
  const data = await response.json();
  console.log(data);  // {message: "Welcome...", user: {...}}
}
```


### **Example 4: Cookie vs JWT (Same Login, Different Storage)**

```javascript
// OPTION A: JWT in COOKIE (server sets)
app.post('/login-cookie', (req, res) => {
  const token = jwt.sign({ userId: 1 }, SECRET_KEY);
  res.cookie('jwt', token, { httpOnly: true });  // Secure cookie
  res.json({ message: "Logged in" });
});

// OPTION B: JWT in localStorage (client stores)
app.post('/login-token', (req, res) => {
  const token = jwt.sign({ userId: 1 }, SECRET_KEY);
  res.json({ token });  // Client saves to localStorage
});
```


## 🎯 **JWT Flow Summary**

```
1. User Login → Server creates JWT → Sends to client
2. Client stores JWT (localStorage/cookie)
3. Every request: Client sends "Bearer <JWT>"
4. Server verifies JWT → Grants access OR rejects
```

**Security**: Never put passwords in JWT payload. Use HTTPS always![^1][^2]
<span style="display:none">[^10][^3][^4][^5][^6][^7][^8][^9]</span>

<div align="center">⁂</div>

[^1]: https://stackoverflow.com/questions/37582444/jwt-vs-cookies-for-token-based-authentication

[^2]: https://developer.okta.com/blog/2022/02/08/cookies-vs-tokens

[^3]: https://www.reddit.com/r/webdev/comments/1ibe6u1/jwt_vs_cookies/

[^4]: https://strapi.io/blog/differences-between-jwt-and-jscookies

[^5]: https://learn.microsoft.com/en-us/answers/questions/1401728/difference-beetween-authentication-with-cookies-an

[^6]: https://stackoverflow.com/questions/27666810/json-web-token-jwt-advantages-disadvantages-over-cookies

[^7]: https://dev.to/truongpx396/jwt-tokens-vs-session-cookies-in-authentication-and-authorization-1o93

[^8]: https://www.youtube.com/watch?v=PEJXK_ku89s

[^9]: https://strapi.io/blog/introduction-to-jwt-and-cookie-storage

[^10]: https://jerrynsh.com/all-to-know-about-auth-and-cookies/

