import {describe, expect, test} from '@jest/globals';
import database from '../src/utils/database';
import UserService from '../src/services/user.service';
import Role from '../src/utils/role.enum';

describe('user test', () => {
    beforeAll(() => {
        database.init();
    });


  test('create user', () => {
    const user = UserService.create();
    expect(user).toBeDefined();
    expect(user.hasRole(Role.STUDENT)).toBe(true);
  });

  test('see user by uuid', () => {
    const users = UserService.getAll();
    expect(users.length).toBeGreaterThan(0);
    expect(users[0].id).toBeDefined();
  });


  test('update user', () => {
    const users = UserService.getAll();
    const user = users[0];
    user.password = 'newpassword';
    user.role = Role.ADMIN;
    const updatedUser = UserService.update(user);
    
    expect(updatedUser.password).toBe('newpassword');
    expect(updatedUser.role).toBe(Role.ADMIN);
  });


  test('generate token', async () => {
    const users = UserService.getAll();
    let user = users[0];
    const token = await UserService.generateToken(user);

    user = UserService.getById(user.id)!;
    expect(token).toEqual(user.token)
  });
  
  test('delete user', () => {
    const users = UserService.getAll();
    const user = users[0];
    UserService.delete(user);
    expect(UserService.getById(user.id)).toBeUndefined();
  });


});