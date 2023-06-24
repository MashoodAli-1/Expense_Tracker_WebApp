const Sequelize = require("sequelize");
const sequelize = require("../Db/connect");

const user = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING(20),
    allowNull: true,
  },
  email: {
    type: Sequelize.STRING(50),
    allowNull: true,
    unique: true,
  },
  password: {
    type: Sequelize.STRING(20),
    allowNull: true,
  },
  role: {
    type: Sequelize.STRING(10),
    allowNull: false,
  },
});

module.exports = user;
