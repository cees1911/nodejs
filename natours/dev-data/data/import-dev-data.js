const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModels');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection successful!');
  });

//read json file

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));

//import data into database

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('data successfully loaded!');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// delete all data from database

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('data successfully deleted!');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

//console.log(process.argv) geeft een array met daarin onder andere
// de --import of -- delete parameter
//comando = dus ---- node ./dev-data/data/import-dev-data.js --delete ----
// en dan ---- node ./dev-data/data/import-dev-data.js --import ----
