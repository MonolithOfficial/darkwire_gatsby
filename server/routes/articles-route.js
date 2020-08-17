// Importing express
const express = require('express')

// Importing controllers functions
const articlesRoutes = require('./../controllers/articles-controller.js')


// Creating the router
const router = express.Router()

// GET request, retrieve all articles
router.get('/all', articlesRoutes.articlesAll)

// GET request, retrieve limited articles
router.get('/limit', articlesRoutes.articlesLimit)

// POST request, add an article
router.post('/create', articlesRoutes.articlesCreate)


// PUT request, delete specific article
router.put('/delete', articlesRoutes.articlesDelete)


// PUT request, delete all articles
router.put('/reset', articlesRoutes.articlesReset)


// Export the router
module.exports = router