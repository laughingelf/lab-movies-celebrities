var express = require('express');
var router = express.Router();

const Celebrity = require('../models/Celebrity.model')
const Movie = require('../models/Movie.model')

router.get('/all-movies', (req, res, next) => {
    Movie.find()
        .then((movies) => {
            res.render('movies/movies.hbs', { movies })
        })
        .catch((err) => {
            console.log(err)
        })
})

router.get('/add-movie', (req, res, next) => {

    Celebrity.find()
        .then((celebrities) => {
            res.render('movies/new-movie.hbs', { celebrities })
        })
        .catch((err) => {
            console.log(err)
        })

})

router.post('/add-movie', (req, res, next) => {
    // let newMovie = req.body
    let { title, genre, plot, cast } = req.body
    Movie.create(
        {
            title: title,
            genre: genre,
            plot: plot,
            cast: cast
        })
        .then((createdMovie) => {
            console.log('createdMovie: ', createdMovie)
            res.redirect('/movies/all-movies')
        })
        .catch((err) => {
            console.log(err)
        })

})

router.get('/movie-details/:id', (req, res, next) => {
    const { id } = req.params
    Movie.findById(id)
        .populate('cast')
        .then((movie) => {
            res.render('movies/movie-details.hbs', movie)
        })
        .catch((err) => {
            console.log(err)
        })
})

router.get('/delete/:id', (req, res, next) => {
    const { id } = req.params
    Movie.findByIdAndDelete(id)
        .then((movie) => {
            res.redirect('/movies/all-movies')
        })
        .catch((err) => {
            console.log(err)
        })
})

router.get('/edit/:id', (req, res, next) => {
    const { id } = req.params
    Movie.findById(id)//.populate('cast')
        .then((movies) => {
            Celebrity.find()
                .then((celebs) => {
                    let remainingCelebs = celebs.filter((curr) => !movies.cast.includes(curr._id))
                    let starringCelebs = celebs.filter((curr) => movies.cast.includes(curr._id))

                    res.render('movies/edit-movie.hbs', { movies, remainingCelebs, starringCelebs })
                })
        })
})

router.post('/edit/:id', (req, res, next) => {
    const { id } = req.params
    // const { title, genre, plot, cast } = req.body
    Movie.findByIdAndUpdate(id, req.body, { new: true })
        .then((updated) => {
            res.redirect(`/movies/movie-details/${id}`)
        })
        .catch((err) => {
            console.log(err)
        })
})


module.exports = router;
