import Class from '../models/class.model';
import User from '../models/user.model';
import database from '../utils/database';

class ClassService {
  create(name: string, teacher: User, students?: User[]): Class {
    const classObj = new Class(name, teacher, students);

    database.insert('class', classObj);

    return classObj;
  }

  getAll(): Class[] {
    const classes = database.select('class');

    return classes.map((classObj: any) => {
      return new Class(classObj);
    });
  }

  getByUuid(uuid: string): Class | undefined {
    const classes = this.getAll();
    return classes.find((classObj) => classObj._uuid === uuid);
  }

  getByStudent(student: User): Class[] {
    const classes = this.getAll();
    return classes.filter((classObj) =>
      classObj.students?.some((s) => s._uuid === student._uuid)
    );
  }

  getByTeacher(teacher: User): Class[] {
    const classes = this.getAll();
    return classes.filter(
      (classObj) => classObj.teacher._uuid === teacher._uuid
    );
  }

  getByName(name: string): Class | undefined {
    const classes = this.getAll();
    return classes.find((classObj) => classObj.name === name);
  }

  update(classObj: Class): Class {
    const classes = this.getAll();

    const classIndex = classes.findIndex((c) => c._uuid === classObj._uuid);
    classes[classIndex] = classObj;
    database.update('class', classes);

    return classObj;
  }

  delete(classObj: Class): void {
    const classes = this.getAll();

    const classIndex = classes.findIndex((c) => c._uuid === classObj._uuid);
    classes.splice(classIndex, 1);
    database.update('class', classes);
  }
}

const classService = new ClassService();
export default classService;
