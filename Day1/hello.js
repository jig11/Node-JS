//here obj is const
var obj = {
    "name": "test"
};
//here new obj is assigned name property instead of const obj
obj.name = "test2";
console.log(JSON.stringify(obj));
//object destructuring
var obj1 = {
    "p1": 1,
    "p2": "test",
    "p3": true,
    "p4": "sad"
};
var p1 = obj1.p1, p2 = obj1.p2;
console.log(p1, p2);
//typescript string concat & type declaration
var name_4 = true;
var age_1 = 10;
console.log("Name:".concat(name_4, ", ").concat(age_1));
//Everything is Object
function Dog() {
}
Dog.prototype.Bark = function () {
    console.log("bark");
};
var petDog = new Dog();
petDog.Bark();
