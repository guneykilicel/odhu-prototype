const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
    doctorId: {
      type: String,
      required: true,
    },
    dateTime: {
      type: Date,
      required: true,
      unique: true,
    },
  });
  
  module.exports = mongoose.model("Appointment", AppointmentSchema);  