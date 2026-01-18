// we can work with the callback apis 
// what we want to learn -->
/** writefile
 * appendfile
 * copyfile
 * rename 
 *  unlink
 * 
 * but es mein bhot sare modules hain to ham ovhi learn krne vale hain jo needed hai .. important 
 */
/// NOTE ------ >>>> make sure you read the docs go and check out 
// 1) import or using the fs modules from nodejs 
// const fs = require('node:fs');
const fs = require('fs');


// writeFile() 
// first thing we pass to the function wo hai filename or file 
// then data and bhot single and double quotes main dene hain 
// then we give callback --- or callback ek function hunda hai 

// New lets create new file with some text data 
// fs.writeFile("hidden.txt","hi! this file is hidden if you can able to read means you are with us ",(error)=>{
//       if(error){
//         console.log(error)
//       }
//       else{
//          console.log("done!!!! ")
//       }
// })

// or run the code with terminal with 
// node filename.js 

function writefile(filename,data){
       fs.writeFile(filename,data,(error)=>{
          if (error){
            //  console.log(error)
             console.error(error)
          }
          else{
              console.log("your file is ready !! ")
          }
       })
}

let myfile = 'data.js'
let data = 'console.log("hello ! this is a js file.... ")' 

// calling the function 
// writefile(myfile,data)

// now the appenfile() function 
// so ager hamme hamari file ka data jo pahle hai use delete or overwrite hone say bachana hai to we use this function name append means jordena 
/// note ---> ager oh file system wich present nhi hai tn eh function us file nu  create bhi kdinda hai 

function appenddata (filename,data){
     fs.appendFile(filename,data, (error)=>{
         if(error){
            // console.log(error)
            console.error(error)
         }
         else{
            console.log(" data append ho gya ....")
         }
     })
}
// NOTE use the \n ager data file wich new line te chaahie tn nhi tn appended data show nhi hunda try... 

let file1 = 'new.js'
let data1 = 'console.log("Wellcome to the js world !!")'
let data2 = '\n // this is new file with appended data '
let data3 = '\nconsole.log("this is another appended line in js")'

// same file mein data append krna.. 
// appenddata(file1,data3)



// rename the filename 
function rename (oldname,newname){
      fs.rename(oldname,newname, function(error){
          if(error) {
            console.error(error)
          }
          else{
            console.log("check your file name now !!......")
          }
      })
}

let newname = 'appenddata.js'

// function calling 
// rename(file1,newname)

// 
let data4 = `\n // this is runing.....`
let data5 ='\n let a = 100 \n let b = 200 \n console.log(`A => ${a} + B => ${b} ==> ${a+b}`)'

//  Function Calling........ :)
// appenddata(newname,data5)


// now copyfile() function 
function cp(filename,pathtocp){
    // us cp file koi means jis file ki copy kr rahen hai us ki location/path and name set krna hota hai es function mein jo ki meine kiya hai.. 
    fs.copyFile(filename,pathtocp,(err)=>{
          if(err){
            console.error(err)
          }
          else{
            console.log("file cp done.....!")
          }
    })

}


// function calling
let filename = 'day2.md'
let path =  './cp-files/cp2.md'
// cp(filename,path)



// now the unlink() 
// to delete a file or any file 

// creating an arrow function here 
let deletefile = (dlt_filename) =>{
     fs.unlink(dlt_filename,function (errs){
         if(errs) {
            console.log(errs)
         }
         else{
             console.log("File is Removed.....!")
         }
     })
}

// age path set kr rahe ho to /filename set mat krna.. its make error... 
let dltfile = 'cp-files/cp1.txt'

// calling an arrow function using name 
// deletefile(dltfile)


// now rmdir ---> to remove the directory from system or by default yeh empty dir ko he delete krne ka option dita hai .... 


function rmdir_empty (path) {
     fs.rmdir(path,(err)=>{
          if(err){
             console.error(err)
          }
          else{
             console.log("Folder is Removed......")
          }
     })
}

// calling function 
// rmdir_empty('./cp-files')  //Error: ENOTEMPTY: directory not empty, rmdir

// now we need a options jo k har file system module k sath hoten hain or now we using the one 
// 

function rmdir_allforone(path){
  // with the recursive: true ager folders empty nhi hai tn bhi removed ho jange .. let go.. 
     fs.rmdir(path,{recursive:true},(err)=>{
          if(err){
            console.log(err)
          }else{
            console.log("yeah its removed...")
          }
     })
}

// calling the function
// rmdir_allforone('./rem')  // for some reasons yeah ek error mere pass aya hai 
/** 
 * node:fs:1132
    throw new ERR_INVALID_ARG_VALUE(
    ^

TypeError [ERR_INVALID_ARG_VALUE]: The property 'options.recursive' is no longer supported. Received true
 */

// so what we do using the fs.rm()

function rmallforone(path){
  // so this is the new method to do the same 
  // just rmdir ki jagah pr rm use kro or ager directory mein kuch hai to use kro options like {recursive : true } es ki help say folder empty ho yan full remove ho jayega .... 
  fs.rm(path,{recursive: true},(err)=>{
          if(err){
            console.log(err)
          }else{
            console.log("yeah its removed...")
          }
     })
}

// deletefile("./rem/index.html")
// rmallforone("./cp-files/cp2.md")
// Note that yeh function files and folders ko both ko remove krta hai... 


// folder making function using fs 

const dirmaker = (dirname) =>{
     fs.mkdir(dirname,(err)=>{
        if(err){
          throw err 
        }else{
           console.log("check you file system.... ")
        }
             
     })
}

/// calling the function
let dirname = './testing' 
let dir1 = './testing/files'
let file = './testing/files/file1.js'

// dirmaker(dir1)

// using the create files function 
writefile(file," ")

/// now the  next topic is http module and see the server.js file 