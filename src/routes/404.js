const express = require('express');
const router = express.Router();

/**
 * Render 404 error page if page doesn't exist
 */
router.get('*', function (req, res) {
    res.render('pages/404', { title: 'Erro 404 - Page not Found' });
});

module.exports = router;
