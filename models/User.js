const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {type: String, unique: true},
  password: String,
  updated_at: {
    type: Date
  },
  created_at: {
    type: Date
  }
});

UserSchema.methods = {
  checkPassword: function(inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password);
  },
  hashPassword: plainTextPassword => {
    return bcrypt.hashSync(plainTextPassword, 10);
  }
};

UserSchema.pre("save", function(next) {
  now = new Date();
  this.updated_at = now;
  if (!this.created_at) {
    this.created_at = now;
  }

  if (this.password) {
    this.password = this.hashPassword(this.password);
  }

  if(this.username){
    this.username = this.username.toLowerCase();
  }

  next();
});

// This creates our model from the above schema, using mongoose's model method
const User = mongoose.model("User", UserSchema);

// Export the Article model
module.exports = User;
