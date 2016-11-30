function greet(target){
    target.prototype.greeting = function(){
        console.log(`Hello, my name is ${this.name}`);
    }
}

@greet
class User{
    constructor(name){
        this.name = name;
    }
}

let user = new User('babel');
user.greeting();
