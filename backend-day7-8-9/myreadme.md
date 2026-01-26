# Today goal what we'r making ? notes taking webapp its practice ! not project.... or not mini project 

## first setup npm  

```bash
   npm init -y 
   npm install express
   npm install ejs
```

- create index.js
- go to express and get the basic app template 
- change the type from commonjs to --> module

- create a folder name public or us main style.css , main.js, or images folder bhi create kr sakte ho..
```js

// add this middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))


// now set the middleware for static files 
 app.use(express.static('public'))

``` 

- create folder name views 
```js

app.set('view engine', 'ejs')

```

```js 

// add new route to render your ejs index file 
   // ejs file  lyi pura name type krn jaruri nhi hai mean index.ejs type krna jaruri nhi hai... just index or jo bhi ejs file k name hai 
app.get('/index', function(req, res){
     res.render("index")
})

```

- Setup tailwind css 
```bash

 npm install tailwindcss

```

- now create src/input.css , one folder name src and us main input.css file create kro 

- **run this command** 
``` bash

npx @tailwindcss/cli -i ./public/src/input.css -o ./public/src/output.css --watch

```

- now link the output.css into your html file mere case main ehh ejs file hai ..

* NOTE -- tailwindcss ka public folder mein output.css create krna jaruri hai nhi to ejs par style apply nhi hota ager esa ho to use this method to use the tailwind 

```html
     <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
```
- es ki help say without setup tailwindcss ko use kiya ja sakta hai...


- after setup the all needed thinks make a UI of tasks creater, manager webapp 
- 1) create , write task name or title here input 
- 2) create task description input with textarea 
- 3) create submit btn to submit  or create a new task
- 4) now create tasks container that contains all the tasks style it..
- 5) style all the UI and then 
- 6) create folder name taskfiles 
- require the fs module into your js file jo apaka express server hai us main.. 
- goto offical node docs and see the fs.readdir module
-  

<!-- checkout my code files -- index.js (for server expressjs ), views folder for (ejs files),  -->   

<!--  checkout the code -->
> day8 just complete the pending work
> day9 mein edit feature add kr rahe hain app main... 