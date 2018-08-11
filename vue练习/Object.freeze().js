const obj1 = {
    property1:42
};

const obj2 = Object.freeze(obj1);

obj2.property1 = 33;
console.log(obj2)