import { Model } from './model';
import User from './user.model';

type Grade = {
  uuid: string;
  grade: number;
};

export default class Class extends Model {
  private _name: string;
  private _students: User[];
  private _grades: Grade[];
  private _teacher: User;

  constructor(obj: any);
  constructor(name: string, teacher: User, students?: User[], grades?: Grade[]);

  constructor(
    objOrName: any,
    teacher?: User,
    students?: User[],
    grades?: Grade[]
  ) {
    if (typeof objOrName === 'string') {
      super();
      this._name = objOrName;
      this._students = students || [];
      this._grades = grades || [];
      this._teacher = teacher!;
    } else {
      super(objOrName._uuid);
      this._name = objOrName._name;
      this._students = objOrName._students.map((s: any) => new User(s));
      this._teacher = objOrName._teacher;
      this._grades = objOrName._grades;
    }
  }

  get name() {
    return this._name;
  }

  get students() {
    return this._students;
  }

  get teacher() {
    return this._teacher;
  }

  set name(name: string) {
    this._name = name;
  }

  set teacher(teacher: User) {
    this._teacher = teacher;
  }

  get grades() {
    return this._grades;
  }

  set grades(grades: Grade[]) {
    this._grades = grades;
  }

  addStudent(student: User) {
    if (!this._students.some((s) => s.id === student.id)) {
      this._students.push(student);
    }
  }

  removeStudent(student: User) {
    this._students = this._students.filter((s) => {
      return s.id !== student.id;
    });
  }
}
