const express = require('express');

const app = express();
// const fs = require('fs')
// const http = require('http');
const path = require('path');

const port = 3300;
const opn = require('opn');


app.use(express.static('public'));

// NOTE: The __dirname is important for setting up the directory of the views
app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    console.log(req.url);
    res.send('Hello World!');
});

app.get('/about', (req, res) => {
    // fs.readFile('server/views/index.html', { encoding: 'utf-8' },
    //     (err, data) => {
    //         if (err) { return console.error(err) }
    //         res.header['Content-type'] = 'text/html';
    //         res.send(data);
    //     });
    // res.send('About Us');
    const model = {
        title: 'nodejs',
        seasons: [2014, 2015, 2016, 2017, 2018],
    };
    res.render('index', model);
});

app.listen(port, (err) => {
    if(err) {
        return console.error(err);
    }
    console.log(`Listening to port ${port}!`);
    opn(`http://localhost:${port}`, { app: 'google chrome' });
    return false;
});