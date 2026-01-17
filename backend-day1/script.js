console.log()
console.log("this is day1 in backend....")


// Today topics --> 
/** Arrays 
 *  Objects 
 *  functions return 
 *  async js coding 
// think i must learn --> foreach, map, filter, find, indexOf 
 * 
 */

// array with same type values inside arrays
let array = [1, 2, 3, 4]

// how many thinks we can assign to an array 
let newarray = [11, 22, "heloo", { 1: "shamsher", 2: "coder" }, true, function greet() { }, []]


// now foreach loop with array 
// now ager muje array k har element nu get krna hai to mai foreach loop use kruga 
// in the forEach we can use the function or arrow function arrow function is the default we get 
array.forEach(elements => {
     console.log(elements)
     // we can get all elements from my array 
});

// so that is the basic but i need to learn more about this so lets use the tool

// map 
// what map do ? map return the new array with same length of array you give 


let newarr = array.map(function (val) {
     // 1) map ne meri array ki help say ek blank array create kiya with same lenght of my array
     // 2) then mai os [] new blank array main return krvaya "heloo" 
     // 3) now mere new array mein jo 4 spaces hai us mein heloo heloo.. 4 bari print hoga 
     // return "heloo"
     return val * 2
     // tn mera heloo ek ek kr k return hoga 
     // if you do 
})

// 5) us nu ek variable wich wrap kita then print kita .. 
console.log(newarr)



// filter () 
// es function ki help say ek new array milta hai like map.. 
// es di help filter krn lyi hundi hai means kuj elements nu hato sort kro etc.. 
let newarr1 = [1, 2, 3, 14, 5, 6, 10, 11, 12, 25]

let filteredarr = newarr1.filter((values) => {
     if (values > 3) {
          return true
          // true hone pr meri jo jo values 3 say bigger hai new filteredarr mein store hongi one by one 
     }
     else {
          return false
     }
})

console.log(filteredarr)

// find() for finding elements inside array 
// let find = 
newarr1.find((values)=>{
        if(values === 25 ) {
           console.log()
           console.log(`we got =>  ${values}`)
        }
})

console.log()
// console.log(find)


// now indexof() 
// for finding index number of elements ager mila to voh element nhi hai 

let users = ['joy','vina','mill','gother','coder']

let index1 =  users.indexOf('sham') // if user is not we got -1 

console.log(index1)
console.log(users.at(4))

// thats all array 

// Objects 

let objects = {
     user1: 'coderx',
     passwd : "coder_x"
}
// this is how the object looks like and esi trah say objects create hote hain .. 

// we can also give values as variables inside the objects  
let u101 = 'mr.X'
let u102 = 'ms.y'
let user_s ={ 
       user101 : u101, 
       user102: u102
       // this is vaild 
}

console.log(user_s)
// to get elements one by one 
// first method to get element 
let get = objects['user1'] 
let teg = user_s['user102']
console.log()
console.log(get,'\n',teg)
console.log()

// another way using the object.keyname method 
console.log(objects.user1)


// now we can also change the values inside the objects 
objects.user1 = "coderY" 
console.log(objects['user1'])

// but if you dont want to do that ? 
// use this method es ki help say koi bhi object ki values ki change nhi kr sakta .. 
// Object.freeze() function 

Object.freeze(objects)
// ager es line nu off kr k print krde han tn new key:value pair add hovega new tn es object wich koi modification nhi kr sakda 

// now we cannot do the modifications 
// objects.user2 = "coderZ"
console.log(objects)

// NOte we can also get the length of the function ! means 
// the length of a function is how many parameters inside a function 

function ele (a,d,c,e,f,g,h){
  
}
console.log()
console.log(ele.length)

function emp () {
    return "hello" // return means return krdo jito aya hai control 
}

console.log()
console.log(emp.length)
console.log()

// calling function 
let rs =  emp() 
console.log(rs) 
// function nu assi line no. 155 te call kita tn code da control javega back to function jithe function hai means meri line 146 then oh function run hovega and us wich asi return kita hello then oh control vapis sadi line no. 155 te avega keo k return means jis jagah ton aya hai othe return kro tn other he vapis javega and what we got 



// this is new think i learn today 



// async js coding now ... 
// note -> line by line code chl reha hai tn eh ek synchronous pattern hai of program 
// NOte -> jo bhi code async nature da hunda hai us nu side stack wich bejh do and agle code nu chlado jo bhi sync nature da hai , now jdo bhi sara main stack khali hove sara sync code chl jave tn dekho k async complete hoya k nhi j ho gya tn us nu main stack wich leiyo or then run kr do chla do...  

// we can use the await without the async function ? how 
let blob = await fetch('https://randomuser.me/api/')
 let response = await blob.json()
 // blob means sade kol jo data onda hai oh readabe format wich nhi hunda wich nu format krna pynda hai using the .json() or await nal ki hunda hai jine time tak data nhi onda asi blob and then response nu await kita keo k jdo tak blob nhi ayga tn response bhi show nhi hoga .. es lyi 
//  response nu bhi await kita tn k jdo data blob kol pura get hoje tn us nu json wich format kita ja sake or es process de hundeiya ager sade code wich koi sync code hai tn us nu run hon wich koi dikat na ave us de run hon ton bad jdo sadi process puri hoje means data a gya formating ho gyi then ew console the data .. or response 
//  console.log(response)

 // thats how its work but we will expore more in detailed.. 



