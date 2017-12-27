'use strict';

const Database = require('./mysql');

class Storehouse extends Database {
  constructor(table) {
    super(table);
  }
}


module.exports = new Storehouse('news');
