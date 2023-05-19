// Declare the Schema of the Mongo model
var mongoose = require(`mongoose`);
var Schema = mongoose.Schema;

var bookDetailsSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: false,
  },
  writer: {
    type: String,
    required: true,
    unique: false,
  },
  publisher: {
    type: String,
    required: true,
    unique: false,
  },
  genre: {
    type: Array,
    required: true,
    unique: false,
  },
});

var booksSchema = new Schema({
  bookDetails: {
    type: bookDetailsSchema,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    unique: false,
  },
  discount: {
    type: Number,
    required: true,
    unique: false,
  },
  stock: {
    type: Number,
    required: true,
    unique: false,
  }
});

//Export the model
module.exports = mongoose.model("Books", booksSchema);



