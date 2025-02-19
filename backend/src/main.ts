import express from 'express';
import 'dotenv/config';
import database from './utils/database';

const app = express();
database
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
