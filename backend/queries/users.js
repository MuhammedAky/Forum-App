const Joi = require('joi');
const db = require('../database/connect');

const { insertIntoTableAndValidate } = require('./index');

const schema = Joi.object().keys({
  display_name: Joi.string().required(),
  email: Joi.string().email(),
  google_id: Joi.string().required(),
  image_url: Joi.string().uri({
    scheme: [
      /https/
    ]
  }),
  role_id: Joi.number().integer()
});

module.exports = {
  findAdmins() {
    return db('users').where('role_id', 3);
  },
  findByEmail(email) {
    return db('users').where('email', email).first();
  },
  async update(id, user) {
    const rows = await db('users').where('id', id).update(user, '*');
    return rows[0];
  },
  insert(user) {
    return insertIntoTableAndValidate('users', user, schema);
  }
};