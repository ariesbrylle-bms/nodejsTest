const express = require('express');
const router = express.Router(); // eslint-disable-line


router.get('/', (req, res) => {
    res.render('about', {});
});

module.exports = router;