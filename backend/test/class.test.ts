import { beforeAll, describe } from "@jest/globals";
import database from "../src/utils/database";
import ClassService from "../src/services/class.service";
import UserService from "../src/services/user.service";
import Role from "../src/utils/role.enum";
import classService from "../src/services/class.service";



describe('class test', () => {
    beforeAll(() => {
        database.init();
    });

    test('create class', () => {
        const teacher = UserService.create();
        teacher.role = Role.TEACHER;
        UserService.update(teacher);

        const classObj = ClassService.create('class1', teacher);
        expect(classObj).toBeDefined();
        expect(classObj.name).toBe('class1');
        expect(classObj.teacher.id).toBe(teacher.id);
    });

    test('create class with students', () => {
        const teacher = UserService.create();
        teacher.role = Role.TEACHER;
        UserService.update(teacher);

        const student1 = UserService.create();
        const student2 = UserService.create();
        const classObj = ClassService.create('class2', teacher, [student1, student2]);
        expect(classObj).toBeDefined();
        expect(classObj.name).toBe('class2');
        expect(classObj.teacher.id).toBe(teacher.id);
        expect(classObj.students.length).toBe(2);
        expect(classObj.students[0].id).toBe(student1.id);
        expect(classObj.students[1].id).toBe(student2.id);
    });

    test('get all classes', () => {
        const teacher = UserService.create();
        teacher.role = Role.TEACHER;
        UserService.update(teacher);
        classService.create('class1',teacher);

        const classes = ClassService.getAll();
        expect(classes.length).toBeGreaterThan(0);
    });

    test('get class by id', () => {
        const teacher = UserService.create();
        teacher.role = Role.TEACHER;
        UserService.update(teacher);
        const classObj = ClassService.create('class1', teacher);

        const foundClass = ClassService.getByUuid(classObj._uuid);
        expect(foundClass).toBeDefined();
        expect(foundClass?.name).toBe('class1');
    });

    test('get class by name', () => {
        const teacher = UserService.create();
        teacher.role = Role.TEACHER;
        UserService.update(teacher);
        const classObj = ClassService.create('class1', teacher);

        const foundClass = ClassService.getByName(classObj.name);
        expect(foundClass).toBeDefined();
        expect(foundClass?.name).toBe('class1');
    });

    test('add student', () => {
        const teacher = UserService.create();
        teacher.role = Role.TEACHER;
        UserService.update(teacher);

        const classObj = ClassService.create('class3', teacher);
        const student = UserService.create();
        classObj.addStudent(student);
        expect(classObj.students.length).toBe(1);
        expect(classObj.students[0].id).toBe(student.id);
    });

    test('remove student', () => {
        const teacher = UserService.create();
        teacher.role = Role.TEACHER;
        UserService.update(teacher);

        const classObj = ClassService.create('class4', teacher);
        const student = UserService.create();
        classObj.addStudent(student);
        classObj.removeStudent(student);
        expect(classObj.students.length).toBe(0);
        expect(classObj.students[0]).toBeUndefined();
    });

    test('update class', () => {
        const teacher = UserService.create();
        teacher.role = Role.TEACHER;
        UserService.update(teacher);

        const classObj = ClassService.create('class5', teacher);
        classObj.name = 'class6';
        const updatedClass = ClassService.update(classObj);
        expect(updatedClass).toBeDefined();
        expect(updatedClass.name).toBe('class6');
    });

    test('delete class', () => {
        const teacher = UserService.create();
        teacher.role = Role.TEACHER;
        UserService.update(teacher);

        const classObj = ClassService.create('class7', teacher);
        ClassService.delete(classObj);
        const foundClass = ClassService.getByUuid(classObj._uuid);
        expect(foundClass).toBeUndefined();
    });

    afterAll(() => {
        const classes = ClassService.getAll();

        classes.forEach((classObj) => {
            ClassService.delete(classObj);
        });

        const users = UserService.getAll();
        users.forEach((user) => {
            if (user.role === Role.STUDENT)
                UserService.delete(user);
        });
    });

});