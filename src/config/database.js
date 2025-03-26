const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'vr_consultancy',
  process.env.DB_USER || 'admin',
  process.env.DB_PASSWORD || 'Karan@8055',
  {
    host: process.env.DB_HOST || '91.108.104.208',
    dialect: 'mysql',
    logging: false,
  }
);

module.exports = sequelize;
