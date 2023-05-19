// Declare the Schema of the Mongo model
var mongoose = require(`mongoose`);
var Schema = mongoose.Schema;

var bookShelf = new Schema({
  idBook: {
    type: Array,
    required: true,
    unique: true
  }
})

//Export the model
module.exports = mongoose.model("BookShelf", bookShelf);



