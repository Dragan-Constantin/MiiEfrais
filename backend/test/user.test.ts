import {describe, expect, test} from '@jest/globals';
import database from '../src/utils/database';
import UserService from '../src/services/user.service';

describe('sum module', () => {
    beforeAll(() => {
        database.init();
    });


  test('create user', () => {
    const user = UserService.create();
    expect(user).toBeDefined();
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
    const updatedUser = UserService.update(user);
    
    expect(updatedUser.password).toBe('newpassword');
  });

  
  test('delete user', () => {
    const users = UserService.getAll();
    const user = users[0];
    UserService.delete(user);
    expect(UserService.getById(user.id)).toBeUndefined();
  });


});