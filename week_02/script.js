// this file is for learning JS week 2
let num = 300; // integer 

// this is a comment

/*
this is a block comment.
multiple lines are allowed.
*/

// function foo(){
//     console.log(num);
//     let num1 = 200;
// };

// foo();

// this is an anonymous function - method #1
let anonFun = function() {
    console.log("hello");
}

//calling the anon function and now it shows up on my console
anonFun();

// this one immediately loads in my console
(function hello() {
    console.log("Hello");
})();

// the arrow replaces the curly braces from above - method #2
(() => console.log(100))();

// - method #3
let foo = () => console.log(num);
foo();


/* ARRAYS */

let arr = ["foo", 123, ["zar", "car"]];

console.log(arr[1]);

// overwrite an element in the array
arr[1] = "lalala";
console.log(arr[1]);

// add to the end of the array 
arr.push("ending");
console.log(arr);

// start at first item and remove 3 itmes
// there's also pop, etc. 
arr.splice(1,3);


let newArr = ["cow", "turtle", "goat"]

// console log each item separately
for (let item of newArr){
    console.log(item);
}

for (let i in newArr){
    console.log(i + " " + newArr[i]);
}

newArr.forEach((item, i) => console.log(i + " " + item));


/* Objects */

let obj = {
    name: "Eujene",
    age: 27,
    job: "Unemployed atm",
};

// Access 
console.log(obj.name);
console.log(obj["name"]);

obj.job = "employed!";

// loop through all properties
// remember the tick marks! 
for (let key in obj) {
    let value = obj[key];
    console.log(`This pair is ${key}: ${value}`);
}


// regular for loop
for (let i = 0; i < 10; i++){
    console.log(i);
}

// conditionals
let val = 80;

if (val > 80){
    console.log("good")
} 
else if (val > 50){
    console.log("okay")
} 
else{
    console.log("terrible")
}

// this works for two options
let y = (val >=80) ? console.log("good") : console.log("not good");

let newVar = document.getElementById("example");

newVar.innerHTML += "Hello world!!"