   ## Today topics 
   ####  npm understanding 
   - npm --- node package manager  now npm ka koi full name nhi hai keo k es main node k elava bhi or bhot sare packages provide hote hain ... but name npm he hai 
   jo node core install hai vo hain modules 
   or jo npm say installed hote hain vo hain packages 

## 1) installing and uninstalling  anything basics & advanced 
       npm say kuj bhi install krne k liye use this line  
     
```bash 
       npm install <package name> or npm i <package name >
       
```
-  jb bhi koi package install hota hai to vo dependencies mein show hota hai or yeah topic bhot  deep hai or main es ka bare mein jrur cover kruuga jitna most important hai.. 
##### to uninstall the package 
    ```bash 
       npm uninstall <package name>
    ``` 

### ***install the specific version of package*** 
    ```bash
       npm install express@4

      ``` 
     
    

### 2) understanding node_modules
- ek folder banta hai node_modules name ka jis mein un packages k dependencies packages etc hote hain jo apke particular package ko chaahie to run.. 

### 3)  dependencies
    when you install a package name express as example you you see express k elava bhi or kuch packages install hote hain in the node_modules so thats the whole story.. 

### 4) devdependencies
  dev dependencies jo sirf development mein kamm ate hain
  jb development done es ko use nhi krna hai ton install as dev dependencies 
   
    ```bash
      npm i nodemon --save-dev 
    
     ```    

 - check your packages.json file 
  when the the app deployed es package ka koi use nhi rahega.. 
  


 ### Scripts
    understanding  default scripts path and custom scripts
    so jb node npm install krte hain to kuch npm commands hamare system level mein save hoti hain means hm jb bhi uuse call krege to error nhi ayega k command not found ! 
    these are --->
    
    ```sh
       npm start npm test 
    ``` 
   >  note jo commands hamne create kiye hain uko run krne k liye 

    ```sh
       npm run <custom-command> 
    ```  
    es tranh say run krna pardta hai ... 


  ### lets make scripts ---- go in the packages.json 
  ```json
  "scripts": {
    "start-server":"node  /script.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }, 
  ```

  > that's how we create and see the syntax of code then make it 

 >  note -- ager text ko colors de kr console krn hai to use the package name chalk

   ```sh 
     npm install chalk
   ```   
   now to to the docs for how to use or use the ai as your way 


## **NPM Commands Cheat Sheet**

```bash
npm init -y          # New project
npm install express  # Install package
npm install -g nodemon # Global tool
npm start            # Run package.json script
npm run dev          # Custom script
``` 
---







