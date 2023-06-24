const Sequelize = require("sequelize");
const sequelize = require("../Db/connect");

const catagory = sequelize.define("catagory", {
  ctgId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  ctgName: {
    type: Sequelize.STRING(20),
    unique: true,
    allowNull: false,
  },
  ctgType: {
    type: Sequelize.STRING(10),
    allowNull: false,
  },
});

module.exports = catagory;
