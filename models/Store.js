const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StoreSchema = new Schema({
      name: {
        type: String,
        required: true
      },
      type: {
        type: String,
        required: true
      },
      manager: {
        type: String
      },
      cannabisLicense: {
        type: String,
        required: true
      },
      phone: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      website: {
        type: String,
        required: true
      },
      registerDate: {
        type: Date,
        required: true
      },
      address: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      },
      zipCode: {
        type: String
      },
      timeZone: {
        type: String,
        required: true
      },
      status: {
        type: String,
        required: true
      },
      state: {
        type: String,
        required: true
      }
});

module.exports = mongoose.model('Store', StoreSchema);
