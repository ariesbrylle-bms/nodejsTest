const express = require('express');
const router = express.Router(); // eslint-disable-line
const SimpleJsonStore = require('simple-json-store');

const store = new SimpleJsonStore('./quotes.json', { quotes: [] });

router.get('/', (req, res, next) => {
    console.log('Index page only');
    next();
}, (req, res) => {
    res.json(store.get('quotes'));
});

router.get('/:id', (req, res) => {
    let note = {};
    const quotes = store.get('quotes');
    note = quotes.find(quotes => parseInt(quotes.id) === parseInt(req.params.id));
    res.json(note);
});

router.post('/', (req, res) => {
    const id = req.body.id;
    console.log(id)
    if(id != undefined){
        const quotes = store.get('quotes');

        for(var i = 0; i < quotes.length; i++) {
            if(parseInt(quotes[i].id) === parseInt(id)) {
                quotes[i].author = req.body.author;
                quotes[i].text = req.body.text;
                break;
            }
        }

        store.set('quotes', quotes);
        res.json(store.get('quotes'));
    }else{
        const quotes = store.get('quotes');
        const newNote = {
            id: quotes.length > 0 ? quotes[quotes.length - 1].id + 1 : 1,
            author: req.body.author,
            text: req.body.text
        };

        quotes.push(newNote);
        store.set('quotes', quotes);

        res.json(store.get('quotes'));
    }
    
});

router.put('/:id', (req, res) => {
    
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const quotes = store.get('quotes');
    const newNote = quotes.filter(note => parseInt(note.id) !== parseInt(id));

    store.set('quotes', newNote);
    res.json(store.get('quotes'));
});

module.exports = router;