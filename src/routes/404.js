const express = require('express');
const router = express.Router();

const title = 'Erro 404 - Page not Found';

/** Rendering 404 page */
router.get('*', function (req, res) {
    res.render('pages/404', { title: title });
});

module.exports = router;
