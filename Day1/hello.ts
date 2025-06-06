
//here obj is const
const obj = {
    "name":"test"
}
//here new obj is assigned name property instead of const obj
obj.name = "test2"
console.log(JSON.stringify(obj))


//1) global scope & local scope
//2) Hoisting

//3) Everything is Object, prototype chaining
function Dog() {

}

Dog.prototype.Bark = function () {
    console.log("bark")
}

var petDog = new Dog();
petDog.Bark();


//4) object destructuring
let obj1 = {
    "p1":1,
    "p2":"test",
    "p3":true,
    "p4":"sad"
}
let { p1, p2 } = obj1;
console.log(p1,p2);

//typescript string concat & type declaration
let name_4 : boolean = true;
let age_1 : number = 10
console.log(`Name:${name_4}, ${age_1}`)

