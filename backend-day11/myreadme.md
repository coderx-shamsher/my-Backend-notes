 # mongodb installation 
go on the offical website of mongodb to install 
   https://www.mongodb.com/products/self-managed/community-edition
or community version install krna hai mongodb ka download it and install in system 

also install one extension in vscode of mongodb  name mongodb for vscode install in vs 

>  now first make npm project 
```zsh

   npm init -y 
```
> and now install some packages 
```zsh

 npm install express 
 npm install nodemon  # ager app ne install nhi kiya or bar bar install krne say acha hai use this 
 npm install nodemon --global 

```

> install mongoose package , what is mongoose yeh ek package hai jo app server or database server ko connect krne main help krta hai we use the 2 server 1) app server jis say app ko run krna hai 2) database server jis say database run krna hai or mongoose ek package hai jis ki help say ham dono servers ko apas mein communicate krna sakte hain 
```zsh 

 npm install mongoose 

```
> now setup the express app  server in js use the express js docs to get the basic code its ready to work basic code 
``` js 

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

# mongodb connection 
* create a new file name usersmodel.js 


# schema
**MongoDB doesn't force a rigid schema like SQL databases.** Instead, it uses a flexible, document-based model where each document (like a JSON object) in a collection can have different fields and structures. [geeksforgeeks](https://www.geeksforgeeks.org/mongodb/mongodb-schema-design-best-practices-and-techniques/)

**The "schema" refers to the informal structure you design for your data.** Think of it as a blueprint showing what fields (name, age, email) your documents typically contain and their data types. [youtube](https://www.youtube.com/watch?v=hmGz79ae2AY)

**Key points:**
- **Schema-less by default**: Store `{name: "John"}` and `{name: "Jane", age: 30}` in the same collection ✅
- **Schema validation (optional)**: Enforce rules like "email must be a string" using JSON Schema [mongodb](https://www.mongodb.com/docs/manual/core/schema-validation/)
- **Mongoose schemas**: Popular library that adds structure: `name: String, age: Number` [stackoverflow](https://stackoverflow.com/questions/16998998/mongodb-how-to-define-a-schema)

**Simple analogy**: Like shipping boxes of different sizes in one warehouse (flexible) vs fixed-size containers (SQL rigid schema). [geeksforgeeks](https://www.geeksforgeeks.org/mongodb/mongodb-schema-design-best-practices-and-techniques/)
# model 
**A "model" in MongoDB typically refers to a Mongoose Model**—it's a blueprint created from a schema that lets you interact with a MongoDB collection (like a table). [geeksforgeeks](https://www.geeksforgeeks.org/mongodb/how-to-define-schema-and-model-in-mongoose/)

**Simple breakdown:**
- **Schema** = Structure design (what fields like `name: String`, `age: Number`)
- **Model** = Ready-to-use tool built from schema for CRUD operations (create/read/update/delete)

```javascript
// Schema defines structure
const userSchema = new mongoose.Schema({
  name: String,
  age: Number
});

// Model compiles schema into usable class
const User = mongoose.model('User', userSchema);

// Now use it!
const newUser = new User({name: 'John', age: 25});
newUser.save();  // Saves to MongoDB
```

**Analogy**: Schema is the **cookie cutter shape**. Model is the **actual cookies** you bake and eat (database operations). [mongoosejs](https://mongoosejs.com/docs/models.html)

**MongoDB native**: No "models"—just flexible documents. Mongoose adds this structure for Node.js apps. [hevodata](https://hevodata.com/learn/what-is-mongodb-data-modeling/)


> NOTE -- 
```json 
 // learn about this id and v  
 // 697600  this number is acuall time of when user created 
 "_id": "697600fe5468d872a97676fc",
  "__v": 0

```
> install the json view pro to read the json data in browser its extension 


# curd operations in mongodb -->
> check out my server.js hamne curd operations perform kiya hai , bina frontend just using the 
