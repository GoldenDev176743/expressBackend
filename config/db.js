const mongoose = require('mongoose');
const config = require('config');
// const config = require('./index.json');
//const db = config.get('mongourl');
 const db = 'mongodb://127.0.0.1:27017/test_1';

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });

    console.log('MongoDB Connected...');

  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
