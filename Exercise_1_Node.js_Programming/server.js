const express = require('express');
const app = express();

// Express Body Parser
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Set Static File Directory
app.use(express.static(__dirname + '/public'));


/************
 * DATABASE *
 ************/

const db = require('./models');
const BooksModel = require('./models/books');


/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

/*
 * JSON API end points
 */

app.get('/helloworld', (req, res) => {
  res.send("Hello World!");
})

app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to my App API!',
    documentationUrl: '', //leave this also blank for the first exercise
    baseUrl: '', //leave this blank for the first exercise
    endpoints: [
	  {method: 'GET', path: '/helloworld', description: 'Hello World!'},
      {method: 'GET', path: '/api', description: 'Describes all available endpoints'},
      {method: 'GET', path: '/api/profile', description: 'Data about me'},
      {method: 'GET', path: '/api/books/', description: 'Get all books information'},
	  {method: 'GET', path: '/api/books/:id', description: 'Get a book information based on the specified ID'},
	  {method: 'POST', path: '/api/books/', description: 'Add a book information into database (version 1)'},
	  {method: 'POST', path: '/api/books1/', description: 'Add a book information into database (version 2)'},
	  {method: 'PUT', path: '/api/books/:id', description: 'Update a book information based upon the specified ID'},
	  {method: 'DELETE', path: '/api/books/:id', description: 'Delete a book based upon the specified ID'},
    ]
  })
});

app.get('/api/profile', (req, res) => {
  res.json({
    'name': 'Hua-Ming Huang',
    'homeCountry': 'Taiwan',
    'degreeProgram': 'Computational Mechanics',
    'email': 'huaming.huang.tw@gmail.com',
    'deployedURLLink': '', //leave this blank for the first exercise
    'apiDocumentationURL': '', //leave this also blank for the first exercise
    'currentCity': 'Munich',
    'hobbies': ["Road Cycling", "Bike Maintenance"]
  })
});

/*
 * Get all books information
 */
app.get('/api/books/', (req, res) => {
  console.log("Getting all books...")
  
  BooksModel.find({}, function (err, books) { // empty means to get all
    if (err) 
	{
		throw err;
	}
	else
	{
		console.log(books);
		res.json(books);
	}
  });
});

/*
 * Get a book information based on the specified ID
 */
app.get('/api/books/:id', function(req, res) {
	console.log('Getting a book...');
	const bookId = req.params.id;
    const bookData = req.body;
	console.log(`Book ID = ${bookId} \nBook Data = ${bookData}`);
	
	BooksModel.findOne({
	  	_id: bookId
	  })
	  .exec(function(err, books) {
		if (err)
		{
			throw err;
		}
		else
		{
			console.log(books);
			res.json(books);
		}
	  });
  });

/*
 * Add a book information into database (version 1)
 */
app.post('/api/books/', (req, res) => {
	console.log('Adding a new book...');
	BooksModel.create(req.body, function(err, newBook) {
		if (err)
		{
			throw err;
		}
		else
		{
			console.log(newBook);
			res.json(newBook);
		}
	})
});

/*
 * Add a book information into database (version 2)
 */
app.post('/api/books1/', function(req, res) {
	console.log('Adding a new book...');
	var newBook = new BooksModel();
  
	newBook.title = req.body.title;
	newBook.author = req.body.author;
	newBook.releaseDate = req.body.releaseDate;
	newBook.genre = req.body.genre;
	newBook.rating = req.body.rating;
	newBook.language = req.body.language;
  
	newBook.save(function(err, book) {
	  if (err)
	  {
	  	throw err;
	  }
	  else
	  {
		console.log(book);
		res.json(book);
	  }
	});
  });

/*
 * Update a book information based upon the specified ID
 */
app.put('/api/books/:id', (req, res) => {
  console.log('Updating a book...');
  const bookId = req.params.id;
  const bookNewData = req.body;
  console.log(`Book ID = ${bookId} \nBook Data = ${bookNewData}`);
  
  BooksModel.findOneAndUpdate(
	{ _id: bookId },
	{ $set: { 
			  title: bookNewData.title,
			  author : bookNewData.author,
			  releaseDate : bookNewData.releaseDate,
			  genre : bookNewData.genre,
			  rating : bookNewData.rating,
			  language : bookNewData.language
	  }},
	{ upsert : true },
	function(err, updatedBookInfo) {
	  if (err)
	  {
	  	throw err;
	  }
	  else
	  {
		console.log(updatedBookInfo);
		res.json(updatedBookInfo);
	  }
	});
});

/*
 * Delete a book based upon the specified ID
 */
app.delete('/api/books/:id', (req, res) => {
  console.log('Deleting a book...');
  const bookId = req.params.id;
  
  BooksModel.findOneAndRemove(
	{ _id: bookId },
	function(err, deletedBook) {
		if (err)
		{
		  throw err;
		}
		else
		{
		  console.log(deletedBook);
	      res.json(deletedBook);
		}
  	});
});


/**********
 * SERVER *
 **********/

app.listen(process.env.PORT || 80, () => {  // if environment variable is present, otherwise use port 80
  console.log('Express server is up and running on http://localhost:80/');
});