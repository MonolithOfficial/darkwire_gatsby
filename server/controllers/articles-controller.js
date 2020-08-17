// Importing database
const knex = require('./../db')


// Controller #1
// Getting all records
exports.articlesAll = async (req, res) => {
    // Selecting articles via Knex
    knex.select('*')
    .from('articles')
    .then(userData => {
        // Telling the server to give back articles as a response on this request
        res.json(userData)
    })
    .catch(error => {
        // Send error message as a response
        res.json({message: `An error occurred while retrieving the articles: ${error}`})
    })
}

exports.articlesLimit = async (req, res) => {
    // Selecting articles via Knex
    knex.select('*')
    .limit(10)
    .from('articles')
    .then(userData => {
        // Telling the server to give back articles as a response on this request
        res.json(userData)
    })
    .catch(error => {
        // Send error message as a response
        res.json({message: `An error occurred while retrieving the articles: ${error}`})
    })
}

// Controller #2
// Adds a record
exports.articlesCreate = async (req, res) => {
    // Inserting a new record
    knex('articles')
        .insert({
            'type': req.body.type,
            'title': req.body.title,
            'author': req.body.author,
            'desc': req.body.desc,
            'category': req.body.category,
            'image': req.body.image,
            'content': req.body.content,
            'pubDate': req.body.pubDate,
            'views': req.body.views,
            'commentsNumber': req.body.commentsNumber,
        })
        .then(() => {
            // Success message in response
            res.json({message: `Article\'${req.body.title}' by ${req.body.author} has been added.`})
        })
        .catch(error => {
            // Error message in response
            res.json({message: `An error occurred while adding ${req.body.article} to the database: ${error}`})
        })
}

// Controller #3
// Removes a specific record
exports.articlesDelete = async (req, res) => {
    // Find the article via ID
    knex('articles')
    .where('id', req.body.id)
    .del() // Deletes the record
    .then(() => {
        // Message in response
        res.json({message: `Article ${req.body.id} has been deleted.`})
    })
    .catch(error => {
        res.json({message: `An error occurred while deleting article ${req.body.id} from the database: ${error}`})
    })
}

// Controller #4
// Deletes all records
exports.articlesReset = async (req, res) => {
    knex
        .select('*')
        .from('articles')
        .truncate() // removes the selection
        .then(() => {
            // Success message in response
            res.json({message: 'Articles table has been cleared.'})
        })
        .catch(error => {
            res.json({message: `An error occurred while clearing the database ${error}`})
        })
}