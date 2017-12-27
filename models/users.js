'use strict';

const Database = require('./mysql');

class User extends Database {
  constructor(table) {
    super(table);
  }
}


module.exports = new User('user');
