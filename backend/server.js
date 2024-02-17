const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require(`./app`);
process.on(`uncaughtException`, err => {
  console.log(err.name, err.message);
  console.log(`UNCAUGHT EXCEPTION ... Shuttting down`);
  server.close(() => {
    process.exit(1);
  });
});

dotenv.config({ path: 'config.env' }); //loads configuration into process.env object
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then(() => {
  // console.log(con.connections)
  console.log('DB connection established');
});

// console.log(process.env);
const port = 3000;
const server = app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});

process.on(`unhandledRejection`, err => {
  console.log(err.name, err.message);
  console.log(`UNHANDELLED REJECTION ... Shuttting down`);
  server.close(() => {
    process.exit(1);
  });
});

//TEST
