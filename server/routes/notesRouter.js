const express = require('express');
const router = express.Router(); // eslint-disable-line
const SimpleJsonStore = require('simple-json-store');

const store = new SimpleJsonStore('./data.json', { notes: [] });

router.get('/', (req, res, next) => {
    console.log('Index page only');
    next();
}, (req, res) => {
    res.json(store.get('notes'));
});

router.get('/:id', (req, res) => {
    let note = {};
    const notes = store.get('notes');
    note = notes.find(notes => parseInt(notes.id) === parseInt(req.params.id));
    res.json(note);
});

router.post('/', (req, res) => {
    const notes = store.get('notes');
    const newNote = {
        id: notes.length > 0 ? notes[notes.length - 1].id + 1 : 1,
        title: req.body.title,
        description: req.body.description
    };

    notes.push(newNote);
    store.set('notes', notes);

    res.json(store.get('notes'));
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const notes = store.get('notes');

    for(var i = 0; i < notes.length; i++) {
        if(parseInt(notes[i].id) === parseInt(id)) {
            notes[i].title = req.body.title;
            notes[i].description = req.body.description;
            break;
        }
    }

    store.set('notes', notes);
    res.json(store.get('notes'));
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const notes = store.get('notes');
    const newNote = notes.filter(note => parseInt(note.id) !== parseInt(id));

    store.set('notes', newNote);
    res.json(store.get('notes'));
});

module.exports = router;