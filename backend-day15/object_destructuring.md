
> **Destructuring in JavaScript is a powerful expression introduced in ES6 (ECMAScript 2015) that makes it possible to unpack values from arrays or properties from objects into distinct, individual variables. This process does not modify the original array or object, but rather provides a more concise and readable way to access data.** 

### Array Destructuring
Array destructuring uses a syntax similar to array literals ([]) on the left-hand side of an assignment. The order of the variables matters, as they are matched by index to the elements in the array. 

```js Basic Assignment:

const foo = ["one", "two", "three"];
const [red, yellow, green] = foo;
console.log(red); // Output: "one"

```
> Skipping Values: You can ignore elements using extra commas.

```js
const fruits = ["Bananas", "Oranges", "Apples", "Mangos"];
const [fruit1, , fruit2] = fruits;
console.log(fruit1); // Output: "Bananas"
console.log(fruit2); // Output: "Apples"
```

> Default Values: You can assign a default value if the element is missing or undefined.
```javascript
const [a, b, c = "default"] = [1, 2];
console.log(c); // Output: "default"
```
> Rest Syntax: The rest operator (...) collects the remaining elements into a new array. It must be the last element in the destructuring pattern.

```javascript
const numbers = [10, 20, 30, 40, 50];
const [a, b, ...rest] = numbers;
console.log(a, b); // Output: 10 20
console.log(rest); // Output: [30, 40, 50]
```

> Swapping Variables: Destructuring simplifies swapping the values of two variables without a temporary variable.

```javascript
let a = 1;
let b = 3;
[a, b] = [b, a];
console.log(a); // Output: 3
console.log(b); // Output: 1
```
### Object Destructuring
> Object destructuring uses a syntax similar to object literals ({}) on the left-hand side of an assignment. Unlike arrays, the order does not matter; you match variables by the property name. 

```js Basic Assignment:
const user = { id: 42, isVerified: true };
const { id, isVerified } = user;
console.log(id); // Output: 42
```

> Assigning to New Variable Names (Aliases): You can unpack a property and assign it to a variable with a different name using a colon.

```javascript
const o = { p: 42, q: true };
const { p: foo, q: bar } = o;
console.log(foo); // Output: 42
console.log(bar); // Output: true
```
> Default Values: Similar to arrays, you can specify default values.

```javascript
const { name, age, gender = "Unknown" } = { name: "John", age: 30 };
console.log(gender); // Output: "Unknown"
```

> Rest Syntax: The rest operator gathers the remaining properties into a new object. It must be the last property in the pattern.

```javascript
const person = { name: "Kyle", age: 25, favoriteFood: "None", city: "Miami" };
const { name, ...details } = person;
console.log(name);    // Output: "Kyle"
console.log(details); // Output: { age: 25, favoriteFood: 'None', city: 'Miami' }
```

> Nested Object Destructuring: You can extract values from nested objects.

```javascript
const person = {
  fullName: { firstName: "Jane", lastName: "Doe" },
};
const { fullName: { firstName } } = person;
console.log(firstName); // Output: "Jane"
``` 
> **Other Uses**
Destructuring is also very useful in function parameters, allowing you to extract specific values from an object or array passed as an argument directly in the function signature, which leads to cleaner code. 
```javascript
function displayDetails({ name, age }) {
  console.log(`Hello, ${name}. You are ${age} years old.`);
}

displayDetails({ name: "Peter", age: 50 }); // Output: Hello, Peter. You are 50 years old.

```