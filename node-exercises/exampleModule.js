
var counter = function(arr){
    return console.log('There are ' + arr.length + ' elements in this array');
}

// Adding more modules
var adder = function(a,b){
    return 'On adding the two number it gives'+(a+b);
}

var pi = 3.1535;
/*
// module.exports is the important part, it makes the counter available for other modules!
module.exports.counter = counter ;
module.exports.adder = adder;
module.exports.pi = pi;
*/ 

// exporting modules as object literal
// would be used as 'exampleModule.counter'
module.exports = {
    counter : counter,
    adder : adder,
    pi : pi
};