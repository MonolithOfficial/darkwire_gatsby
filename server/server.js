// Import dependencies

const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const cors = require('cors')
const helmet = require('helmet')


// Import routes
const articlesRouter = require('./routes/articles-route')


// Set default port for the express app
const PORT = process.env.PORT || 4001

// Create express app
const app = express()


// Apply middleware
// This should, by all means, be above the routes
app.use(cors())
app.use(helmet())
app.use(compression())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// Implement articles route
app.use('/articles', articlesRouter)

// Implement internal server error (500) message route
app.use(function(err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something malfunctioned.')
})


// Implement not found (404) error message route
app.use(function(req, res, next) {
    res.status(404).send('This could not be found.')
})


// Start express app
app.listen(PORT, function() {
    console.log(`Server is running on: ${PORT}`)
})