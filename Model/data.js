const Sequelize = require("sequelize");
const sequelize = require("../Db/connect");

const data = sequelize.define("data", {
  dId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: false,
  },
});

module.exports = data;
