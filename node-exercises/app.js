const express = require('express');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.listen(PORT);

app.set('view engine','ejs');

// app.get('/',(req,res)=>{
//     res.send('homepage');
// });


// app.get('/',(req,res)=>{
//     res.sendFile(__dirname+'/index.html');
// });

// app.get('/users/:id',(req,res)=>{
//     res.send(`user id: ${req.params.id}`);
// });

app.get('/',(req,res)=>{
    res.render('index');
});



// app.get('/profile/:name',(req,res)=>{
//     // use render method when serving a template
//     // to pass in data to view, you add a second parameter
//     res.render('profile',{person:req.params.name});
// });
app.get('/profile/:name',(req,res)=>{
    var data = {
        name:'Ryu',
        country:'japan',
        continent:'asia',
        hobbies:[
            'eating',
            'fishing',
            'fighting'
        ]
    };
    res.render('profile',{
        person:req.params.name,
        data: data
    });
});
// this is a middleware that serves up content of whatever directory you want to use(it maps to a folder). It will intercept any request to url specified
app.use(express.static('./public'));

// Query strings are extra data passed in from url/route
// req.query is a built in method used to get those url values. It will return an object
app.get('/query',(req,res)=>{
    // /query?dept=marketing&person=joe
    // returns { dept: 'marketing', person: 'joe' }
    console.log(req.query);
    res.render('query',{myUrlString:req.query});
});


app.get('/about',(req,res)=>{
    res.render('about');
});
app.get('/contact',(req,res)=>{
    console.log(req.query);
    res.render('contact',{myUrlString:req.query});
});
// POST /login gets urlencoded bodies
// urlencodedParser will function as a middleware
app.post('/contact', urlencodedParser, function (req, res) {
    console.log(req.body);
    // 'contact-submitted' is served as response page (NOT url)
    res.render('contact-submitted',{myUrlString:req.body});
  });