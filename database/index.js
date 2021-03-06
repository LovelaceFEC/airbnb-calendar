const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/calendar',  {poolSize: 10});

// Schema

// contains is an array of strings specifying all the months
// that are in this reservation
// ex. ["92020", "102020"] means that month 9 of 2020 and month 10 of 2020
//     have days that will be reserved
const dateSchema = mongoose.Schema({
  year: { type: Number },
  month: { type: Number },
  day: { type: Number },
});

// Model
const dateModel = mongoose.model('datemodels', dateSchema);

// Given an array of objects, save all objects to database
const saveMany = (reservations, callback) => {


  mongoose.connection.dropCollection('datemodels', (err) => {
    if (err) {
      console.log('error dropping', err);
    }
  });

  dateModel.create(reservations)
    .then((data) => {
      callback(null, data)
    })
    .catch((error) => {
      callback(error)
    });
};

const getAll = (callback) => {
  dateModel.find((err, data) => {
    if (err) {callback(err)} else {callback(null, data);}
  });
}

const getSome = (params, callback) => {
  dateModel.find( {month: Number(params.month), year: Number(params.year)}, (err, data) => {
    if (err) {callback(err)} else {callback(null, data);}
  });
}

module.exports = {
  saveMany,
  getAll,
  getSome
};