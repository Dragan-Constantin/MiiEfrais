import express from 'express';
import 'dotenv/config';
import UserService from './services/user.service';
import database from './utils/database';
import credsDto from './dtos/user/creds.dto';
import userDto from './dtos/user/user.dto';
import Role, { isRole } from './utils/role.enum';
import classService from './services/class.service';

const app = express();
database.init();


app.use(express.json());

// Login route
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

// ALL
app.use((req: any, res, next) => {
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

  req.user = user;

  next();
});

// get user profile
app.get('/profile', async (req: any, res) => {
  const user = req.user as any;

  if (!user) {
    res.status(401).send({ message: 'Unauthorized' });
    return;
  }

  const dto = new userDto(user);
  res.status(200).send(dto);
});


// ADMIN
app.use('/admin/*', (req: any, res, next) => {
  const user = req.user;


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

// delete user
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

// create class
app.post('/admin/class', (req, res) => {
  const body = req.body;

  if (!body.name) {
    res.status(400).send({ message: 'Class name is required' });
    return;
  }

  if (!body.teacher) {
    res.status(400).send({ message: 'Teacher is required' });
    return;
  }

  const teacher = UserService.getByUuid(body.teacher);

  if (!teacher) {
    res.status(404).send({ message: 'Teacher not found' });
    return;
  }

  if (teacher.role !== Role.TEACHER) {
    res.status(400).send({ message: 'User is not a teacher' });
    return;
  }

  const classObj = classService.create(body.name, teacher);
  res.status(201).send(classObj);
});

app.get('/admin/class', (req, res) => {
  const classes = classService.getAll();
  res.status(200).send(classes);
});

app.get('/admin/class/:locator', (req, res) => {
  const locator = req.params.locator;

  let classObj = classService.getByUuid(locator);
  if (!classObj) {
    classObj = classService.getByName(locator);
  }

  if (!classObj) {
    res.status(404).send({ message: 'Class not found' });
    return;
  }

  res.status(200).send(classObj);
});

app.put('/admin/class/:uuid', (req, res) => {
  const uuid = req.params.uuid;
  const body = req.body;

  if (!uuid) {
    res.status(400).send({ message: 'UUID is required' });
    return;
  }

  const classObj = classService.getByUuid(uuid);

  if (!classObj) {
    res.status(404).send({ message: 'Class not found' });
    return;
  }

  if (body.name) {
    classObj.name = body.name;
  }

  if (body.teacher) {
    const teacher = UserService.getByUuid(body.teacher);

    if (!teacher) {
      res.status(404).send({ message: 'Teacher not found' });
      return;
    }

    if (teacher.role !== Role.TEACHER) {
      res.status(400).send({ message: 'User is not a teacher' });
      return;
    }

    classObj.teacher = teacher;
  }

  classService.update(classObj);
  res.status(200).send({ message: 'Class updated' });
});

// add or remove students from class
app.put('/admin/class/:uuid/student', (req, res) => {
  const uuid = req.params.uuid;

  const body = req.body;

  const classObj = classService.getByUuid(uuid);

  if (!classObj) {
    res.status(404).send({ message: 'Class not found' });
    return;
  }

  if (body.add) {
    for (const studentId of body.add) {
      const student = UserService.getByUuid(studentId);

      if (!student) {
        res.status(404).send({ message: 'Student not found' });
        return;
      }

      if (student.role !== Role.STUDENT) {
        res.status(400).send({ message: 'User is not a student' });
        return;
      }

      classObj.addStudent(student);
    }
  }

  if (body.remove) {
    for (const studentId of body.remove) {
      const student = UserService.getByUuid(studentId);

      if (!student) {
        res.status(404).send({ message: 'Student not found' });
        return;
      }

      classObj.removeStudent(student);
      console.log(classObj.students);
    }
  }

  classService.update(classObj);
  res.status(200).send({ message: 'Class updated' });
});


app.put('/admin/class/:uuid/grade', (req, res) => {
  const uuid = req.params.uuid;
  const body = req.body;

  const classObj = classService.getByUuid(uuid);
  if (!classObj) {
    res.status(404).send({ message: 'Class not found' });
    return;
  }

  if(!body.grades) {
    res.status(400).send({ message: 'Grades are required' });
    return;
  }

  for (const grade of body.grades) {
    console.log(grade);
    if (!grade.student) {
      res.status(400).send({ message: 'Student is required' });
      return;
    }

    if  (!classObj.students.some((s) => s._uuid === grade.student)) {
      res.status(400).send({ message: 'Student is not in the class' });
      return;
    }

    if (!grade.grade) {
      res.status(400).send({ message: 'Grade is required' });
      return;
    }

    if (grade.grade < 0 || grade.grade > 20) {
      res.status(400).send({ message: 'Grade must be between 0 and 20' });
      return;
    }

    const student = UserService.getByUuid(grade.student);

    if (!student) {
      res.status(404).send({ message: 'Student not found' });
      return;
    }

    if (student.role !== Role.STUDENT) {
      res.status(400).send({ message: 'User is not a student' });
      return;
    }


    // merge grades
    const existingGrade = classObj.grades.find((g) => g.uuid === student._uuid);
    if (existingGrade) {
      existingGrade.grade = grade.grade;
    } else {
      classObj.grades.push({
        uuid: student._uuid,
        grade: grade.grade,
      });
    }
  }

  console.log(classObj.grades);
  classService.update(classObj);
  res.status(200).send({ message: 'Class updated' });
});

app.delete('/admin/class/:uuid', (req, res) => {
  const uuid = req.params.uuid;

  const classObj = classService.getByUuid(uuid);

  if (!classObj) {
    res.status(404).send({ message: 'Class not found' });
    return;
  }

  classService.delete(classObj);
  res.status(200).send({ message: 'Class deleted' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
