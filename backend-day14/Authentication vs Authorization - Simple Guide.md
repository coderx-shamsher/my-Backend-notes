<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Authentication vs Authorization - Simple Guide
> **Authentication verifies who a user is (identity), while authorization determines what they are allowed to do (permissions). Authentication occurs first (e.g., logging in), followed by authorization (e.g., accessing files). Both are essential, distinct security layers in Identity and Access Management (IAM).**

### Key Differences Between Authentication and Authorization
>  ####  Definition: Authentication proves user identity (who you are), while authorization confirms permissions (what you can do). 
Order of Operations: Authentication always happens first, followed by authorization.

## Examples:
> Authentication: Logging in with a username/password, OTP, or biometrics.

> Authorization: Accessing a private file, editing data, or viewing specific web pages.

> Data Used: Authentication uses passwords, keys, or biometric data; authorization uses policies, roles, or ACLs (Access Control Lists).

> Analogy: At an airport, showing your passport is authentication (proving you are you), while your boarding pass is authorization (allowing you to enter the plane). 


## 🎭 **Real-Life Analogy** (Movie Theater)

```
1. AUTHENTICATION = Show your ticket at entrance
   ✅ "Yes, you paid, you can enter"

2. AUTHORIZATION = Inside theater, which seat? Which room?
   ✅ VIP = Front row seats
   ✅ Regular = Back seats  
   ✅ Staff = Projection room
```


## 🔑 **Easy Definitions**

| **Authentication** | **Authorization** |
| :-- | :-- |
| **WHO are you?**<br>"Verify identity" | **WHAT can you do?**<br>"Grant permissions" |
| Login: username/password | After login: access levels |
| **Happens FIRST** | **Happens SECOND** |

## 💻 **Code Examples** (Simple Web App)

### 1. Authentication (Login Check)

```javascript
// Step 1: Check if user exists + password correct
function authenticate(email, password) {
  const validUser = users.find(u => u.email === email && u.password === password);
  
  if (validUser) {
    return { success: true, user: validUser };  // ✅ You're John!
  } else {
    return { success: false };                  // ❌ Wrong credentials
  }
}

const loginResult = authenticate("john@email.com", "secret123");
// { success: true, user: { name: "John", role: "admin" } }
```


### 2. Authorization (Permission Check)

```javascript
// Step 2: Check what user CAN access
function authorize(user, requiredRole) {
  return user.role === requiredRole;
}

// Admin can delete users
if (authorize(loginResult.user, "admin")) {
  console.log("✅ Can delete users");
} else {
  console.log("❌ Access denied");
}
// "✅ Can delete users"
```


### 3. **Complete Flow** (Real App)

```javascript
class AuthSystem {
  login(email, password) {
    // 1. AUTHENTICATION
    const user = this.authenticate(email, password);
    if (!user) return "Login failed";
    
    // 2. AUTHORIZATION (save permissions)
    session.user = user;
    session.permissions = this.getPermissions(user.role);
    return "Login successful";
  }
  
  canAccessDashboard() {
    return session.permissions.includes("dashboard");
  }
}
```


## 🏢 **Real-World Web App Example**

```
Netflix Example:
1. AUTHENTICATION: Enter email/password → "Welcome John!"
2. AUTHORIZATION: 
   ✅ John (Premium) = 4K + Downloads
   ✅ Jane (Basic) = SD quality only
   ❌ Guest = No access
```

```
Banking App:
1. AUTHENTICATION: Login with OTP
2. AUTHORIZATION:
   ✅ Owner = Transfer money
   ✅ Viewer = Check balance only
   ❌ Stranger = Nothing
```


## 🚨 **Common Confusion Fixed**

```
❌ WRONG thinking:
"Authentication = Admin access"

✅ CORRECT:
Authentication = "John logged in" (any role)
Authorization = "John is Admin → show admin panel"
```


## 📋 **Quick Check Questions**

```
Q1: User enters wrong password? → Authentication ❌
Q2: User logged in but tries admin panel? → Authorization ❌
Q3: User sees only their data? → Authorization ✅ working
```


## 🎯 **Summary Table**

| Step | What | Example | Tool |
| :-- | :-- | :-- | :-- |
| **1. Authentication** | Verify WHO | Login form | JWT, Sessions |
| **2. Authorization** | Check WHAT | Role check | Admin/User roles |
| **Result** | Secure access | Dashboard | Protected routes |

**Remember**: **Authentication** = **Identity check** (passport). **Authorization** = **Permission slip** (what rooms you can enter).[^1][^3]
<span style="display:none">[^10][^2][^4][^5][^6][^7][^8][^9]</span>

<div align="center">⁂</div>

[^1]: https://www.geeksforgeeks.org/computer-networks/difference-between-authentication-and-authorization/

[^2]: https://www.fortinet.com/resources/cyberglossary/authentication-vs-authorization

[^3]: https://www.freecodecamp.org/news/whats-the-difference-between-authentication-and-authorisation/

[^4]: https://www.cncf.io/blog/2023/09/25/the-differences-between-authentication-and-authorization-in-software-development/

[^5]: https://stackoverflow.com/questions/6556522/authentication-versus-authorization

[^6]: https://www.permit.io/blog/authentication-vs-authorization

[^7]: https://auth0.com/docs/get-started/identity-fundamentals/authentication-and-authorization

[^8]: https://www.ibm.com/think/topics/authentication-vs-authorization

[^9]: https://www.okta.com/identity-101/authentication-vs-authorization/

[^10]: https://www.onelogin.com/learn/authentication-vs-authorization

