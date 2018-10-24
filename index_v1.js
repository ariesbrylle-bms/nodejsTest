

const http = require('http');

const port = 3300;

const reqHandler = (req, res) => {
    console.log(req);
    res.end('Hello World');
};

const server = http.createServer(reqHandler);

server.listen(port, (err) => {
    if(err) {
        return console.error(err);
    }

    console.log(`Listening to port ${port}!`);
});
