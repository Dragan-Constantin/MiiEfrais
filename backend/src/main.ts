import express from 'express';
import 'dotenv/config';
import UserService from './services/user.service';
import database from './utils/database';
import credsDto from './dtos/user/creds.dto';
import userDto from './dtos/user/user.dto';
import Role, { isRole } from './utils/role.enum';
import classService from './services/class.service';
import { ClassDto } from './dtos/class/class.dto';
import scheduleService from './services/schedule.service';
import { ScheduleDto } from './dtos/schedule/schedule.dto';

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


// STUDENT
app.use('/student/*', (req: any, res, next) => {
  const user = req.user;

  if (!user.hasRole(Role.STUDENT)) {
    res.status(403).send({ message: 'Access denied' });
    return;
  }
  next();
});

// get student grades
app.get('/student/grades', (req: any, res) => {
  const user = req.user;

  
  const grades = UserService.getGrades(user);
  res.status(200).send(grades);
});


app.get('/student/class', (req: any, res) => {
  const user = req.user;
  
  const classes = classService.getByStudent(user);
  const dto = classes.map(classObj => {
    const dto = new ClassDto(classObj);
    delete dto.grades;
    return dto;
  });

  res.status(200).send(dto);
});


// TEACHER

app.use('/teacher/*', (req: any, res, next) => {
  const user = req.user;

  if (!user.hasRole(Role.TEACHER)) {
    res.status(403).send({ message: 'Access denied' });
    return;
  }
  next();
});

// get teacher classes
app.get('/teacher/class', (req: any, res) => {
  const user = req.user;
  const classes = classService.getByTeacher(req.user);

  const dto = classes.map((classObj) => new ClassDto(classObj));

  res.status(200).send(dto);

});

// set class grades
app.put('/teacher/class/:uuid/grade', (req: any, res) => {
  const uuid = req.params.uuid;

  const body = req.body;

  console.log(uuid);
  const classObj = classService.getByUuid(uuid);
  if (!classObj) {
    res.status(404).send({ message: 'Class not found' });
    return;
  }

  if (!body.grades) {
    res.status(400).send({ message: 'Grades are required' });
    return;
  }

  for (const grade of body.grades) {
    console.log(grade);
    if (!grade.student) {
      res.status(400).send({ message: 'Student is required' });
      return;
    }

    if (!classObj.students.some((s) => s._uuid === grade.student)) {
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
  const body = req.body;

  if (!body.name) {
    res.status(400).send({ message: 'Name is required' });
    return;
  }

  const found = UserService.getByName(body.name);

  if (found) {
    res.status(400).send({ message: 'User already exists' });
    return;
  }


  const user  = UserService.create(body.name);

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
  res.status(201).send(new ClassDto(classObj));
});

app.get('/admin/class', (req, res) => {
  const classes = classService.getAll();
  const dto = classes.map(classObj => new ClassDto(classObj));
  res.status(200).send(dto);
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

  res.status(200).send(new ClassDto(classObj));
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


// create schedule
app.post('/admin/schedule', (req, res) => {
  const body = req.body;

  if (!body.class) {
    res.status(400).send({ message: 'Class is required' });
    return;
  }

  const classObj = classService.getByUuid(body.class);

  if (!classObj) {
    res.status(404).send({ message: 'Class not found' });
    return;
  }

  if (!body.startTime) {
    res.status(400).send({ message: 'Start time is required' });
    return;
  }

  if (!body.endTime) {
    res.status(400).send({ message: 'End time is required' });
    return;
  }

  // convert to date
  const startTime = new Date(body.startTime);
  const endTime = new Date(body.endTime);

  if (isNaN(startTime.getTime())) {
    res.status(400).send({ message: 'Start time is invalid' });
    return;
  }

  if (isNaN(endTime.getTime())) {
    res.status(400).send({ message: 'End time is invalid' });
    return;
  }

  if (startTime >= endTime) {
    res.status(400).send({ message: 'Start time must be before end time' });
    return;
  }

  if (!body.location) {
    res.status(400).send({ message: 'Location is required' });
    return;
  }

  console.log(classObj)
  const schedule = scheduleService.create(classObj, startTime, endTime, body.location);

  res.status(201).send(new ScheduleDto(schedule));
});

// get all schedules
app.get('/admin/schedule', (req, res) => {
  const schedules = scheduleService.getAll();
  const dto = schedules.map(schedule => new ScheduleDto(schedule));
  res.status(200).send(dto);
});

// get schedule by uuid
app.get('/admin/schedule/:uuid', (req, res) => {
  const uuid = req.params.uuid;

  const schedule = scheduleService.getByUuid(uuid);

  if (!schedule) {
    res.status(404).send({ message: 'Schedule not found' });
    return;
  }

  res.status(200).send(new ScheduleDto(schedule));
});

// get schedule by class
app.get('/admin/schedule/class/:uuid', (req, res) => {
  const uuid = req.params.uuid;

  const classObj = classService.getByUuid(uuid);

  if (!classObj) {
    res.status(404).send({ message: 'Class not found' });
    return;
  }

  const schedules = scheduleService.getByClass(classObj);

  const dto = schedules.map(schedule => new ScheduleDto(schedule));
  res.status(200).send(dto);
});

// delete schedule
app.delete('/admin/schedule/:uuid', (req, res) => {
  const uuid = req.params.uuid;

  const schedule = scheduleService.getByUuid(uuid);

  if (!schedule) {
    res.status(404).send({ message: 'Schedule not found' });
    return;
  }

  scheduleService.delete(schedule);
  res.status(200).send({ message: 'Schedule deleted' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
