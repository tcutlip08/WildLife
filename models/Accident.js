var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var AccidentSchema = new Schema({
  repaired: Boolean,
  cost: Number,
  updated_at: {
    type: Date
  },
  created_at: {
    type: Date
  }
});

AccidentSchema.pre("save", function(next) {
  now = new Date();
  this.updated_at = now;
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
});

// This creates our model from the above schema, using mongoose's model method
const Accident = mongoose.model("Accident", AccidentSchema);

// Export the Article model
module.exports = Accident;
