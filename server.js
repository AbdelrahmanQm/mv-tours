const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE_URL.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then(() => {
  console.log('Database connected!!');
});

const app = require('./app');

const port = 3000;
app.listen(port, () => {
  console.log(`app is listening for port ${port}...`);
});
