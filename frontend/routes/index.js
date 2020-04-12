const express = require('express');
const router = express.Router();
const path = require('path');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render(path.join('pages', 'index'), { session: req.session });
});

module.exports = router;
