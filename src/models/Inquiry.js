const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Inquiry = sequelize.define('Inquiry', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  loanAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  loanType: {
    type: DataTypes.ENUM('personal', 'business', 'home'),
    allowNull: false,
  },
  employmentType: {
    type: DataTypes.ENUM('salaried', 'business'),
    allowNull: false,
  },
  monthlyIncome: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    defaultValue: 'pending',
  },
});

module.exports = Inquiry;
