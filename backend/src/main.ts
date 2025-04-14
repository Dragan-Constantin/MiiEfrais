import express from 'express';
import 'dotenv/config';
import UserService from './services/user.service';
import database from './utils/database';
import credsDto from './dtos/user/creds.dto';
import userDto from './dtos/user/user.dto';
import Role, { isRole } from './utils/role.enum';

const app = express();
database.init();


app.use(express.json());

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

// ADMIN
app.use('/admin/*', (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    res.status(401).send({ message: 'Token is required' });
    return;
  }

  const user = UserService.getByToken(token);
  if (!user) {
    res.status(401).send({ message: 'Invalid token' });
    return;
  }

  if (!user.hasRole(Role.ADMIN)) {
    res.status(403).send({ message: 'Access denied' });
    return;
  }
  next();
});


//create user
app.post('/admin/user', (req, res) => {
  const user  = UserService.create();

  res.status(201).send(new credsDto(user));
});

// get all users
app.get('/admin/users', (req, res) => {
  const users = UserService.getAll();
  const dto = users.map(user => new userDto(user));

  res.status(200).send(dto);
});

// get user by uuid
app.get('/admin/user/:locator', (req, res) => {
  const locator = req.params.locator;
  let user = UserService.getByUuid(locator);

  if (!user) {
    user = UserService.getById(locator);
  }

  if (!user) {
    res.status(404).send({ message: 'User not found' });
    return;
  }

  const dto = new userDto(user);
  res.status(200).send(dto);
});

// update user
app.put('/admin/user/:uuid', (req, res) => {
  const uuid = req.params.uuid;
  const body = req.body;

  if (!uuid) {
    res.status(400).send({ message: 'UUID is required' });
    return;
  }

  const user = UserService.getByUuid(uuid);

  if (!user) {
    res.status(404).send({ message: 'User not found' });
    return;
  }

  if (body.password) {
    user.password = body.password;
  }

  if (body.role && isRole(body.role)) {
    user.role = body.role;
  }

  UserService.update(user);
  res.status(200).send({  message: 'User updated' });
});

app.delete('/admin/user/:uuid', (req, res) => {
  const uuid = req.params.uuid;

  const user = UserService.getByUuid(uuid);

  if (!user) {
    res.status(404).send({ message: 'User not found' });
    return;
  }

  UserService.delete(user);
  res.status(200).send({ message: 'User deleted' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
