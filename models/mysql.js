'use strict';

const mysql = require('mysql');


/**
    以线程池的方式去操作...
**/

const Con = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'weixin',
});

/**
    使用Promise封装mysql
    @sql: sql语句
    @values: 数据
**/
const query = function (sql, values) {
  return new Promise((resolve, reject) => {
    Con.getConnection(function (err, connection) {
      if (err) {
        reject(err);
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      }
    });
  }).catch(err => {
    console.log(err);
  });
};

let value;

/**
作为数据库基类
**/

class MySqlDataBase {

  constructor(table) {
    this.table = table;
    this.con = Con;
  }


  /**
    一个map值...
    **/

  add(map) {
    value = `INSERT INTO ${this.table} SET ?`;
    // value = 'INSERT INTO ' + this.table + ' SET ?';
    return query(value, map);
  }

  /**
    查询所有
    **/

  queryAll() {
    value = 'SELECT * FROM ' + this.table;
    return query(value, {});
  }


  /**
    field1: 新的值
    field2: 条件
    **/

  update(field1, field2) {
    value = 'UPDATE ' + this.table + ' SET ' + field1 + ' = Where ' + field2 + ' = ?';
    return query(value);
  }

  /**
    filed: 条件
    **/

  del(mmap) {
    let key;
    for (const s in mmap) {
      key = s;
    }
    value = 'DELETE FROM ' + this.table + ' WHERE ' + key + ' =  ' + mmap[key];
    return query(value);
  }

  /**
        根据mmp返该对象
        该mmap只接收一个属性
    **/
  getThis(mmap) {
    let key;
    for (const s in mmap) {
      key = s;
    }
    value = 'select * from ' + this.table + ' where ' + key + ' = "' + mmap[key] + '"';
    return query(value);
  }


  /**
    查找符合条件的信息
    **/
  find() {

  }


  /**
    如果想重写  可以使用该方法   返回数据库对象...
    **/
  getCon() {
    if (query) {
      return query;
    }
    return null;

  }
}

// module.exports = mysql;
module.exports = MySqlDataBase;
