'use strict';

const Database = require('./mysql');

class User extends Database {
  constructor(table) {
    super(table);
  }


  /**
   * 根据传入数据更新用户
   */
  updateUser(map) {
    let value = `UPDATE ${this.table} SET name = '${map.name}', pwd = '${map.pwd}',
      weixin = '${map.weixin}', phone = ${map.phone}, cardId = ${map.cardId}, sex = '${map.sex}'
        WHERE cardId = ${map.cardId}`;
    return super.getCon()(value);
  }

  delUser(cardId) {
    let value = `DELETE FROM ${this.table} WHERE cardId = '${cardId}'`;
    return super.getCon()(value);
  }
  
  findByCarIdAndPwd(cardId, pwd){
    let value = `DELETE FROM ${this.table} WHERE cardId = '${cardId}' AND pwd = '${pwd}'`;
    return super.getCon()(value);
  }
}


module.exports = new User('user');
