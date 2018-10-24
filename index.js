const express = require('express');
const bodyParser = require('body-parser'); // module and middleware
const noteRouter = require('./server/routes/notesRouter');
const aboutRouter = require('./server/routes/aboutRouter');
const indexRouter = require('./server/routes/indexRouter');
const oldwayRouter = require('./server/routes/oldwayRouter');
const path = require('path');
const morgan = require('morgan');
const app = express();
const PORT = 3300;

app.use(express.static('public'));
app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'pug');
app.use('/vue', express.static(__dirname + '/node_modules/vue'));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true })); // process
app.use(bodyParser.json()); // process json request

// example of middleware
app.use((req, res, next) => {
    console.log('Global middleware here.');
    req.viewModel = {
        title : 'Note Taking Application'
    };
    next();
});

app.use('/', indexRouter);
app.use('/old_way', oldwayRouter);
app.use('/about', aboutRouter);
app.use('/notes', (req, res, next) => {
    console.log('Note Middleware only');
    next();
}, noteRouter);

app.get('/vue',(req,res) => {
    res.render('vuePage', {});
});

app.listen(PORT, (err) => { // arrow function feature from ES6
    if (err){ console.log(err); }
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