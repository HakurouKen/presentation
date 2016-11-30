function warning(target, key, descriptor) {
    const method = descriptor.value;
    descriptor.value = function(...args){
        let ret = method.apply(this, args);
        console.log(`${ret.name} has delete all data in ${args[0]}`);
        return this;
    }
    return descriptor;
}

class User {
    constructor(name){
        this.name = name;
    }

    @warning
    deleteFolder(folder=''){
        return this;
    }
}

let person = new User('someone');
person.deleteFolder('/bin');
