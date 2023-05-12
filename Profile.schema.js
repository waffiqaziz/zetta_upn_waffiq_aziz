// Declare the Schema of the Mongo model
var mongoose = require(`mongoose`);
var Schema = mongoose.Schema;

var profilesSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: false,
    index: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
    unique: true,
  },
  hobby: {
    type: Array,
    required: true,
    unique: false,
  },
});