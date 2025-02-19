import express from 'express';
import 'dotenv/config';
import UserService from './services/user.service';
import database from './utils/database';
import credsDto from './dtos/user/creds.dto';
import userDto from './dtos/user/user.dto';

const app = express();
database.init();


app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.post('/user', (req, res) => {
  const user  = UserService.create();

  res.status(201).send(new credsDto(user));
});

app.get('/user/:uuid', (req, res) => {
  const uuid = req.params.uuid;
  const user = UserService.getByUuid(uuid);

  if (!user) {
    res.status(404).send({ message: 'User not found' });
    return;
  }

  const dto = new userDto(user);
  res.status(200).send(dto);
});

app.get('/users', (req, res) => {
  const users = UserService.getAll();
  users.map(user => new userDto(user));

  res.status(200).send(users);
});

app.put('/user', (req, res) => {
  const body = req.body;
  const uuid = req.body.uuid;

  if (!uuid) {
    res.status(400).send({ message: 'UUID is required' });
    return;
  }

  const user = UserService.getByUuid(uuid);

  if (!user) {
    res.status(404).send({ message: 'User not found' });
    return;
  }

  user.password = body.password;
  UserService.update(user);
  res.status(200).send({  message: 'User updated' });
});

app.delete('/user/:uuid', (req, res) => {
  const uuid = req.params.uuid;

  const user = UserService.getByUuid(uuid);

  if (!user) {
    res.status(404).send({ message: 'User not found' });
    return;
  }

  UserService.delete(user);
  res.status(200).send({ message: 'User deleted' });
});


app.post('/login', async (req, res) => {

  if (!req.body.id || !req.body.password) {
    res.status(400).send({ message: 'Username and password are required' });
    return;
  }

  const user = UserService.getById(req.body.id);

  if (!user) {
    res.status(404).send({ message: 'User not found' });
    return;
  }

  if (user.password !== req.body.password) {
    res.status(401).send({ message: 'Invalid password' });
    return;
  }

  const token = await UserService.generateToken(user);

  res.status(200).send({ token });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
