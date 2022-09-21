const { ENUM } = require('sequelize');
const Sequelize = require('sequelize');

const { UUID, UUIDV4, STRING, BOOLEAN } = Sequelize;
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_db');

const Task = conn.define('task', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  complete: {
    type: BOOLEAN,
    defaultValue: false
  },
  description: {
    type: STRING,
  },
  difficulty: {
    type: ENUM,
    values: ['Easy', 'Medium', 'Hard']
  }
});

module.exports = {
  conn,
  Task
};
