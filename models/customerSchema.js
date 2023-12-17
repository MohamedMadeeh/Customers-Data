const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define the Schema (the structure of the customerSchema)
const customerSchema = new Schema(
  {
    fName: String,
    lName: String,
    Email: String,
    Phone: Number,
    Salary: Number,
    Age: Number,
    country: String,
    gender: String
  },
  { timestamps: true }
);

// Create a model based on that schema
const Customer = mongoose.model("Customer", customerSchema);

// export the model
module.exports = Customer;
