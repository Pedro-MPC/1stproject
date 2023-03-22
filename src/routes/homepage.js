const express = require("express");
const router = express.Router();
const commerceAPI = require('../../api/commerceAPI')

const msg = "Olá mundo!";
const title = "Homepage - Projeto"

/** Rendering home page */
router.route("/")
  .get(function (req, res) {
    res.render("pages/index", { msg: msg, title: title });
  })

  .post(pedrocorreia, async (req, res, next) => {
    const PRODUCT = await commerceAPI.getProductById(req.body.msg);
    res.json({response: PRODUCT});
  });

module.exports = router;