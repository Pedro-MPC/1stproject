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

  .post(function (req, res) {
    res.send({response: commerceAPI.getProductById(req.body.msg)});
  });

module.exports = router;