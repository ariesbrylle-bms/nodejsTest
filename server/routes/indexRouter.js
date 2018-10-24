const express = require('express');
const router = express.Router(); // eslint-disable-line
const axios = require('axios');
const PORT = 3300;

let isSuccess = false;
let message = '';

// route using express js
router.get('/', (req, res) => {
  let notes = [];
  axios.get(`http://localhost:${PORT}/notes`)
      .then((response) => {
          notes = response.data;
          const model = {
              title: req.viewModel.title,
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



router.post('/notes_update/:id', (req, res) => {
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

router.post('/notes_delete/:id', (req, res) => {
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

router.post('/notes_add', (req, res) => {
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


module.exports = router;