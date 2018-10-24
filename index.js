const express = require('express');
const bodyParser = require('body-parser'); // module and middleware
const noteRouter = require('./server/routes/notesRouter');
const aboutRouter = require('./server/routes/aboutRouter');
const path = require('path');
const morgan = require('morgan');
const axios = require('axios');
const app = express();
const PORT = 3300;

let isSuccess = false;
let message = '';

app.use(express.static('public'));
app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'pug');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true })); // process
app.use(bodyParser.json()); // process json request

// example of middleware
app.use((req, res, next) => {
    console.log('Global middleware here.');
    next();
});

// route using express js
app.get('/', (req, res) => {
    let notes = [];
    axios.get(`http://localhost:${PORT}/notes`)
        .then((response) => {
            notes = response.data;
            const model = {
                title: 'Note Taking Application',
                seasons: [2014, 2015, 2016, 2017, 2018],
                note: notes,
                isSuccess: isSuccess,
                message: message
            };
            isSuccess = false;
            res.render('index', model);
        }).catch((err) => {
            console.log(err);
            res.send('error');
        });
});



app.post('/notes_update/:id', (req, res) => {
    axios.put(`http://localhost:${PORT}/notes/${req.params.id}`, req.body)
        .then((response) => {
            isSuccess = true;
            message = 'Task has been successfully updated.';
            res.redirect('/');
        }).catch((err) => {
            console.log(err);
            res.send('error');
        });
});

app.post('/notes_delete/:id', (req, res) => {
    axios.delete(`http://localhost:${PORT}/notes/${req.params.id}`)
        .then((response) => {
            isSuccess = true;
            message = 'Task has been successfully deleted.';
            res.redirect('/');
        }).catch((err) => {
            console.log(err);
            res.send('error');
        });
});

app.post('/notes_add', (req, res) => {
    axios.post(`http://localhost:${PORT}/notes`, req.body)
        .then((response) => {
            isSuccess = true;
            message = 'Task has been successfully added.';
            res.redirect('/');
        }).catch((err) => {
            console.log(err);
            res.send('error');
        });
});

app.use('/notes', (req, res, next) => {
    console.log('Note Middleware only');
    next();
}, noteRouter);
app.use('/about', aboutRouter);

app.listen(PORT, (err) => { // arrow function feature from ES6
    console.log(`Listening to port ${PORT}!`);
});

// Comments:
/*
function () {}
*/

/*
   console.log(request.query);
   response.json(request.query);

   const data = request.query; // accept data from client
   console.log(request.query);

   response.json(data); // return response to client
   */

/*
npm install [-g (global)] [--save (save on local folder)] [--only=dev (save local for dev only)] package-name
*/

/*
request.body - post
requset.query - get
*/

/*
./node_modules/eslint/bin/eslint.js .
./node_modules/eslint/bin/eslint.js . --fix

stacktrace
*/