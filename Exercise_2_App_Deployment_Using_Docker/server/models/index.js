var mongoose = require("mongoose");

mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost:27017/booksData",
				  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false } )
					.then(() => {
						console.log("[ 🚀 ] MongoDB connected.");
					})
					.catch(err => {
						console.log(
							"[ 😥 ] MongoDB connection error!",
							{ Error: err }
						);
					})

module.exports.books = require("./books.js");
