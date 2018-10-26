const expect = require('expect');

var {Users} = require('./users');

describe('users', () => {
  var users;

  beforeEach(() => {
    users = new Users();
    users.users=[{
      id: '1',
      name: 'gaber',
      room: 'Node Course'
    }, {
      id: '2',
      name: 'nader',
      room: 'Node Course'
    }, {
      id: '3',
      name: 'galal',
      room: 'React Course'
    }];
  });

  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: '123589',
      name: 'mohamed',
      room: 'office fans'
    };

    var resuser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should remove a user', () => {
    var userId = '2';
    var user = users.removeUser(userId);

    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it('should not remove a user', () => {
    var userId = '20';
    var user = users.removeUser(userId);

    expect(user).toBeFalsy();
    expect(users.users.length).toBe(3);
  });

  it('should found user', () => {
    var userId = '3';
    var user = users.getUser(userId);

    expect(user.id).toBe(userId);
  });

  it('should not found user', () => {
    var userId = '20';
    var user = users.getUser(userId);

    expect(user).toBeFalsy();
  });

  it('should return names for node course', () => {
    var userList = users.getUserList('Node Course');

    expect(userList).toEqual(['gaber', 'nader']);
  });

  it('should return names for node course', () => {
    var userList = users.getUserList('React Course');

    expect(userList).toEqual(['galal']);
  });
});
