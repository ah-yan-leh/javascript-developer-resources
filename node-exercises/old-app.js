// function statement
function sayHi(){
    console.log('Hi there');
}
sayHi();
// function expression
var sayBye = function(){
    console.log('Bye now');
}
sayBye();

// call function within a function
function callFunc(funcName){
    funcName();
}
callFunc(sayHi);

var exampleModule = require('./exampleModule');
exampleModule.counter(['el1','el2','el3']);

// We can create custom events using the core/built-in events module

var events = require('events');

// util allows us to inheret certain things into objects built using node.js
var util = require('util');

// creating a constructor, Person
var Person = function(name){
// this allows, the function with any object created(james,saif,sampath) to utilise this function
    this.name = name;
}

// From the module util, we are inheriting the from events.EventEmitter
util.inherits(Person,events.EventEmitter);
//make 3 objects from Person constructor
var james = new Person('james');
var saif = new Person('saif');
var sampath = new Person('sampath');

var people = [james,saif,sampath];

people.forEach(function(Person){
    Person.on('speak',function(msg){
        console.log(Person.name + 'said this ' + msg );
    });
});

// calling custom emit events
james.emit('speak','This is james');
saif.emit('speak','OH great nice to meet you. ');
sampath.emit('speak','Thats cool');

// node.js built in method for reading/writing files
var fs = require('fs');

// readFileSync is a 'blocking code' since it will NOT perform any action below line until its done reading file
// you are reading a binary file(0s and 1s) if you don't have 'utf8' as second parameter

var readMe = fs.readFileSync('readMe.txt','utf8');
console.log(readMe);

// writeFileSync method will create a new file but will need object passed in as second parameter
fs.writeFileSync('writeMe.txt',readMe);


// fs.readFile is 'async' method and when used, it will need a call back function as a 3rd parameter
fs.readFile('readMe.txt','utf8',(err,data)=>{
    fs.writeFile('writeMeAsync.txt',data, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
});


// this allows us to pass bits of data to the user without having to wait for the entire file to download
var myStreamReader = fs.createReadStream(__dirname+'/loremipsum.txt','utf8');


// this will allow us to send data over
var myStreamWriter = fs.createWriteStream(__dirname+'/NewLoremipsum.txt','utf8');

/*
this is a long hand way of reading/writing streams
myStreamReader.on('data',(chunk)=>{
    console.log('new chunk received');
    myStreamWriter.write(chunk);
    console.log('Chunk written');
});

*/

// pipe method takes readStream and converts it to a writeStream saving us a few lines of code
myStreamReader.pipe(myStreamWriter);


var http = require('http');
// var server = http.createServer(function(req,res){
//     var myOtherStreamReader = fs.createReadStream(__dirname+'/loremipsum.txt','utf8');
//     console.log(`request was made at url: ${req.url}`)
//     res.writeHead(200,{'Content-Type':'text/plain'});
//     // this allows us to stream data back to the user as part of the response
//     myOtherStreamReader.pipe(res);
// });

// we can send html file as the response
// var server = http.createServer(function(req,res){
//     var myOtherStreamReader = fs.createReadStream(__dirname+'/index.html','utf8');
//     console.log(`request was made at url: ${req.url}`)
//     res.writeHead(200,{'Content-Type':'text/html'});
//     // this allows us to stream data back to the user as part of the response
//     myOtherStreamReader.pipe(res);
// });

// var server = http.createServer(function(req,res){
//     res.writeHead(200,{'Content-Type':'application/json'});
//     var personObject = {
//         name: 'Ryu',
//         job: 'Ninja',
//         age: 29
//     };
//     res.end(JSON.stringify(personObject));
// });

var server = http.createServer(function(req,res){
    if(req.url === '/' || req.url === '/home'){
        res.writeHead(200,{'Content-Type':'text/html'});
        fs.createReadStream(__dirname+'/index.html').pipe(res);
    }
    else if(req.url === '/contact'){
        res.writeHead(200,{'Content-Type':'text/html'});
        fs.createReadStream(__dirname+'/contact.html').pipe(res);
    }
    else if(req.url === '/api/ninjas'){
        res.writeHead(200,{'Content-Type':'application/json'});
        var personObject = {
            name: 'Ryu',
            job: 'Ninja',
            age: 29
        };
        res.end(JSON.stringify(personObject));
    }
    else{
        res.writeHead(404,{'Content-Type':'application/json'});
        var error = "Nothing found";
        res.end(error);
    }
});

const port = 3000;
server.listen(port);
console.log(`Server is running on ${port}`);