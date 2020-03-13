var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log("working fine")
  res.json({msg:'respond with a resource'});
});

module.exports = router;
