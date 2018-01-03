const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
//const Client = require('pg').Client
const {Client} = require('pg');
//const conString = 'postgres://postgres:tabinLync@localhost:5432/cf301js';
app.use(bodyParser.urlencoded({extended:false}));
app.set('view engine','ejs');
app.use(express.static('/public'));

app.get('/',(request,response)=>{
    const client = new Client();
    client.connect()
        .then(()=>{
            return client.query('SELECT * FROM books;');
        })
        .then((results)=>{
            console.log('data:results ',results.rows[0])
            response.render('index',{
                data:results.rows[0]
            });
        })
        .catch((error)=>{
            console.log(error);
            response.send('Error');
        });
});
app.get('/list',(request,response)=>{
    response.render('list');
});
app.get('/book-form',(request,response)=>{
    response.render('book-form');
});

app.post('/actionAddBook',(request,response)=>{
    console.log('added ', request.body);
    const client = new Client();
    client.connect()
        .then(()=>{
            const sql = `INSERT INTO books (title,authors) 
                        VALUES ($1, $2)`;
            const params = [
                                request.body.title,
                                request.body.author
                            ];
            return client.query(sql, params);
        })
        .then((result)=>{
            console.log('response of result',result);
            response.redirect('list');
        })
        .catch((error)=>{
            console.log('ERRORS',error);
            response.redirect('list');
        });
});












app.listen(process.env.PORT, ()=>{
    console.log(`listening to port ${process.env.PORT}`);
});