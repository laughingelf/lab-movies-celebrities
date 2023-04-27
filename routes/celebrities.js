var express = require('express');
var router = express.Router();

const Celebrity = require('../models/Celebrity.model')

router.get('/all-celebrities', (req, res, next) => {

    Celebrity.find()
        .then((celebrities) => {
            res.render('celebrities/celebrities.hbs', { celebrities })
        })
        .catch((err) => {
            console.log(err)
        })
})

router.get('/add-celebrity', (req, res, next) => {
    res.render('celebrities/new-celebrity.hbs')
})

router.post('/add-celebrity', (req, res, next) => {

    let newCeleb = req.body

    Celebrity.create(newCeleb)
        .then((createdCelebrity) => {
            console.log(createdCelebrity)
            res.redirect('/celebrities/all-celebrities')
        })
        .catch((err) => {
            console.log(err)
        })
})


module.exports = router;
