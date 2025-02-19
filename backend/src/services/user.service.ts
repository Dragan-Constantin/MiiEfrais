import User from "../models/user.model";
import database from "../utils/database";



class UserService {

  private generatePassword() {
    return Math.random().toString(36).slice(-8);
  }


  private generateId() {
    const year = new Date().getFullYear().toString();
    // generate unique id with 4 random digits
    return year + Math.random().toString().slice(-4);
  }

  create(): User {
    const id = this.generateId();
    const password = this.generatePassword();
    const user = new User(id, password);

    database.insert('user', user);

    return user;
  }

  getAll(): User[]{
    const users = database.select('user');

    return users.map((user: any) => {
      return new User(user);
    });
  }

  getById(id: string): User | undefined {
    const users = this.getAll();
    return users.find(user => user.id === id);
  }

  getByUuid(uuid: string): User | undefined {
    const users = this.getAll();
    return users.find(user => user._uuid === uuid);
  }

  delete(user: User): void {
    const users = this.getAll();
    
    const userIndex = users.findIndex(u => u.id === user.id);
    users.splice(userIndex, 1);
    database.update('user', users);
  }

  update(user: User): User {
    const users = this.getAll();
    const userIndex = users.findIndex(u => u.id === user.id);

    users[userIndex] = user;
    database.update('user', users);

    return user;
  }
  
}

const userService = new UserService();
export default userService;